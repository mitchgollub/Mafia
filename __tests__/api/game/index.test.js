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
    expect(response.json.game.code).toEqual(expect.stringMatching("^[^\s]{4}$"));
    expect(response.json.game.players).toEqual([{ id: 1, name: "YOU", role: "Narrator" }]);
});