const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

async function setup() {
  const db = await sqlite.open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  })
  db.get('PRAGMA foreign_keys = ON')

  await db.migrate({ force: 'last' })

  const students = await db.all('SELECT * FROM student')
  console.log('ALL STUDENTS', JSON.stringify(students, null, 2))

  const instructor = await db.all('SELECT * FROM instructor')
  console.log('INSTRUCTOR', JSON.stringify(instructor, null, 2))

  const course = await db.all('SELECT * FROM course')
  console.log('COURSE', JSON.stringify(course, null, 2))

  const enrollment = await db.all('SELECT * FROM enrollment')
  console.log('ENROLLMENT', JSON.stringify(enrollment, null, 2))
}

setup()
