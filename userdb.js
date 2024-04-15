const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

db.serialize(() => {
  db.run(`CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`, (err) => {
    if (err) {
      console.log(err);
    }
  });

  let insert = 'INSERT INTO Users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
  db.run(insert, ['John', 'Doe', 'john.doe@gmail.com', 'password1']);
  db.run(insert, ['Jane', 'Doe', 'jane.doe@gmail.com', 'password2']);
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});