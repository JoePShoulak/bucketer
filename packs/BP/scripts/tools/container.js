import { ItemStack } from "@minecraft/server";

import { getCardDir } from "./utility.js";

const facingDirectionKey = ["down", null, "north", "south", "west", "east"];
const chestNames = ["chest", "hopper", "shulker_box", "barrel"];
const cardDirs = ["north", "east", "south", "west"];
const reverseDirDict = {
  north: "south",
  south: "north",
  east: "west",
  west: "east",
};

class Container {
  static getInv = box => box.getComponent("inventory")?.container;

  static facingInward = (block, dir) => {
    const facingDirNum = block.permutation.getState("facing_direction");
    const blockFacing = facingDirectionKey[facingDirNum];
    const reverseDir = reverseDirDict[dir];

    return blockFacing === reverseDir;
  };

  static isChest = ({ typeId }) => {
    if (typeId == undefined) return false;

    const blockName = typeId.split(":")[1];

    return chestNames.includes(blockName);
  };

  static isFurnace = ({ typeId }) => {
    if (typeId == undefined) return false;

    const blockName = typeId.split(":")[1];

    return blockName.includes("furnace") || blockName.includes("smoker");
  };

  static getHopperWithBuckets = bucketer => {
    const facingDir = getCardDir(bucketer);

    for (let dir of cardDirs) {
      if (dir === facingDir) continue;

      const hopper = bucketer[dir]();

      if (hopper == undefined) return null;

      const isHopper = hopper.typeId === "minecraft:hopper";
      const facingInwards = Container.facingInward(hopper, dir);
      const hasBuckets = Container.hasBuckets(hopper);

      if (isHopper && facingInwards && hasBuckets) return hopper;
    }

    return null;
  };

  static getOutputHopper = block => {
    const hopper = block.below();

    return hopper.typeId === "minecraft:hopper" ? hopper : null;
  };

  static getFrontBox = bucketer => {
    const facingDir = getCardDir(bucketer);
    const container = bucketer[facingDir]();

    return container.getComponent("inventory") ? container : null;
  };

  static hasBuckets = box => {
    const inv = Container.getInv(box);
    if (!inv) return false;

    for (let i = 0; i < inv.size; i++) {
      const item = inv.getItem(i);
      if (item?.typeId === "minecraft:bucket") return true;
    }

    return false;
  };

  static takeBucket = box => {
    const inv = Container.getInv(box);

    for (let i = 0; i < inv.size; i++) {
      const item = inv.getItem(i);

      if (item?.typeId !== "minecraft:bucket") continue;
      if (item.amount === 1) return inv.setItem(i);

      item.amount--;
      return inv.setItem(i, item);
    }
  };

  static hasFreeSlot = (box, slotIndex = null) => {
    const inv = Container.getInv(box);

    if (slotIndex) return !inv.getItem(slotIndex);

    for (let i = 0; i < inv.size; i++) {
      const item = inv.getItem(i);
      if (!item) return true;
    }

    return false;
  };

  static addBucket = (box, bucketName, slotIndex = null) => {
    const bucket = new ItemStack(bucketName);
    const inv = Container.getInv(box);

    if (slotIndex) inv.setItem(slotIndex, bucket);
    else inv.addItem(bucket);
  };
}

export { Container };
