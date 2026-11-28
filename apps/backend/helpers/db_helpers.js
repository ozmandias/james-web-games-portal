import db from "../src/db/database.js";
import { asc, desc, eq, gt, gte, lt, lte, ne } from "drizzle-orm";

class Pagination {
    constructor(total, page, size, next, previous) {
        this.total = total;
        this.page = page;
        this.size = size;
        this.next = next;
        this.previous = previous;
    }
}

class PaginationData extends Pagination {
    constructor(total, page, size, next, previous, content) {
        super(total, page, size, next, previous);
        this.content = content;
    }
}

export async function select_pagination(table, filter, condition, value, order, limit, offset) {
    return db.select()
        .from(table)
        .where(
            filter && condition && value ?
                condition == "equal" ? eq(table[filter], value)
                : condition == "like" ? like(table[filter], value)
                : condition == "greater than" ? gt(table[filter], value)
                : condition == "greater than or equal" ? gte(table[filter], value)
                : condition == "less than" ? lt(table[filter], value)
                : condition == "less than or equal" ? lte(table[filter], value)
                : ne(table[filter], value)
            : undefined
        )
        .orderBy(
            order ?
                order == "asc" ?
                asc(table.id)
                : desc(table.id)
            : undefined
        )
        .limit(limit)
        .offset(offset);
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

export async function makePaginationData(data) {
    let total;
    let page;
    let size;
    let next;
    let previous;
    
    let newPaginationData = new PaginationData(
        total,
        page,
        size,
        next,
        previous,
        data
    );

    return newPaginationData;
}