/* --------------------------------------------------------------------------------------- */

import { distributions } from "../db/schema";

export async function get_distributions_pagination(limit, offset) {
    return await select_pagination(distributions, null, null, null, "desc", limit, offset);
}

export async function get_distribution(id) {
    return await select(distributions, id);
}

export async function create_distribution(distributionData) {
    return await create_and_select(distributions, distributionData);
}

export async function update_distribution(id, distributionData) {
    return await update_and_select(distributions, id, distributionData);
}

export async function delete_distribution(id) {    
    return await delete_and_select(distributions, id);
}