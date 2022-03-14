const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

export default async function handler(req, res) {
  const db = await sqlite.open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  })

  if (req.method === 'GET') {
    const courses = await db.all(
      'SELECT Course.id, Course.title, Instructor.instructorName FROM Course JOIN Instructor ON Instructor.id = Course.instructorId'
    )
    res.status(200).json(courses)
  } else if (req.method === 'POST') {
    const statement = await db.prepare(
      'INSERT INTO Course (id, title, instructorId) VALUES (?, ?, ?)'
    )
    const result = statement.run(
      req.body.courseId,
      req.body.courseTitle,
      req.body.instructor
    )
    res.status(201).json(req.body)
  }
}
