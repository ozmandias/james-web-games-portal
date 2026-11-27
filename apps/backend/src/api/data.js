/* --------------------------------------------------------------------------------------- */

import { data } from "../db/schema";

export async function get_data_pagination(limit, offset) {
    return await select_pagination(data, null, null, null, "desc", limit, offset);
}

export async function get_data(id) {
    return await select(data, id);
}

export async function create_data(createData) {
    return await create_and_select(data, createData);
}

export async function update_data(id, updateData) {
    return await update_and_select(data, id, updateData);
}

export async function delete_data(id) {
    return await delete_and_select(data, id);
}