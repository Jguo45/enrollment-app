import useSWR from 'swr'
import styles from '../styles/Home.module.css'
import {
  Box,
  Table,
  Grid,
  Group,
  Button,
  TextInput,
  Select,
} from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/router'
import {
  getEnrollmentRows,
  getStudentRows,
  getInstructorRows,
  getCourseRows,
} from '../lib/fillTableRows'
import { post, remove, update } from '../lib/dbCommands'
import {
  getCourseList,
  getEnrollmentList,
  getInstructorList,
  getStudentList,
} from '../lib/listIds'

export default function Home() {
  const router = useRouter()

  const fetcher = async (url) => fetch(url).then((res) => res.json())

  const { data: enrollmentData } = useSWR('/api/enrollment', fetcher)
  const { data: studentData } = useSWR('/api/student', fetcher)
  const { data: instructorData } = useSWR('/api/instructor', fetcher)
  const { data: courseData } = useSWR('/api/course', fetcher)

  const enrollmentList = getEnrollmentList(enrollmentData)
  const studentList = getStudentList(studentData)
  const instructorList = getInstructorList(instructorData)
  const courseList = getCourseList(courseData)

  const enrollmentRows = getEnrollmentRows(enrollmentData)
  const studentRows = getStudentRows(studentData)
  const instructorRows = getInstructorRows(instructorData)
  const courseRows = getCourseRows(courseData)

  const studentForm = useForm({
    initialValues: {
      studentId: '',
      studentName: '',
      credits: '',
    },

    validate: {
      studentId: (value) => (!isNaN(value) ? null : 'Invalid ID'),
    },
  })

  const instructorForm = useForm({
    initialValues: {
      instructorId: '',
      instructorName: '',
      department: '',
    },
  })

  const courseForm = useForm({
    initialValues: {
      courseId: '',
      courseTitle: '',
      instructor: 0,
    },
  })

  const deleteStudentForm = useForm({
    initialValues: {
      deleteStudent: 0,
    },
  })

  const deleteInstructorForm = useForm({
    initialValues: {
      deleteInstructor: 0,
    },
  })

  const deleteCourseForm = useForm({
    initialValues: {
      deleteCourse: 0,
    },
  })

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
  })

  const unenrollForm = useForm({
    initialValues: {
      enrollmentId: 0,
    },
  })

  const notifications = useNotifications()

  return (
    <>
      <Table striped>
        <thead className={styles.table_header}>
          <tr>
            <th>#</th>
            <th>Course Title</th>
            <th>Instructor Name</th>
            <th>Student Name</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>{enrollmentRows}</tbody>
      </Table>

      <Box>
        <h1 className={styles.title}>Manage Enrollment</h1>
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
              data={studentList}
              label="Student"
              placeholder="Student"
              value={enrollForm.values.studentId}
              {...enrollForm.getInputProps('studentId')}
            />

            <Select
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
            update('/api/enrollment', values.enrollmentId, values)
            gradeForm.reset()
            router.reload(window.location.pathname)
          })}
        >
          <Group align="flex-end" position="center">
            <Select
              data={enrollmentList}
              label="Enrollment ID"
              placeholder="ID #"
              value={gradeForm.values.enrollmentId}
              {...gradeForm.getInputProps('enrollmentId')}
            />

            <TextInput
              label="Grade"
              placeholder="0"
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
            if (values.enrollmentId !== 0) {
              remove('/api/enrollment', values.enrollmentId)
              unenrollForm.reset()
              router.reload(window.location.pathname)
            }
          })}
        >
          <Group align="flex-end" position="center">
            <Select
              data={enrollmentList}
              label="Enrollment ID"
              placeholder="ID #"
              value={unenrollForm.values.enrollmentId}
              {...unenrollForm.getInputProps('enrollmentId')}
            />
            <Button type="submit">Unenroll</Button>
          </Group>
        </form>
      </Box>

      <Grid justify="space-around">
        <Grid.Col span={4}>
          <h1 className={styles.title}>Manage Students</h1>
          <Box
            sx={{
              maxWidth: 500,
              border: '1px solid #eee',
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: 10,
            }}
            mx="auto"
          >
            <form
              // ADD STUDENT
              onSubmit={studentForm.onSubmit((values) => {
                post('/api/student', values)
                studentForm.reset()
                router.reload(window.location.pathname)
              })}
            >
              <Grid columns={24}>
                <Grid.Col span={12}>
                  <TextInput
                    required
                    label="Student Name"
                    placeholder="John"
                    sx={{ flex: 1 }}
                    value={studentForm.values.studentName}
                    {...studentForm.getInputProps('studentName')}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <TextInput
                    required
                    label="Credits"
                    placeholder="0"
                    sx={{ flex: 1 }}
                    value={studentForm.values.credits}
                    {...studentForm.getInputProps('credits')}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <TextInput
                    required
                    label="ID"
                    placeholder="0"
                    sx={{ flex: 1 }}
                    value={studentForm.values.studentId}
                    {...studentForm.getInputProps('studentId')}
                  />
                </Grid.Col>
              </Grid>

              <Group position="center" mt="md">
                <Button type="submit">Add Student</Button>
              </Group>
            </form>

            <form
              // DELETE STUDENT
              onSubmit={deleteStudentForm.onSubmit(async (values) => {
                if (values.deleteStudent !== 0) {
                  const res = await remove('/api/student', values.deleteStudent)
                  if (res.ok) {
                    deleteStudentForm.reset()
                    router.reload(window.location.pathname)
                  } else {
                    notifications.showNotification({
                      title: 'Unable to Delete',
                      message: 'Student exists in enrollment table',
                      color: 'red',
                    })
                  }
                }
              })}
            >
              <Group grow align="flex-end" position="center">
                <Select
                  data={studentList}
                  label="Student"
                  placeholder="Student"
                  value={deleteStudentForm.values.deleteStudent}
                  {...deleteStudentForm.getInputProps('deleteStudent')}
                />
                <Button type="submit">Delete</Button>
              </Group>
            </form>

            <Table striped>
              <thead className={styles.table_header}>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Credits</th>
                </tr>
              </thead>
              <tbody>{studentRows}</tbody>
            </Table>
          </Box>
        </Grid.Col>

        <Grid.Col span={4}>
          <h1 className={styles.title}>Manage Instructors</h1>
          <Box
            sx={{
              maxWidth: 500,
              border: '1px solid #eee',
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: 10,
            }}
            mx="auto"
          >
            <form
              // ADD INSTRUCTOR
              onSubmit={instructorForm.onSubmit((values) => {
                post('/api/instructor', values)
                instructorForm.reset()
                router.reload(window.location.pathname)
              })}
            >
              <Grid columns={24}>
                <Grid.Col span={12}>
                  <TextInput
                    required
                    label="Instructor Name"
                    placeholder="John"
                    sx={{ flex: 2 }}
                    value={instructorForm.values.instructorName}
                    {...instructorForm.getInputProps('instructorName')}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <TextInput
                    required
                    label="Department"
                    placeholder="English"
                    sx={{ flex: 2 }}
                    value={instructorForm.values.department}
                    {...instructorForm.getInputProps('department')}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <TextInput
                    required
                    label="ID"
                    placeholder="0"
                    sx={{ flex: 1 }}
                    value={instructorForm.values.instructorId}
                    {...instructorForm.getInputProps('instructorId')}
                  />
                </Grid.Col>
              </Grid>

              <Group position="center" mt="md">
                <Button type="submit">Add Instructor</Button>
              </Group>
            </form>

            <form
              // DELETE INSTRUCTOR
              onSubmit={deleteInstructorForm.onSubmit(async (values) => {
                if (values.deleteInstructor !== 0) {
                  const res = await remove(
                    '/api/instructor',
                    values.deleteInstructor
                  )
                  if (!res.ok) {
                    notifications.showNotification({
                      title: 'Unable to Delete',
                      message: 'Instructor exists in enrollment table',
                      color: 'red',
                    })
                  } else {
                    deleteInstructorForm.reset()
                    router.reload(window.location.pathname)
                  }
                }
              })}
            >
              <Group grow align="flex-end" position="center">
                <Select
                  data={instructorList}
                  label="Instructor"
                  placeholder="Instructor"
                  value={deleteInstructorForm.values.deleteInstructor}
                  {...deleteInstructorForm.getInputProps('deleteInstructor')}
                />
                <Button type="submit">Delete</Button>
              </Group>
            </form>

            <Table striped>
              <thead className={styles.table_header}>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>{instructorRows}</tbody>
            </Table>
          </Box>
        </Grid.Col>

        <Grid.Col span={4}>
          <h1 className={styles.title}>Manage Courses</h1>
          <Box
            sx={{
              maxWidth: 500,
              border: '1px solid #eee',
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: 10,
            }}
            mx="auto"
          >
            <form
              // ADD COURSE
              onSubmit={courseForm.onSubmit((values) => {
                post('/api/course', values)
                courseForm.reset()
                router.reload(window.location.pathname)
              })}
            >
              <Grid columns={24}>
                <Grid.Col span={12}>
                  <TextInput
                    required
                    label="Course Title"
                    placeholder="Math"
                    sx={{ flex: 2 }}
                    value={courseForm.values.courseTitle}
                    {...courseForm.getInputProps('courseTitle')}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <Select
                    data={instructorList}
                    label="Instructor"
                    placeholder="Instructor"
                    value={courseForm.values.instructor}
                    {...courseForm.getInputProps('instructor')}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <TextInput
                    required
                    label="ID"
                    placeholder="0"
                    sx={{ flex: 1 }}
                    value={courseForm.values.courseId}
                    {...courseForm.getInputProps('courseId')}
                  />
                </Grid.Col>
              </Grid>

              <Group position="center" mt="md">
                <Button type="submit">Add Course</Button>
              </Group>
            </form>

            <form
              // DELETE COURSE
              onSubmit={deleteCourseForm.onSubmit(async (values) => {
                if (values.deleteCourse !== 0) {
                  const res = await remove('/api/course', values.deleteCourse)
                  if (!res.ok) {
                    notifications.showNotification({
                      title: 'Unable to Delete',
                      message: 'Course exists in enrollment table',
                      color: 'red',
                    })
                  } else {
                    deleteCourseForm.reset()
                    router.reload(window.location.pathname)
                  }
                }
              })}
            >
              <Group grow align="flex-end" position="center">
                <Select
                  data={courseList}
                  label="Course"
                  placeholder="Course"
                  value={deleteCourseForm.values.deleteCourse}
                  {...deleteCourseForm.getInputProps('deleteCourse')}
                />
                <Button type="submit">Delete</Button>
              </Group>
            </form>

            <Table striped>
              <thead className={styles.table_header}>
                <tr>
                  <th>ID</th>
                  <th>Course</th>
                  <th>Instructor</th>
                </tr>
              </thead>
              <tbody>{courseRows}</tbody>
            </Table>
          </Box>
        </Grid.Col>
      </Grid>
    </>
  )
}
