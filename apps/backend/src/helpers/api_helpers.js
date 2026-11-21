class API {
    constructor(status_code, description) {
        this.status_code = status_code;
        this.description = description;
        this.timestamp = new Date().toISOString();
    }
}

class APIData extends API {
    constructor(status_code, description, data) {
        super(status_code, description);
        this.data = data;
    }
}

export function makeAPIData(data) {
    let status_code = data != null ? 200 : 400;
    let description = "";
    if(data.affectedRows == null && data.changedRows == null) {
        description = "get data";
    } else {
        if(data.affectedRows > 0 && data.insertId != 0 && data.changedRows == 0) {
            description = "create data";
        } else if(data.affectedRows > 0 && data.insertId == 0 && data.changedRows > 0) {
            description = "update data";
        } else {
            description = "delete data";
        }
    }

    let newAPIData = new APIData(
        status_code,
        description,
        data
    );
    
    return newAPIData;
}