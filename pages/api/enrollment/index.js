const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

export default async function handler(req, res) {
  const db = await sqlite.open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  })

  if (req.method === 'GET') {
    const enrollment = await db.all(
      'SELECT Enrollment.id, Instructor.instructorName, Student.studentName, Course.title, Enrollment.grade FROM Enrollment JOIN Student ON Student.id = Enrollment.studentId JOIN course ON Course.id = Enrollment.courseId JOIN Instructor ON Course.instructorId = Instructor.id'
    )

    res.status(200).json(enrollment)
  } else if (req.method === 'POST') {
    const exists = await db.all(
      'SELECT 1 FROM Enrollment WHERE studentId = ? AND courseId = ?',
      [req.body.studentId, req.body.courseId]
    )
    if (Object.keys(exists).length === 0) {
      const statement = await db.prepare(
        'INSERT INTO Enrollment (studentId, courseId) VALUES (?, ?)'
      )
      const result = await statement.run(req.body.studentId, req.body.courseId)

      res.status(201).json(result)
    } else {
      res.status(409).json()
    }
  }
}
