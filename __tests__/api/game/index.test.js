const game = require('../../../pages/api/game/index');
const res = require('../../../__mocks__/res');

test('Creates Game', async () => {
    const req = {
        body: [
            {
                role: "Cop",
                roleName: "Cops",
                startingValue: 2
            }
        ]
    };

    require('serverless-mysql').__setMockDbResonse([]);

    const response = await game.default(req, res);

    expect(response.statusCode).toBe(200);
    expect(response.json.code).toEqual(expect.stringMatching("^[^\s]{4}$"));
    expect(response.json.players).toEqual([{ id: 1, name: "YOU", role: "Narrator" }]);
});

test('Handles startingValues > 10', async () => {
    const req = {
        body: [
            {
                role: "Cop",
                roleName: "Cops",
                startingValue: 12
            }
        ]
    };

    require('serverless-mysql').__setMockDbResonse([]);

    const response = await game.default(req, res);

    expect(response.statusCode).toBe(200);
    expect(response.json.code).toEqual(expect.stringMatching("^[^\s]{4}$"));
    expect(response.json.players).toEqual([{ id: 1, name: "YOU", role: "Narrator" }]);
});

test('Handles null startingValues', async () => {
    const req = {
        body: [
            {
                role: "Cop",
                roleName: "Cops",
                startingValue: null
            }
        ]
    };

    require('serverless-mysql').__setMockDbResonse([]);

    const response = await game.default(req, res);

    expect(response.statusCode).toBe(200);
    expect(response.json.code).toEqual(expect.stringMatching("^[^\s]{4}$"));
    expect(response.json.players).toEqual([{ id: 1, name: "YOU", role: "Narrator" }]);
});

test('Returns 500 on error', async () => {
    const req = {
        body: [
            {
                role: "Cop",
                roleName: "Cops",
                startingValue: 2
            }
        ]
    };

    require('serverless-mysql').__setMockDbResonse({error: "Error"});

    const response = await game.default(req, res);

    expect(response.statusCode).toBe(500);
});