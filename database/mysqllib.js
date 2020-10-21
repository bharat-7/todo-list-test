"use strict";

const mysql                         = require('mysql2');
const moment                        = require('moment');

const logging                       = require('./../logging/logging');
const dateUtility                   = require('./../utility/dateUtility');

const initialize = (apiReference, config) => {
  let numConnectionsInPool = 0;
  logging.log(apiReference, "STARTING MYSQL CONNECTION @ " + dateUtility.getFormattedDate(new Date(), dateUtility.formats.formatDateTime));
  let conn = mysql.createPool(config).promise();
  conn.on('connection', function (connection) {
    numConnectionsInPool++;
    console.log('CONNECTION IN POOL : ', numConnectionsInPool);
  });
  conn.on('error', function (error) {
    logging.logError(apiReference, {EVENT : "MYSQL_CONN_ERROR",  ERROR : error});
    return initialize(apiReference, config);
  });
  logging.log(apiReference, "MYSQL CONNECTED @ " + dateUtility.getFormattedDate(new Date(), dateUtility.formats.formatDateTime));

  return conn;
};

const executeQuery = async (apiReference, event, queryString, params) => {
  try {
    let [sqlResult, buff] = await mysqlCon.query(queryString, params);
    return sqlResult;
  } catch (sqlError) {
    logging.logError(apiReference, {event, sqlError, queryString, params});
    if (sqlError.code === 'ER_LOCK_DEADLOCK' || sqlError.code === 'ER_QUERY_INTERRUPTED') {
      setTimeout(executeQuery.bind(null, apiReference, event, queryString, params), 50);
    } else if (sqlError.code == "ER_DUP_ENTRY") {
        return {
          success: false,
          ERROR: "ER_DUP_ENTRY"
        }
    } else {
      return {success: false, ERROR: sqlError, QUERY: queryString, PARAMS: params, EVENT: event};
    }
  }
};




exports.initialize                  = initialize;
exports.executeQuery                = executeQuery;
