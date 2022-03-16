const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

// import sqlite from 'sqlite'
// import sqlite3 from 'sqlite3'

export default async function handler(req, res) {
  const db = await sqlite.open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  })

  if (req.method === 'GET') {
    const enrollment = await db.all(
      'SELECT * FROM Enrollment WHERE studentId = ?',
      [req.query.id]
    )

    res.status(200).json(enrollment)
  } else if (req.method === 'PUT') {
    const statement = await db.prepare(
      'UPDATE Enrollment SET grade = ? WHERE id = ?'
    )
    const result = statement.run(req.body.grade, req.query.id)
    res.status(204).json()
  } else if (req.method === 'DELETE') {
    const statement = await db.prepare(
      'DELETE FROM Enrollment WHERE Enrollment.id = ?'
    )
    const result = statement.run(req.query.id)
    res.status(200).json(result)
  }
}
