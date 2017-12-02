module.exports = {
  client: 'sqlite3',
  connection: {
    filename : __dirname + '/data/database.sqlite'
  },
  pool: {
    afterCreate: (database, cb) => {
      database.run('PRAGMA foreign_keys=ON', cb)
    },
  },
  useNullAsDefault: true
};
