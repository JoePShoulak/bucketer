import { world } from "@minecraft/server"

class Sound {
    static makeBucketingSound = (itemName, block) => {
        const liquid = itemName.split(":")[1].split("_")[0];
        const sound = `bucket.fill_${liquid}`;

        world.playSound(sound, block.location)
    }
}

export { Sound }