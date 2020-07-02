export default class PlayerRequest {
  constructor({ id, name, session }: PlayerRequest) {
    this.id = id;
    this.name = name;
    this.session = session;
  }

  id: string;
  name: string;
  session: string;

}
