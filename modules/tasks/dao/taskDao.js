const logging            = require('./../../../logging/logging');
const constants          = require('./../../../responses/responseConstants');
const taskConstants      = require('./../properties/taskConstants');
const dbHandler          = require('./../../../database/mysqllib');



exports.insertDetails = async (apiReference, opts) => {
  let response = { success : false };
  logging.log(apiReference, {EVENT : "INSERT TASK DAO CALLED", OPTS: opts});

  let query = `INSERT into tb_tasks SET ?`;
  let values = [opts];
  let queryResponse = await dbHandler.executeQuery(apiReference, "INSERTING TASK IN DB", query, values);
  logging.log(apiReference, {EVENT: "executeQuery Result", RESULT: queryResponse});
  if (queryResponse.ERROR){
    if (queryResponse.ERROR == "ER_DUP_ENTRY"){
      response.success = false;
      response.error   = constants.responseMessages.EMAIL_ALREADY_REGISTERED;
    }
    return response;
  }
  response.success = true;
  response.data    = queryResponse;
  return response;
};

exports.fetchDetails = async (apiReference, opts, getCount) => {
  let response = { success : false };
  logging.log(apiReference, {"EVENT" : "FETCH TASK(S) DAO CALLED", OPTS: opts});

  let query = `SELECT ${getCount? "COUNT(task_id) as count" :"task_id, task_description, " +
    " parent_id, is_completed"} from tb_tasks WHERE 1 `;
  let values = [];
  if(opts.task_id){
    query+= " AND task_id = ? ";
    values.push(opts.task_id)
  }
  if(opts.parent_id){
    query+= " AND parent_id = ? ";
    values.push(opts.parent_id)
  }
  if(typeof opts.is_completed != 'undefined'){
    query+= " AND is_completed = ? ";
    values.push(opts.is_completed)
  }
  if(opts.search) {
    query += ` AND task_description LIKE "%${opts.search}%" `;
  }
  if (!getCount) {
    if(opts.limit){
      query+= ` LIMIT ${opts.limit || 20}`;
    }
    if(opts.skip){
      query+= ` OFFSET ${opts.skip || 0}`;
    }
  }
  let queryResponse = await dbHandler.executeQuery(apiReference, "FETCH TASK(S) DETAILS FROM DB", query, values);
  if (queryResponse.ERROR){
    response.success = false;
    response.error   = queryResponse.ERROR;
    return response;
  }
  response.success = true;
  response.data    = queryResponse;
  return response;
};

exports.updateDetails = async (apiReference, opts, whereOpts) => {
  let response = { success : false };
  logging.log(apiReference, {"EVENT" : "UPDATE TASK(S) DAO CALLED", OPTS: opts, WHERE: whereOpts});

  let query = `UPDATE tb_tasks SET ? WHERE 1 `;
  let values = [opts];
  if(whereOpts.task_id){
    if(opts.is_completed) {
      query+= ` AND (task_id = ? OR parent_id = ?) `;
      values.push(whereOpts.task_id);
      values.push(whereOpts.task_id);
    } else {
      query+= ` AND task_id = ? `;
      values.push(whereOpts.task_id)
    }
  }
  let queryResponse = await dbHandler.executeQuery(apiReference, "UPDATING TASK IN DB", query, values);
  if (queryResponse.ERROR){
    response.success = false;
    response.error   = queryResponse.ERROR;
    return response;
  }
  if (!queryResponse.affectedRows){
    response.success = false;
    response.error   = taskConstants.responseMessages.CRITERIA_MISMATCH;
    return response;
  }
  response.success = true;
  response.data    = {};
  return response;
};


exports.removeTasks = async (apiReference, opts) => {
  let response = { success : false };
  logging.log(apiReference, {"EVENT" : "REMOVE TASK(S) DAO CALLED", OPTS: opts});

  let query = `DELETE FROM tb_tasks WHERE 1 `;
  let values = [];
  if(opts.task_id){
    query+= ` AND (task_id = ? OR parent_id = ?)`;
    values.push(opts.task_id)
    values.push(opts.task_id)
  }
  if(opts.is_completed){
    query+= ` AND is_completed = 1`;
  }
  let queryResponse = await dbHandler.executeQuery(apiReference, "REMOVING TASK AND SUBTASKS FROM DB", query, values);
  if (queryResponse.ERROR){
    response.success = false;
    response.error   = queryResponse.ERROR;
    return response;
  }
  if (!queryResponse.affectedRows){
    response.success = false;
    response.error   = taskConstants.responseMessages.CRITERIA_MISMATCH;
    return response;
  }
  response.success = true;
  response.data    = {};
  return response;
};
