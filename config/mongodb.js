const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const db_name = 'reusable_code';

const client = new MongoClient(uri);

let db;

async function connect() {
  await client.connect();
  console.log('Connected to database ', db_name);
  db = client.db(db_name);
}

function getDb() {
  return db;
}

module.exports = {
  connect,
  getDb,
};
