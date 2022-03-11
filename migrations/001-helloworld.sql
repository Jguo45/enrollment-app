-- Up
CREATE TABLE Student (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  credits INTEGER
);

CREATE TABLE Instructor (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  department TEXT
);

CREATE TABLE Course (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  instructorId INTEGER REFERENCES Instructor(id)
);

CREATE TABLE Enrollment (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  studentId INTEGER REFERENCES Student(id),
  courseId INTEGER REFERENCES Course(id),
  grade INTEGER
);

INSERT INTO Student (name, credits) values ('John', 20);
INSERT INTO Student (name, credits) values ('Jeff', 15);
INSERT INTO Instructor (name, department) values ('Jack', 'Math');
INSERT INTO Course (title, instructorId) values ('Discrete Math', 1);
INSERT INTO Enrollment (studentId, courseId, grade) values (1, 1, 3);

-- Down
DROP TABLE Student;
DROP TABLE Instructor;
DROP TABLE Course;
DROP TABLE Enrollment;