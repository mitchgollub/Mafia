export default class CurrentRole {
    constructor({ id, name, role }: CurrentRole) {
        this.id = id;
        this.name = name || '';
        this.role = role || '';
    }
    
    id: number;
    name: string;
    role: string;
    session?: string;
    description?: string;
}
