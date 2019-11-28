const mysql = require('serverless-mysql')

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  },
  onConnectError: (e) => { console.error('MySQL Connection Error: ' + e.code) },
  onError: (e) => { console.error('MySQL Error: ' + e.code) }
});

archiveGames = async() => {
  try {
    console.log("Running mafia.ArchiveGames()");
    const results = await db.query('CALL mafia.ArchiveGames();');
    await db.end();
    console.log(JSON.stringify(results));
  }
  catch (error) {
    console.error(JSON.stringify(error));
    throw error;
  }
}

// Local execution
if(!process.env.AWS_EXECUTION_ENV) {
  console.log('Inside local');
  (async() => {
    await archiveGames();
    process.exit();
  })()
}

// Lambda execution
exports.handler = async (event) => {
    await archiveGames();
    const response = {
        statusCode: 200,
        body: JSON.stringify('Success'),
    };
    return response;
};
