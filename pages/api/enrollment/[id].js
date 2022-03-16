const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

// import sqlite from 'sqlite'
// import sqlite3 from 'sqlite3'

export default async function handler(req, res) {
  const db = await sqlite.open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  })

  const enrollment = await db.all(
    'SELECT * FROM Enrollment WHERE studentId = ?',
    [req.query.id]
  )

  res.status(200).json(enrollment)
}
