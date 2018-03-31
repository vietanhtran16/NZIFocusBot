import {mapIntentWithResponse} from "../mapper/intentMapper";

export async function createResponse(message) {
    return await mapIntentWithResponse(message);
}

