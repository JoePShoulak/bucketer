import { ItemStack } from "@minecraft/server";
import { getCardDir } from "./utility.js";

class Dispense {
  static dispenseBucket = (bucketer, bucketName) => {
    const facingDir = getCardDir(bucketer);
    const location = bucketer[facingDir]().location;

    location.x += 0.5;
    location.z += 0.5;

    bucketer.dimension
      .spawnItem(new ItemStack(bucketName), location)
      .clearVelocity();
  };

  static canDispense = bucketer => {
    const facingDir = getCardDir(bucketer);
    const frontSpace = bucketer[facingDir]();

    return (
      frontSpace.typeId === "minecraft:air" ||
      frontSpace.typeId === "minecraft:water"
    );
  };
}

export { Dispense };
