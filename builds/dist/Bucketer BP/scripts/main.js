import { system } from '@minecraft/server';
import { bucket } from "./bucketer.js";

system.afterEvents.scriptEventReceive.subscribe(({ id, sourceBlock }) => {
    if (id === "fibdev:bucketer_update") bucket(sourceBlock);
});
