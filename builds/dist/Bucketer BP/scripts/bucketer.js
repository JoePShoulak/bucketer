import { Cauldron } from './tools/cauldron.js';
import { Container } from './tools/container.js';
import { Furnace } from './tools/furnace.js';
import { Sound } from "./tools/sound.js";
import { Dispense } from "./tools/dispense.js";

const bucket = (bucketer) => {
    const { cauldron, inHop, outBox, bucketName, mode } = getState(bucketer);
    if (mode === "failure") return;

    Container.takeBucket(inHop);
    Cauldron.takeLiquid(cauldron);
    Sound.makeBucketingSound(bucketName, bucketer)

    if (mode === "dispense") return Dispense.dispenseBucket(bucketer, bucketName);
    if (mode === "furnace") return Furnace.addBucket(outBox, bucketName);
    if (mode === "chest") return Container.addBucket(outBox, bucketName);
}

const getState = (bucketer) => {
    const state = {};
    const fail = { mode: "failure" };

    const outHop = Container.getOutputHopper(bucketer);
    const frontBox = Container.getFrontBox(bucketer);

    state.inHop = Container.getHopperWithBuckets(bucketer);
    state.cauldron = Cauldron.getIfFull(bucketer)
    state.bucketName = Cauldron.getBucketName(state.cauldron);

    if (!state.cauldron || !state.inHop) return fail;

    if (outHop) {
        if (!Container.hasFreeSlot(outHop)) return fail;
        return { ...state, mode: "hopper", outBox: outHop }
    }

    if (Dispense.canDispense(bucketer)) return { ...state, mode: "dispense" };

    if (Container.isChest(frontBox)) {
        if (!Container.hasFreeSlot(frontBox)) return fail;
        return { ...state, mode: "chest", outBox: frontBox }
    }

    if (Furnace.isFurnace(frontBox)) {
        if (!Furnace.hasFreeSlot(frontBox) || !state.bucketName.includes("lava")) return fail;
        return { ...state, mode: "furnace", outBox: frontBox };
    }

    return fail;
}

export { bucket }
