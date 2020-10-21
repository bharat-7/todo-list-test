

const logging                       = require('./../../../logging/logging');
const taskDao                       = require('../dao/taskDao');


exports.insert = async (apiReference, opts) => {
  logging.log(apiReference, {EVENT : "INSERT TASK SERVICE CALL", OPTS: opts});
  const response = { success : false };
  const daoResponse = await taskDao.insertDetails(apiReference, opts);
  logging.log(apiReference, {EVENT: "INSERT TASK DAO RESPONSE", RESULT: daoResponse});
  if(!daoResponse.success) {
    return daoResponse;
  }
  let taskInfo   = {... opts};
  taskInfo.task_id = daoResponse.data.insertId;
  response.success    = true;
  response.data       = taskInfo;
  return response;
};


exports.fetch = async (apiReference, opts) => {
  logging.log(apiReference, {EVENT : "FETCH TASK(S) SERVICE CALL", opts});
  const response = { success : false };

  const daoResponse = await taskDao.fetchDetails(apiReference, opts);
  const daoCountResponse = await taskDao.fetchDetails(apiReference, opts,true);
  let tasksInfo   = { ... daoResponse };
  logging.log(apiReference, {EVENT : "FETCH TASK(S) DAO RESPONSE", tasksInfo});
  logging.log(apiReference, {EVENT : "FETCH TASK(S) COUNT DAO RESPONSE", daoCountResponse});
  if(!tasksInfo.success){
    response.success = false;
    response.error   = tasksInfo.error;
    return response;
  }
  response.success    = true;
  response.data       = tasksInfo.data;
  response.count      = daoCountResponse.data.count;
  return response;
};


exports.update = async (apiReference, opts) => {
  logging.log(apiReference, {EVENT : "UPDATE TASK(S) SERVICE CALLED", OPTS: opts});
  const response = { success : false };
  const task_id = opts.task_id;
  const is_completed = opts.is_completed;
  const daoResponse = await taskDao.updateDetails(apiReference, opts, {task_id, is_completed});
  if(!daoResponse.success){
    response.success = false;
    response.error   = daoResponse.error;
    return response;
  }
  let tasksInfo   = { ... daoResponse };
  logging.log(apiReference, {EVENT : "UPDATE TASK(S) DAO RESPONSE", tasksInfo});
  response.success    = true;
  response.data       = tasksInfo;
  return response;
};

exports.remove = async (apiReference, opts) => {
  const task_id = opts.task_id;
  const is_completed = opts.is_completed;
  logging.log(apiReference, {EVENT : "REMOVE TASK(S) SERVICE CALLED", opts});
  const response = { success : false };
  const daoResponse = await taskDao.removeTasks(apiReference, {task_id, is_completed});
  if(!daoResponse.success){
    response.success = false;
    response.error   = daoResponse.error;
    return response;
  }
  let tasksInfo   = { ... daoResponse };
  logging.log(apiReference, {EVENT : "REMOVE TASK(S) DAO RESPONSE", tasksInfo});
  response.success    = true;
  response.data       = tasksInfo;
  return response;
};
