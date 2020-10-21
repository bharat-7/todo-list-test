const apiReferenceModule      = "startup";

const logging                 = require('../logging/logging');
const database                = require('../database');
const httpLib                 = require('./../services/httpService');
const envProperties           = require('./../properties/envProperties');


const initializeServer = async () => {
  let apiReference = {
    module: apiReferenceModule,
    api: "initialize"
  };
  try {
    //initialize all db connections

    const server = await httpLib.startHttpServer(envProperties.port);
    await database.initialize(apiReference);

  } catch (error) {
    logging.logError(apiReference, {EVENT: "initializeServer", ERROR: error});
    throw new Error(error);
  }
};

exports.initializeServer  = initializeServer;
