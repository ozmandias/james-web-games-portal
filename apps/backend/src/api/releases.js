/* --------------------------------------------------------------------------------------- */

import { releases } from "../db/schema";

export async function get_releases_pagination(limit, offset) {
    return await select_pagination(releases, "active", "desc", limit, offset);
}

export async function get_release(id) {
    return await select(releases, id);
}

export async function create_release(releaseData) {
    return await create_and_select(releases, releaseData);
}

export async function update_release(id, releaseData) {
    return await update_and_select(releases, id, releaseData);
}

export async function delete_release(id) {    
    return await delete_and_select(releases, id);
}
