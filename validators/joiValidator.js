'use strict';

const Joi                                         = require('joi');

const logging                                     = require('./../logging/logging');
const responses                                   = require('./../responses/responses');


const joiValidate = (apiReference, body, schema, options, res, msg)=>{
  logging.log(apiReference, {EVENT: "validateFields", BODY: body, SCHEMA: schema});
  let validation = Joi.validate(body, schema, options);
  if (validation.error) {
    let errorReason =
      validation.error.details !== undefined
        ? (msg ? msg : validation.error.details[0].message)
        : 'Parameter missing or parameter type is wrong';
    logging.log(apiReference, validation.error.details);
    responses.parameterMissingResponse(res, errorReason);
    return false;
  }
  return true;
}
/**
 *
 * @param apiReference
 * @param req
 * @param body
 * @param res
 * @param schema
 * @param msg
 * @returns {boolean}
 */
const validateFields = (apiReference, req, body, res, schema, msg) => {
  return joiValidate(apiReference, body, schema, {allowUnknown: false}, res, msg)
};



exports.validateFields                            = validateFields;
