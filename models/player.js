export default class Player {
  constructor({
    id, role, name, session, description,
  }) {
    this.id = id;
    this.role = role;
    this.name = name;
    this.session = session;

    if (description) {
      this.description = description;
    }
  }
}
