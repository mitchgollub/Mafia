import MongoClient from 'mongodb';
import sanitize from 'mongo-sanitize';
import MongoDb from '../../lib/mongodb';
import Game from '../../models/game';

jest.mock('mongodb');
jest.mock('mongo-sanitize');

beforeEach(async () => {
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
});

test('insertGameDocument returns query results', async () => {
  const actual = await MongoDb.insertGameDocument(new Game());

  expect(actual).toMatchSnapshot();
});

test('findGameDocument returns query results', async () => {
  MongoClient.connect.mockResolvedValue({
    db: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        findOne: jest.fn().mockResolvedValue({ code: '123' }),
      }),
    }),
    close: jest.fn(),
  });

  const actual = await MongoDb.findGameDocument('123');

  expect(actual).toMatchSnapshot();
});

test('findGameDocument returns null if no GameDocument is found', async () => {
  const actual = await MongoDb.findGameDocument('123');

  expect(actual).toBeNull();
});

test('updateGameDocument returns query results', async () => {
  const actual = await MongoDb.updateGameDocument(new Game());

  expect(actual).toMatchSnapshot();
});
