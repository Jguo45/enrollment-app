const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

export default async function handler(req, res) {
  const db = await sqlite.open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  })

  if (req.method === 'GET') {
    const instructor = await db.all('SELECT * FROM instructor WHERE id = ?', [
      req.query.id,
    ])

    res.status(200).json(instructor)
  } else if (req.method === 'DELETE') {
    const instructor = await db.all(
      'SELECT * FROM Enrollment JOIN Course ON Enrollment.courseId = Course.id JOIN Instructor ON Course.instructorId = Instructor.id WHERE instructorId = ?',
      [req.query.id]
    )
    if (Object.keys(instructor).length === 0) {
      const statement = await db.prepare(
        'DELETE FROM Instructor WHERE instructor.id = ?'
      )
      const result = statement.run(req.query.id)
      res.status(200).json(result)
    } else {
      res.status(409).json()
    }
  }
}
