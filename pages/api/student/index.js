const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

export default async function handler(req, res) {
  const db = await sqlite.open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  })

  if (req.method === 'GET') {
    const students = await db.all('SELECT * FROM student')
    res.status(200).json(students)
  } else if (req.method === 'POST') {
    const statement = await db.prepare(
      'INSERT INTO Student (id, studentName, credits) VALUES (?, ?, ?)'
    )
    try {
      const result = await statement.run(
        req.body.studentId,
        req.body.studentName,
        req.body.credits
      )
      res.status(201).json(result)
    } catch (err) {
      res.status(409).json()
    }
  }
}
