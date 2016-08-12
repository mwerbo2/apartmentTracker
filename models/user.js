const pg = require('pg-promise')({});
const config = {
    host:       process.env.DB_HOST,
    port:       process.env.DB_PORT,
    database:   process.env.DB_NAME,
    user:       process.env.DB_USER,
    password:   process.env.DB_PASS,
};

const _db = pg(config);


function createUser(req, res, next) {
  console.log("req.body ", req.body)
  _db.one(
    `INSERT INTO
    users (first_name, last_name, email, password_digest)
    VALUES ('M', 'm', 'm', 'm')
    returning *;`, req.body
    )
  .then(user => {
    console.log('User added successfully')
    res.rows = user;
    next();
  })
  .catch(error =>{
    console.log('Error adding user', req.body)
  })
}

// function getUserByID() {
//     return _db.any("select * from users where tag_id = " + "'" + data.id + "'" + ";")
// }

module.exports = { createUser };
