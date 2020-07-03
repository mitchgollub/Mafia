export default class GameRequestRole {
  constructor({ role, roleName, startingValue }: GameRequestRole) {
    this.role = role || '';
    this.roleName = roleName || '';
    this.startingValue = startingValue;
  }

  role: string;
  roleName: string;
  startingValue: string;
}
