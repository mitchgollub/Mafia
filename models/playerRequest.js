export default class PlayerRequest {
    constructor(id, name, session) {
        if (id instanceof Object) {
            this.id = id.id;
            this.name = id.name;
            this.session = id.session;
        }
        else {
            this.id = id;
            this.name = name;
            this.session = session;
        }
    }
}