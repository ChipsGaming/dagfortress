module.exports = class{
  async check(task, condition, view){
    const chrono = await (await (await (await task.getGroup()).getAlliance()).getWorld()).getChrono();

    return chrono.day == condition.target.day;
  }
};
