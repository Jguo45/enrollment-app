export function getInstructorList(data) {
  return (data ?? []).map((instructor) => ({
    value: instructor.id,
    label: `${instructor.id} : ${instructor.instructorName}`,
  }))
}

export function getStudentList(data) {
  return (data ?? []).map((student) => ({
    value: student.id,
    label: `${student.id} : ${student.studentName}`,
  }))
}
