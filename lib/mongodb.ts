import MongoClient from 'mongodb';
import Game from '../models/game';
import sanitize from 'mongo-sanitize';

const mongoHost = process.env.MONGO_HOST as string;
const mongoDb = process.env.MONGO_DB as string;

export class MongoDb {
  async insertGameDocument(document: Game): Promise<Game> {
    const client = await this.connect();
    const collection = client.db(mongoDb).collection('games');

    const result = await collection.insertOne(sanitize(document));

    client.close();
    return document;
  }

  async findGameDocument(query: string): Promise<Game | null> {
    const client = await this.connect();
    const collection = client.db(mongoDb).collection('games');
    const result = await collection.findOne({
      code: sanitize(query.toUpperCase()),
    });
    client.close();

    if (result) {
      return new Game(result);
    }

    return null;
  }

  async updateGameDocument(game: Game): Promise<Game> {
    const client = await this.connect();
    const collection = client.db(mongoDb).collection('games');
    const result = await collection.updateOne(
      { code: sanitize(game?.code.toUpperCase()) },
      { $set: sanitize(game) },
    );

    client.close();

    return game;
  }

  private async connect(): Promise<MongoClient.MongoClient> {
    return await MongoClient.connect(mongoHost, {
      useUnifiedTopology: true,
    });
  }
}
