export default {
  /** 登录模块 */
  // 登录 post
  login: () => '/api/login',
  // 注册 post
  register: () => '/api/register',
  
  /** daily-record */
  // 创建每日记录 post
  createDailyRecord: () => '/api/record',
  // 获取每日记录详情 get
  getDailyRecord: (recordTime) => '/api/record/' + recordTime,
  // 创建to do项 post
  createToDo: () => '/api/todo',
  // 删除（废弃）to do项 put
  deprecateToDos: () => '/api/todo/deprecate', 
  // 完成to do项 put
  completeToDos: () => '/api/todo/complete', 
  // 创建消费项 post
  createConsumption: () => '/api/consumption'
};