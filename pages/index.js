import useSWR from 'swr'
import styles from '../styles/Home.module.css'

import {
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
} from '@mantine/core'
import { useForm, formList } from '@mantine/form'
import { Trash } from 'tabler-icons-react'
import { useRouter } from 'next/router'

export default function Home() {
  const fetcher = async (url) => fetch(url).then((res) => res.json())

  const router = useRouter()
  const { data: enrollmentData } = useSWR('/api/enrollment', fetcher)
  const { data: studentData } = useSWR('/api/student', fetcher)
  const { data: instructorData } = useSWR('/api/instructor', fetcher)
  const { data: courseData } = useSWR('/api/course', fetcher)

  const enrollmentRows = (enrollmentData ?? []).map((enrollment) => (
    <tr key={enrollment.id}>
      <td>{enrollment.title}</td>
      <td>{enrollment.instructorName}</td>
      <td>{enrollment.studentName}</td>
      <td>{enrollment.grade}</td>
    </tr>
  ))

  const studentRows = (studentData ?? []).map((student) => (
    <tr key={student.id}>
      <td>{student.id}</td>
      <td>{student.studentName}</td>
      <td>{student.credits}</td>
    </tr>
  ))

  const instructorRows = (instructorData ?? []).map((instructor) => (
    <tr key={instructor.id}>
      <td>{instructor.id}</td>
      <td>{instructor.instructorName}</td>
      <td>{instructor.department}</td>
    </tr>
  ))

  const courseRows = (courseData ?? []).map((course) => (
    <tr key={course.id}>
      <td>{course.id}</td>
      <td>{course.title}</td>
      <td>{course.instructorName}</td>
    </tr>
  ))

  const studentForm = useForm({
    initialValues: {
      student: [{ studentId: 0, studentName: '', credits: 0 }],
    },

    validate: {
      studentId: (value) => (!isNaN(value) ? null : 'Invalid ID'),
    },
  })

  const instructorForm = useForm({
    initialValues: {
      instructor: [{ instructorId: 0, instructorName: '', department: '' }],
    },
  })

  const courseForm = useForm({
    initialValues: {
      course: [{ courseId: 0, courseTitle: '', instructor: 0 }],
    },
  })

  const addRow = async (url, values) => {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return (
    <>
      {/* <Container> */}
      {/* <Group grow>
          <Input placeholder="Student" />
          <Button variant="outline">Submit</Button>
        </Group> */}

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
                addRow('/api/student', values)
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
                    {...studentForm.getInputProps('studentName')}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <TextInput
                    required
                    label="Credits"
                    placeholder="0"
                    sx={{ flex: 1 }}
                    {...studentForm.getInputProps('credits')}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <TextInput
                    required
                    label="ID"
                    placeholder="0"
                    sx={{ flex: 1 }}
                    {...studentForm.getInputProps('studentId')}
                  />
                </Grid.Col>
              </Grid>

              {/* </Group> */}
              <Group position="center" mt="md">
                <Button type="submit">Submit</Button>
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
                    {...instructorForm.getInputProps('instructorName')}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <TextInput
                    required
                    label="Department"
                    placeholder="0"
                    sx={{ flex: 2 }}
                    {...instructorForm.getInputProps('department')}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <TextInput
                    required
                    label="ID"
                    placeholder="0"
                    sx={{ flex: 1 }}
                    {...instructorForm.getInputProps('instructorId')}
                  />
                </Grid.Col>
              </Grid>

              {/* </Group> */}
              <Group position="center" mt="md">
                <Button type="submit">Submit</Button>
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
                form.reset()
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
                    {...courseForm.getInputProps('courseTitle')}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <TextInput
                    required
                    label="Instructor ID"
                    placeholder="0"
                    sx={{ flex: 2 }}
                    {...courseForm.getInputProps('instructor')}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <TextInput
                    required
                    label="ID"
                    placeholder="0"
                    sx={{ flex: 1 }}
                    {...courseForm.getInputProps('courseId')}
                  />
                </Grid.Col>
              </Grid>

              {/* </Group> */}
              <Group position="center" mt="md">
                <Button type="submit">Submit</Button>
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
      {/* </Container> */}
    </>
  )
}
