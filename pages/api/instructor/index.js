const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

export default async function handler(req, res) {
  const db = await sqlite.open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  })

  if (req.method === 'GET') {
    const instructors = await db.all('SELECT * FROM instructor')

    res.status(200).json(instructors)
  } else if (req.method === 'POST') {
    const statement = await db.prepare(
      'INSERT INTO Instructor (id, instructorName, department) VALUES (?, ?, ?)'
    )
    const result = statement.run(
      req.body.instructorId,
      req.body.instructorName,
      req.body.department
    )
    res.status(201).json(req.body)
  }
}
