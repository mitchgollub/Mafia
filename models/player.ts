export default class Player {
  constructor({ id, role, name, session, description }: Player) {
    this.id = id;
    this.role = role;
    this.name = name;

    if (session) {
      this.session = session;
    }

    if (description) {
      this.description = description;
    }
  }

  id: number;
  role: string;
  name: string;
  session?: string;
  description?: string;
}
