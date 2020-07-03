export default class PlayerRequest {
  constructor({ code, name, session }: PlayerRequest) {
    this.code = code;
    this.name = name;
    this.session = session;
  }

  code: string;
  name: string;
  session: string;
}
