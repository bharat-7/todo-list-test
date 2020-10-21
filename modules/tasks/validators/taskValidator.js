const apiReferenceModule                  = "task";

const Joi                                 = require('joi');

const validator                           = require('./../../../validators/joiValidator');

/**
 *
 * @param req = Request from external
 * @param res = Response
 * @param next = next of function
 */
const create = (req, res, next) => {
  req.apiReference = {
    module: apiReferenceModule,
    api   : "create"
  };
  let schema =  Joi.object().keys ({
    task_description    : Joi.string().required(),
    parent_id           : Joi.number().optional()
  });

  let reqBody = { ... req.body };
  let request = { ... req };
  let validFields = validator.validateFields(req.apiReference, request, reqBody, res, schema);
  if(validFields){
    next();
  }
};

/**
 *
 * @param req = Request from external
 * @param res = Response
 * @param next = next of function
 */
const fetch = (req, res, next) => {
  req.apiReference = {
    module: apiReferenceModule,
    api   : "fetch"
  };
  let schema =  Joi.object().keys ({
    task_id       : Joi.number().optional(),
    search        : Joi.string().optional(),
    is_completed  : Joi.number().valid([0,1]).optional(),
    limit         : Joi.number().optional(),
    skip          : Joi.number().optional()
  });

  let reqBody = { ... req.query };
  let request = { ... req };
  let validFields = validator.validateFields(req.apiReference, request, reqBody, res, schema);
  if(validFields){
    next();
  }
};


/**
 *
 * @param req = Request from external
 * @param res = Response
 * @param next = next of function
 */
const update = (req, res, next) => {
  req.apiReference = {
    module: apiReferenceModule,
    api   : "update"
  };

  let schema =  Joi.object().keys ({
    task_id             : Joi.number().required(),
    task_description    : Joi.string().optional(),
    is_completed        : Joi.number().valid([0,1]).optional(),
  });

  let reqBody = { ... req.body };
  let request = { ... req };
  let validFields = validator.validateFields(req.apiReference, request, reqBody, res, schema);
  if(validFields){
    next();
  }
};

/**
 *
 * @param req = Request from external
 * @param res = Response
 * @param next = next of function
 */
const remove = (req, res, next) => {
  req.apiReference = {
    module: apiReferenceModule,
    api   : "remove"
  };
  let schema =  Joi.object().keys ({
    task_id             : Joi.number().optional(),
    is_completed        : Joi.number().valid([1]).optional(),
  });

  let reqBody = { ... req.body };
  let request = { ... req };
  let validFields = validator.validateFields(req.apiReference, request, reqBody, res, schema);
  if(validFields){
    next();
  }
};

exports.create                  = create;
exports.fetch                   = fetch;
exports.update                  = update;
exports.remove                  = remove;
