const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

export default async function handler(req, res) {
  const db = await sqlite.open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  })

  const enrollment = await db.all(
    'SELECT Enrollment.id, Instructor.instructorName, Student.studentName, Course.title, Enrollment.grade FROM Enrollment JOIN Student ON Student.id = Enrollment.studentId JOIN course ON Course.id = Enrollment.courseId JOIN Instructor ON Course.instructorId = Instructor.id'
  )

  res.status(200).json(enrollment)
}
