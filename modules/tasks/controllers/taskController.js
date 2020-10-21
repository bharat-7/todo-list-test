"use strict";

const logging                       = require('./../../../logging/logging');
const responses                     = require('./../../../responses/responses');
const taskService                   = require('../services/taskService');
const taskConstants                 = require('../properties/taskConstants');

const create = async (req, res) => {
  let apiReference  = req.apiReference;
  let requestBody   = { ...req.body };
  try {
    if(requestBody.parent_id) {
      // CHECK IF parent_id is existing task AND IS NOT CHILD TO OTHER
      let parentDetails = await taskService.fetch(apiReference, {task_id: requestBody.parent_id});
      if(Array.isArray(parentDetails.data) && (!parentDetails.data.length || parentDetails.data[0].parent_id ))
        return responses.parameterMissingResponse(res);
    }
    const response = await taskService.insert(apiReference, requestBody);
    logging.log(apiReference, {EVENT: "INSERT TASK SERVICE CALL", RESPONSE : response});
    if(response.success){
      return responses.success(res, response.data);
    }
    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, {EVENT: "INSERT TASK ERROR", ERROR: error, STACK: error.stack});
    return responses.internalServerError(res);
  }
};

const fetch = async (req, res) => {
  let apiReference  = req.apiReference;
  let requestQuery   = {...req.query};
  try {
    const response  = await taskService.fetch(apiReference, requestQuery);
    logging.log(apiReference, {EVENT: "FETCH TASKS SERVICE CALL", RESPONSE : response});
    if(response.success){
      return responses.success(res, response);
    }
    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, {EVENT: "FETCH TASKS ERROR", ERROR: error, STACK: error.stack});
    return responses.internalServerError(res);
  }
};

const update = async (req, res) => {
  let apiReference  = req.apiReference;
  let requestBody   = {...req.body};
  try {
    const response  = await taskService.update(apiReference, requestBody);
    logging.log(apiReference, {EVENT: "UPDATE TASKS SERVICE CALL", RESPONSE : response});
console.log("response", response)
    logging.log(apiReference, {serviceResponse : response});
    if(response.success){
      return responses.success(res);
    }
    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, {EVENT: "UPDATE TASKS ERROR", ERROR: error, STACK: error.stack});
    return responses.internalServerError(res);
  }
};

const remove = async (req, res) => {
  let apiReference  = req.apiReference;
  const opts = {... req.body}
  try {
    if(!opts.task_id && !opts.is_completed){
      return responses.parameterMissingResponse(res);
    }
    const response = await taskService.remove(apiReference, opts);
    logging.log(apiReference, {EVENT: "REMOVE TASKS SERVICE CALL", RESPONSE : response});
    logging.log(apiReference, {serviceResponse : response});
    if(response.success){
      return responses.success(res);
    }
    return responses.failure(res, {},  response.error);
  } catch (error) {
    logging.logError(apiReference, {EVENT: "REMOVE TASK(S) ERROR", ERROR: error, STACK: error.stack});
    return responses.internalServerError(res);
  }
};

exports.create                  = create;
exports.fetch                   = fetch;
exports.update                  = update;
exports.remove                  = remove;
