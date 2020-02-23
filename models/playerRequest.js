export default class PlayerRequest {
    constructor({ id, name, session } = {}) {
        this.id = id;
        this.name = name;
        this.session = session;
    }
}