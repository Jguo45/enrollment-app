const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

export default async function handler(req, res) {
  const db = await sqlite.open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  })

  const student = await db.all('SELECT * FROM student WHERE id = ?', [
    req.query.id,
  ])

  res.status(200).json(student)
}
