import { world } from "@minecraft/server";

import { Container } from "./tools/container.js";
import { Dispense } from "./tools/dispense.js";
import { Cauldron } from "./tools/cauldron.js";

const bucket = bucketer => {
  const { cauldron, inHop, outBox, bucketName, mode } = getState(bucketer);
  if (mode === "failure") return;

  Container.takeBucket(inHop);
  Cauldron.takeLiquid(cauldron);
  makeBucketingSound(bucketName, bucketer);

  if (mode === "dispense") return Dispense.dispenseBucket(bucketer, bucketName);
  if (mode === "furnace") return Container.addBucket(outBox, bucketName, 1);
  if (mode === "chest") return Container.addBucket(outBox, bucketName); // Also Hopper Mode
};

const getState = bucketer => {
  const state = {};
  const fail = { mode: "failure" };
  const frontBox = Container.getFrontBox(bucketer);
  const outHop = Container.getOutputHopper(bucketer);

  state.inHop = Container.getHopperWithBuckets(bucketer);
  state.cauldron = Cauldron.getIfFull(bucketer);
  state.bucketName = Cauldron.getBucketName(state.cauldron);

  if (!state.cauldron || !state.inHop) return fail;

  // Hopper Mode
  if (outHop)
    return Container.hasFreeSlot(outHop)
      ? { ...state, mode: "chest", outBox: outHop }
      : fail;

  // Dispense Mode
  if (Dispense.canDispense(bucketer)) return { ...state, mode: "dispense" };
  if (!frontBox) return fail;

  // Chest Mode
  if (Container.isChest(frontBox))
    return Container.hasFreeSlot(frontBox)
      ? { ...state, mode: "chest", outBox: frontBox }
      : fail;

  // Furnace Mode
  if (Container.isFurnace(frontBox))
    return state.bucketName.includes("lava") &&
      Container.hasFreeSlot(frontBox, 1)
      ? { ...state, mode: "furnace", outBox: frontBox }
      : fail;

  console.warn("If this ever shows up, I wanna know why");
  return fail;
};

const makeBucketingSound = (itemName, { location }) => {
  const liquid = itemName.split(":")[1].split("_")[0];
  const sound = `bucket.fill_${liquid}`;

  world.playSound(sound, location);
};

export { bucket };
