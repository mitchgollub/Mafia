import MongoClient from 'mongodb';
import sanitize from 'mongo-sanitize';
import { MongoDb } from '../../lib/mongodb';
import Game from '../../models/game';

jest.mock('mongodb');
jest.mock('mongo-sanitize');

let mongoDb;

beforeAll(async () => {
  MongoClient.connect.mockResolvedValue({
    db: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        insertOne: jest.fn().mockResolvedValue({}),
        findOne: jest.fn().mockResolvedValue(),
        updateOne: jest.fn().mockResolvedValue({}),
      }),
    }),
    close: jest.fn(),
  });

  sanitize.mockImplementation((request) => request);
  mongoDb = new MongoDb();
});

test('insertGameDocument returns query results', async () => {
  const actual = await mongoDb.insertGameDocument(new Game());

  expect(actual).toMatchSnapshot();
});

test('findGameDocument returns query results', async () => {
  const actual = await mongoDb.findGameDocument('123');

  expect(actual).toMatchSnapshot();
});

test('updateGameDocument returns query results', async () => {
  const actual = await mongoDb.updateGameDocument(new Game());

  expect(actual).toMatchSnapshot();
});
