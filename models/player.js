export default class Player {
    constructor(id, role, name, session) {
        if (id instanceof Object) {
            this.id = id.id;
            this.role = id.role;
            this.name = id.name;
            this.session = id.session;
        }
        else {
            this.id = id;
            this.role = role;
            this.name = name;
            this.session = session;
        }
    }
}