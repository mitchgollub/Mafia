export default class Role {
    constructor({ role, roleName, startingValue }: Role) {
        this.role = role || '';
        this.roleName = roleName || '';
        this.startingValue = startingValue;
    }

    role: string;
    roleName: string;
    startingValue: number;

}
