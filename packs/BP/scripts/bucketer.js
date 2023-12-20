import { Cauldron } from "./tools/cauldron.js";
import { Container } from "./tools/container.js";
import { Furnace } from "./tools/furnace.js";
import { Sound } from "./tools/sound.js";
import { Dispense } from "./tools/dispense.js";

const bucket = bucketer => {
  const { cauldron, inHop, outBox, bucketName, mode } = getState(bucketer);
  if (mode === "failure") return;

  Container.takeBucket(inHop);
  Cauldron.takeLiquid(cauldron);
  Sound.makeBucketingSound(bucketName, bucketer);

  if (mode === "dispense") return Dispense.dispenseBucket(bucketer, bucketName);
  if (mode === "furnace") return Furnace.addBucket(outBox, bucketName);
  if (mode === "chest") return Container.addBucket(outBox, bucketName); // Also Hopper Mode
};

const getState = bucketer => {
  const state = {};
  const fail = { mode: "failure" };
  const frontBox = Container.getFrontBox(bucketer);

  state.inHop = Container.getHopperWithBuckets(bucketer);
  state.cauldron = Cauldron.getIfFull(bucketer);
  state.bucketName = Cauldron.getBucketName(state.cauldron);

  if (!state.cauldron || !state.inHop) return fail;

  // Hopper Mode
  const outHop = Container.getOutputHopper(bucketer);
  if (outHop) {
    return Container.hasFreeSlot(outHop)
      ? { ...state, mode: "chest", outBox: outHop }
      : fail;
  }

  // Dispense Mode
  if (Dispense.canDispense(bucketer)) return { ...state, mode: "dispense" };
  if (!frontBox) return fail;

  // Chest Mode
  if (Container.isChest(frontBox)) {
    return Container.hasFreeSlot(frontBox)
      ? { ...state, mode: "chest", outBox: frontBox }
      : fail;
  }

  // Furnace Mode
  if (Furnace.isFurnace(frontBox)) {
    return state.bucketName.includes("lava") && Furnace.hasFreeSlot(frontBox)
      ? { ...state, mode: "furnace", outBox: frontBox }
      : fail;
  }

  console.warn("If this ever shows up, I wanna know why");
  return fail;
};

export { bucket };
