import db from "../src/db/database.js";
import { desc, eq } from "drizzle-orm";

export async function select_pagination(table, filter="", order="desc", limit, offset) {
    return db.select().from(table).where(eq(table[filter], true)).orderBy(desc(table.id)).limit(limit).offset(offset);
}

export async function select(table, id) {
    return db.select().from(table).where(eq(table.id, id)).then((data) => {return data[0]});
}

export async function create_and_select(table, data) {
    /*{
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 2,
        "info": "",
        "serverStatus": 2,
        "warningStatus": 0,
        "changedRows": 0
    }*/
    return await db.insert(table).values(data).then(async (data) => {
        const createData = data[0];
        let dataDetails = null;
        if (createData.affectedRows > 0 && createData.insertId != 0) {
            dataDetails = await db.select().from(table).where(eq(table.id, createData.insertId)).then((data) => { return data[0] });
        }
        return dataDetails;
    });
}

export async function update_and_select(table, id, data) {
    /*{
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "info": "Rows matched: 1  Changed: 1  Warnings: 0",
        "serverStatus": 2,
        "warningStatus": 0,
        "changedRows": 1
    }*/
    return await db.update(table).set(data).where(eq(table.id, id)).then(async (data) => {
        const updateData = data[0];
        let dataDetails = null;
        if (updateData.affectedRows > 0 && updateData.changedRows > 0) {
            dataDetails = await db.select().from(table).where(eq(table.id, id)).then((data) => { return data[0] });
        }
        return dataDetails;
    });
}

export async function delete_and_select(table, id) {
    /*{
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "info": "",
        "serverStatus": 2,
        "warningStatus": 0,
        "changedRows": 0
    }*/
    const selectData = await select(table, id);
    return db.delete(table).where(eq(table.id, id)).then((data) => { 
        const deleteData = data[0];
        let dataDetails = null;
        if (deleteData.affectedRows > 0 && deleteData.insertId == 0 && deleteData.changedRows == 0) {
            dataDetails = selectData;
        }
        return dataDetails;
    });
}

export async function exist_by_id(table, id) {
    return await db.select().from(table).where(eq(table.id, id)).then((data) => {
        let dataExists = false;
        if(Array.isArray(data) && data.length > 0) {
            dataExists = true;
        }
        return dataExists;
    });
}

export async function exist_by_column_value(table, column, value) {
    return await db.select().from(table).where(eq(table[column], value)).then((data) => {
        let dataExists = false;
        if(Array.isArray(data) && data.length > 0) {
            dataExists = true;
        }
        return dataExists;
    });
}

