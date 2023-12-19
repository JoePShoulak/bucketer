class Cauldron {
  static takeLiquid = cauldron => {
    const newPerm = cauldron.permutation.withState("fill_level", 0);

    cauldron.setPermutation(newPerm);
  };

  static getBucketName = cauldron => {
    const liquid = cauldron?.permutation?.getState("cauldron_liquid");

    return `minecraft:${liquid}_bucket`;
  };

  static getIfFull = block => {
    const cauldron = block.above();

    const isCauldron = cauldron.typeId === "minecraft:cauldron";
    const isFull = cauldron.permutation.getState("fill_level") === 6;

    return isCauldron && isFull ? cauldron : null;
  };
}

export { Cauldron };
