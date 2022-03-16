import useSWR from 'swr'
import styles from '../styles/Home.module.css'

import { useState } from 'react'
import {
  Alert,
  Box,
  Table,
  Grid,
  Group,
  Button,
  Container,
  Input,
  Text,
  TextInput,
  Switch,
  ActionIcon,
  Code,
  Space,
  Select,
} from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { AlertCircle } from 'tabler-icons-react'
import { useForm, formList } from '@mantine/form'
import { useRouter } from 'next/router'
import {
  getEnrollmentRows,
  getStudentRows,
  getInstructorRows,
  getCourseRows,
} from '../lib/fillTableRows'
import { post, remove } from '../lib/dbCommands'
import { getInstructorList, getStudentList } from '../lib/listIds'

export default function Home() {
  const router = useRouter()

  const fetcher = async (url) => fetch(url).then((res) => res.json())

  const { data: enrollmentData } = useSWR('/api/enrollment', fetcher)
  const { data: studentData } = useSWR('/api/student', fetcher)
  const { data: instructorData } = useSWR('/api/instructor', fetcher)
  const { data: courseData } = useSWR('/api/course', fetcher)

  const instructorList = getInstructorList(instructorData)
  const studentList = getStudentList(studentData)

  const enrollmentRows = getEnrollmentRows(enrollmentData)
  const studentRows = getStudentRows(studentData)
  const instructorRows = getInstructorRows(instructorData)
  const courseRows = getCourseRows(courseData)

  const [removeValue, setValue] = useState('')

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
      instructorId: 0,
      instructorName: '',
      department: '',
    },
  })

  const courseForm = useForm({
    initialValues: {
      courseId: 0,
      courseTitle: '',
      instructor: 0,
    },
  })

  const deleteStudentForm = useForm({
    initialValues: {
      deleteStudent: 0,
    },
  })

  const notifications = useNotifications

  return (
    <>
      <Table striped>
        <thead className={styles.table_header}>
          <tr>
            <th>Course Title</th>
            <th>Instructor Name</th>
            <th>Student Name</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>{enrollmentRows}</tbody>
      </Table>
      <Grid justify="space-around">
        <Grid.Col span={4}>
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
              onSubmit={studentForm.onSubmit((values) => {
                console.log(values)
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
            <Alert
              icon={<AlertCircle size={16} />}
              title="Bummer!"
              color="red"
              radius="md"
              withCloseButton
              closeButtonLabel="Close"
            >
              Something terrible happened! You made a mistake and there is no
              going back, your data was lost forever!
            </Alert>
            <form
              onSubmit={deleteStudentForm.onSubmit(async (values) => {
                if (values.deleteStudent !== 0) {
                  console.log(`value: ${values.deleteStudent}`)
                  const res = await remove('/api/student', values.deleteStudent)
                  console.log(res)
                  if (!res.ok) {
                    notifications.showNotification({
                      title: 'Default notification',
                      message: 'You cannot do that',
                    })
                  } else {
                    console.log(`Res: ${JSON.stringify(res, null, 2)}`)
                    deleteStudentForm.reset()
                    router.reload(window.location.pathname)
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
              onSubmit={instructorForm.onSubmit((values) => {
                console.log(values)
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
                    placeholder="0"
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

              {/* </Group> */}
              <Group position="center" mt="md">
                <Button type="submit">Add Instructor</Button>
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
              onSubmit={courseForm.onSubmit((values) => {
                console.log(values)
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

              {/* </Group> */}
              <Group position="center" mt="md">
                <Button type="submit">Add Course</Button>
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
