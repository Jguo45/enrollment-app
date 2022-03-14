-- Up
CREATE TABLE Student (
  id INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
  studentName TEXT,
  credits INTEGER
);

CREATE TABLE Instructor (
  id INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
  instructorName TEXT,
  department TEXT
);

CREATE TABLE Course (
  id INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  instructorId INTEGER,
  FOREIGN KEY (instructorId) REFERENCES Instructor(id)
);

CREATE TABLE Enrollment (
  id INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
  studentId INTEGER,
  courseId INTEGER,
  grade INTEGER,
  FOREIGN KEY (studentId) REFERENCES Student(id),
  FOREIGN KEY (courseId) REFERENCES Course(id)
);

INSERT INTO Student (studentName, credits) values ('John', 20);
INSERT INTO Student (studentName, credits) values ('Jeff', 15);
INSERT INTO Student (id, studentName, credits) values (212, 'Peter', 30);
INSERT INTO Student (studentName, credits) values ('Tim', 15);
INSERT INTO Instructor (instructorName, department) values ('Jack', 'Math');
INSERT INTO Course (title, instructorId) values ('Discrete Math', 1);
INSERT INTO Enrollment (studentId, courseId, grade) values (1, 1, 3);
INSERT INTO Enrollment (studentId, courseId, grade) values (2, 1, 4);

-- Down
DROP TABLE Enrollment;
DROP TABLE Course;
DROP TABLE Instructor;
DROP TABLE Student;
