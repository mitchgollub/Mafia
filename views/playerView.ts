export default class PlayerView {
  constructor({ id, role, description }: PlayerView) {
    this.id = id;
    this.role = role;
    this.description = description;
  }

  id: string;
  role: string;
  description: string;
}
