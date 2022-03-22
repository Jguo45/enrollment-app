import { Box, Group, Button, TextInput, Select } from '@mantine/core'
import { useForm } from '@mantine/form'
import { getEnrollmentList, getStudentList, getCourseList } from '../lib/listIds'
import { post, remove, update } from '../lib/dbCommands'

export default function ManageEnrollment({
  enrollmentData,
  studentData,
  courseData,
  router,
  notifications,
}) {
  const enrollmentList = getEnrollmentList(enrollmentData)
  const studentList = getStudentList(studentData)
  const courseList = getCourseList(courseData)

  const enrollForm = useForm({
    initialValues: {
      studentId: 0,
      courseId: 0,
    },
  })

  const gradeForm = useForm({
    initialValues: {
      enrollmentId: 0,
      grade: '',
    },
    validate: {
      grade: (value) => (value >= 0 && value <= 4 ? null : 'Invalid Grade'),
    },
  })

  const unenrollForm = useForm({
    initialValues: {
      unenrollId: 0,
    },
  })

  return (
    <>
      <Box>
        <form
          // ENROLLMENT
          onSubmit={enrollForm.onSubmit(async (values) => {
            const res = await post('/api/enrollment', values)
            if (res.ok) {
              enrollForm.reset()
              router.reload(window.location.pathname)
            } else {
              notifications.showNotification({
                title: 'Unable to Enroll',
                message: 'Student is already enrolled for that class',
                color: 'red',
              })
            }
          })}
        >
          <Group align="flex-end" position="center">
            <Select
              required
              data={studentList}
              label="Student"
              placeholder="Student"
              value={enrollForm.values.studentId}
              {...enrollForm.getInputProps('studentId')}
            />

            <Select
              required
              data={courseList}
              label="Course"
              placeholder="Course"
              value={enrollForm.values.courseId}
              {...enrollForm.getInputProps('courseId')}
            />
            <Button type="submit">Enroll</Button>
          </Group>
        </form>
      </Box>

      <Box>
        <form
          // UPDATE GRADE
          onSubmit={gradeForm.onSubmit(async (values) => {
            const res = await update('/api/enrollment', values.enrollmentId, values)
            if (res.ok) {
              gradeForm.reset()
              router.reload(window.location.pathname)
            } else {
              notifications.showNotification({
                title: 'Unable to Add Instructor',
                message: 'Instructor ID already exists',
                color: 'red',
              })
            }
          })}
        >
          <Group align="flex-end" position="center">
            <Select
              required
              data={enrollmentList}
              label="Enrollment ID"
              placeholder="ID #"
              value={gradeForm.values.enrollmentId}
              {...gradeForm.getInputProps('enrollmentId')}
            />

            <TextInput
              required
              label="Grade"
              placeholder="(0 - 4)"
              value={gradeForm.values.grade}
              {...gradeForm.getInputProps('grade')}
            />

            <Button type="submit">Update</Button>
          </Group>
        </form>
      </Box>

      <Box>
        <form
          // UNENROLL FROM CLASS
          onSubmit={unenrollForm.onSubmit(async (values) => {
            // console.log(values)
            if (values.unenrollId !== 0) {
              await remove('/api/enrollment', values.unenrollId)
              unenrollForm.reset()
              router.reload(window.location.pathname)
            }
          })}
        >
          <Group align="flex-end" position="center">
            <Select
              required
              data={enrollmentList}
              label="Enrollment ID"
              placeholder="ID #"
              value={unenrollForm.values.unenrollId}
              {...unenrollForm.getInputProps('unenrollId')}
            />
            <Button type="submit">Unenroll</Button>
          </Group>
        </form>
      </Box>
    </>
  )
}
