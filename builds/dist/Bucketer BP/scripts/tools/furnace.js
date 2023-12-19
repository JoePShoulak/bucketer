import { Container } from "./container.js";

class Furnace {
    static hasFreeSlot = (box) => {
        return Container.hasFreeSlot(box, 1);
    }

    static addBucket = (box, bucketName) => {
        return Container.addBucket(box, bucketName, 1);
    }

    static isFurnace = ({ typeId }) => {
        if (typeId == undefined) return false;

        const blockName = typeId.split(":")[1];

        return blockName.includes("furnace") || blockName.includes("smoker");

    }
}

export { Furnace };