export default class AvailableRole {
  constructor({ id, role }: AvailableRole) {
    this.id = id;
    this.role = role || '';
  }

  id: number;
  role: string;
}
