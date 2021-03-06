const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

export default async function handler(req, res) {
  const db = await sqlite.open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  })

  if (req.method === 'GET') {
    const student = await db.all('SELECT * FROM student WHERE id = ?', [
      req.query.id,
    ])
    res.status(200).json(student)
  } else if (req.method === 'DELETE') {
    const student = await db.all(
      'SELECT * FROM Enrollment WHERE studentId = ?',
      [req.query.id]
    )
    if (Object.keys(student).length === 0) {
      const statement = await db.prepare(
        'DELETE FROM Student WHERE Student.id = ?'
      )
      const result = await statement.run(req.query.id)
      res.status(200).json(result)
    } else {
      res.status(409).json()
    }
  }
}
