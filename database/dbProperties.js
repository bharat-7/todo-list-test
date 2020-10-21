const config                                      = require('config');


exports.mysql  = {
    host              : config.get('databaseSettings.host'),
    user              : process.env.MYSQL_USER_DB || config.get('databaseSettings.user'),
    password          : process.env.MYSQL_PASS_DB || config.get('databaseSettings.password'),
    database          : config.get('databaseSettings.database'),
    multipleStatements: true
};
