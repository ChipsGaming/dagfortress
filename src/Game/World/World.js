const Uuid = require('uuid/v4');

module.exports = class{
  constructor(seed, name, description){
    this.id = Uuid();
    this.seed = seed;
    this.name = name;
    this.description = description;
    this.added = null;
  }

  // Getters
  /**
   * @param {ChronoRepository} chronoRepository
   *
   * @return {Chrono} Хронология мира.
   */
  async getChrono(chronoRepository){
    return chronoRepository.findWith(
      chronoRepository.select()
        .inWorld(this)
    );
  }

  /**
   * @param {LocationRepository} locationRepository
   *
   * @return {Location} Стартовая локация мира.
   */
  async getStartLocation(locationRepository){
    return locationRepository.findWith(
      locationRepository.select()
        .inWorld(this)
        .start()
    );
  }

  /**
   * @param {DynamicRepository} dynamicRepository
   *
   * @return {Dynamic[]} Динамические объекты мира.
   */
  async getDynamics(dynamicRepository){
    return dynamicRepository.fetchAll(
      dynamicRepository.select()
        .inWorld(this)
    );
  }

  /**
   * @param {DynamicRepository} dynamicRepository
   *
   * @return {Dynamic[]} Динамические, живые объекты мира.
   */
  async getAliveDynamics(dynamicRepository){
    return dynamicRepository.fetchAll(
      dynamicRepository.select()
        .inWorld(this)
        .alive()
    );
  }

  /**
   * @param {PlayerRepository} playerRepository
   *
   * @return {Player[]} Игроки данного мира.
   */
  async getPlayers(playerRepository){
    return playerRepository.fetchAll(
      playerRepository.select()
        .inWorld(this)
    );
  }

  /**
   * @param {PlayerRepository} playerRepository
   *
   * @return {Integer} Количество игроков в данном мире.
   */
  async getPlayersCount(playerRepository){
    return playerRepository.getScalar(
      playerRepository.select()
        .inWorld(this)
        .count()
    );
  }

  /**
   * @param {PlayerRepository} playerRepository
   *
   * @return {Integer} Количество живых игроков в данном мире.
   */
  async getAlivePlayersCount(playerRepository){
    return playerRepository.getScalar(
      playerRepository.select()
        .inWorld(this)
        .alive()
        .count()
    );
  }

  /**
   * @param {PlayerRepository} playerRepository
   *
   * @return {Integer} Количество активных игроков в данном мире.
   */
  async getActivePlayersCount(playerRepository){
    return playerRepository.getScalar(
      playerRepository.select()
        .inWorld(this)
        .alive()
        .active()
        .count()
    );
  }

  /**
   * @param {GroupRepository} groupRepository
   * @param {AllianceRepository} allianceRepository
   *
   * @return {Group} Группа для игроков данного мира.
   */
  async getPlayerGroup(groupRepository, allianceRepository){
    return groupRepository.findWith(
      groupRepository.select()
        .inWorld(allianceRepository, this)
        .forPlayer()
    );
  }

  /**
   * @param {TaskRepository} taskRepository
   * @param {AllianceRepository} allianceRepository
   * @param {GroupRepository} groupRepository
   *
   * @return {Task[]} Актуальные задачи в этом мире.
   */
  async getActualTasks(taskRepository, allianceRepository, groupRepository){
    return taskRepository.fetchAll(
      taskRepository.select()
        .actual()
        .joinGroup(groupRepository)
        .inWorld(allianceRepository, this)
    );
  }
};
