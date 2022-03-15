export function getEnrollmentRows(data) {
  const rows = (data ?? []).map((enrollment) => (
    <tr key={enrollment.id}>
      <td>{enrollment.title}</td>
      <td>{enrollment.instructorName}</td>
      <td>{enrollment.studentName}</td>
      <td>{enrollment.grade}</td>
    </tr>
  ))

  return rows
}

export function getStudentRows(data) {
  const rows = (data ?? []).map((student) => (
    <tr key={student.id}>
      <td>{student.id}</td>
      <td>{student.studentName}</td>
      <td>{student.credits}</td>
    </tr>
  ))

  return rows
}

export function getInstructorRows(data) {
  const rows = (data ?? []).map((instructor) => (
    <tr key={instructor.id}>
      <td>{instructor.id}</td>
      <td>{instructor.instructorName}</td>
      <td>{instructor.department}</td>
    </tr>
  ))

  return rows
}

export function getCourseRows(data) {
  const rows = (data ?? []).map((course) => (
    <tr key={course.id}>
      <td>{course.id}</td>
      <td>{course.title}</td>
      <td>{course.instructorName}</td>
    </tr>
  ))

  return rows
}
