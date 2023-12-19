import { world } from "@minecraft/server";

class Sound {
  static makeBucketingSound = (itemName, { location }) => {
    const liquid = itemName.split(":")[1].split("_")[0];
    const sound = `bucket.fill_${liquid}`;

    world.playSound(sound, location);
  };
}

export { Sound };
