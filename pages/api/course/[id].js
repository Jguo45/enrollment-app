const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

export default async function handler(req, res) {
  const db = await sqlite.open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  })

  if (req.method === 'GET') {
    const course = await db.all('SELECT * FROM course WHERE id = ?', [
      req.query.id,
    ])

    res.status(200).json(course)
  } else if (req.method === 'DELETE') {
    const course = await db.all('SELECT * FROM Enrollment WHERE courseId = ?', [
      req.query.id,
    ])
    if (Object.keys(course).length === 0) {
      const statement = await db.prepare(
        'DELETE FROM Course WHERE course.id = ?'
      )
      const result = statement.run(req.query.id)
      res.status(200).json(result)
    } else {
      res.status(409).json()
    }
  }
}
