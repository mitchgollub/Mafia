import MongoClient from 'mongodb';
import Game from '../models/game';
import sanitize from 'mongo-sanitize';

const mongoHost = process.env.MONGO_HOST as string;
const mongoDb = process.env.MONGO_DB as string;
let cachedConnection: MongoClient.MongoClient;

const connect = async function (): Promise<MongoClient.MongoClient> {
  if (!cachedConnection || !cachedConnection.isConnected()) {
    cachedConnection = await MongoClient.connect(mongoHost, {
      useUnifiedTopology: true,
    });
  }

  return cachedConnection;
};

export default {
  async insertGameDocument(document: Game): Promise<Game> {
    const client = await connect();
    const collection = client.db(mongoDb).collection('games');

    const result = await collection.insertOne(sanitize(document));

    return document;
  },

  async findGameDocument(query: string): Promise<Game | null> {
    const client = await connect();
    const collection = client.db(mongoDb).collection('games');
    const result = await collection.findOne({
      code: sanitize(query.toUpperCase()),
    });

    if (result) {
      return new Game(result);
    }

    return null;
  },

  async updateGameDocument(game: Game): Promise<Game> {
    const client = await connect();
    const collection = client.db(mongoDb).collection('games');
    const result = await collection.updateOne(
      { code: sanitize(game?.code.toUpperCase()) },
      { $set: sanitize(game) },
    );

    return game;
  },
};
