class APIData {
    constructor(status_code, description, data) {
        this.status_code = status_code;
        this.description = description;
        this.data = data;
        this.timestamp = new Date().toISOString();
    }
}

export async function makeAPIData(data) {
    let newAPIData = new APIData(
        200,
        "",
        data
    );
    console.log("newAPIData: ", newAPIData);
    return newAPIData;
}