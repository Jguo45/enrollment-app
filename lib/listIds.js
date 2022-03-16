export function getStudentList(data) {
  return (data ?? []).map((student) => ({
    value: student.id,
    label: `${student.id} : ${student.studentName}`,
  }))
}

export function getInstructorList(data) {
  return (data ?? []).map((instructor) => ({
    value: instructor.id,
    label: `${instructor.id} : ${instructor.instructorName}`,
  }))
}

export function getCourseList(data) {
  return (data ?? []).map((course) => ({
    value: course.id,
    label: `${course.id} : ${course.title}`,
  }))
}

export function getEnrollmentList(data) {
  return (data ?? []).map((enrollment) => ({
    value: enrollment.id,
    label: enrollment.id,
  }))
}
