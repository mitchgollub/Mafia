export default class PlayerResponse {
    constructor(id, role, description) {
        if (id instanceof Object) {
            this.id = id.id;
            this.role = id.role;
            this.description = id.description;
        }
        else {
            this.id = id;
            this.role = role;
            this.description = description;
        }
    }
}