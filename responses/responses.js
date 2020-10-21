'use strict';

const constants                   = require('./responseConstants');


const parameterMissingResponse = (res, err, data) => {
  let response = {
    message: err || constants.responseMessages.PARAMETER_MISSING,
    status : constants.responseStatus.BAD_REQUEST,
    data   : data || {}
  };
  this.sendResponse(res, response);
};

const internalServerError = (res, data) => {
  let response = {
    message: constants.responseMessages.INTERNAL_SERVER_ERROR,
    status : constants.responseStatus.INTERNAL_SERVER_ERROR,
    data   : data || {}
  };
  this.sendResponse(res, response);
};

const success = (res, data, message) => {
  let response = {
    message: message || constants.responseMessages.SUCCESS,
    status : constants.responseStatus.SUCCESS,
    data   : data || {}
  };
  this.sendResponse(res, response);
};

const failure = (res, data, message) => {
  let response = {
    message: message || constants.responseMessages.FAILURE,
    status : constants.responseStatus.UNAUTHORIZED,
    data   : data || {}
  };
  this.sendResponse(res, response);
};

const sendResponse = (res, data, isCompressed = 0) => {
  let response = JSON.stringify({
    message: data.message,
    status : data.status,
    data   : data.data
  });
  return res.status(data.status).send(response);
};


exports.parameterMissingResponse  = parameterMissingResponse;
exports.internalServerError       = internalServerError;
exports.success                   = success;
exports.failure                   = failure;
exports.sendResponse              = sendResponse;
