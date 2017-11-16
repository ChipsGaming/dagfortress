module.exports = {
  client: 'sqlite3',
  connection: {
    filename : './data/database.sqlite'
  },
  pool: {
    afterCreate: (database, cb) => {
      database.run('PRAGMA foreign_keys=ON', cb)
    },
  },
  useNullAsDefault: true
};
