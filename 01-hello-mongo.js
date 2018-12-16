require('dotenv').config();
console.log(process.env.DB_PROT);
console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);
console.log(process.env.DB_NAME);

const MongoClient = require('mongodb').MongoClient;

const urlConn = `${process.env.DB_PROT}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;
MongoClient.connect(urlConn, { useNewUrlParser: true }, (err, dbconn) => {
  if (err) {
    console.log(`Connection: KO`, err);
    return;
  }

  console.log(`Connection: OK`, dbconn);
  const db = dbconn.db(`${process.env.DB_NAME}`);
  db.collection('users').find({}).toArray((err, result) => {
    if (err) {
      console.log('users find: KO');
      return err;
    }

    console.log('users find: OK', result);
  });

  dbconn.close();

  return;
});