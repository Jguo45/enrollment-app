import useSWR from 'swr'
import styles from '../styles/Home.module.css'
import { Table, Grid, Divider } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { getEnrollmentRows } from '../lib/fillTableRows'

import ManageStudent from '../components/manageStudent'
import ManageInstructor from '../components/manageInstructor'
import ManageCourse from '../components/manageCourse'
import ManageEnrollment from '../components/manageEnrollment'

export default function Home() {
  const fetcher = async (url) => fetch(url).then((res) => res.json())

  const router = useRouter()
  const notifications = useNotifications()

  const { data: enrollmentData } = useSWR('/api/enrollment', fetcher)
  const { data: studentData } = useSWR('/api/student', fetcher)
  const { data: instructorData } = useSWR('/api/instructor', fetcher)
  const { data: courseData } = useSWR('/api/course', fetcher)

  const enrollmentRows = getEnrollmentRows(enrollmentData)

  return (
    <>
      <h1 className={styles.title}>Enrollment</h1>
      <Divider my="sm" />
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

      <h1 className={styles.title}>Manage Enrollment</h1>

      <ManageEnrollment
        enrollmentData={enrollmentData}
        studentData={studentData}
        courseData={courseData}
        router={router}
        notifications={notifications}
      />

      <Grid justify="space-around">
        <Grid.Col span={4}>
          <h1 className={styles.title}>Manage Students</h1>
          <ManageStudent
            studentData={studentData}
            router={router}
            notifications={notifications}
          />
        </Grid.Col>

        <Grid.Col span={4}>
          <h1 className={styles.title}>Manage Instructors</h1>

          <ManageInstructor
            instructorData={instructorData}
            router={router}
            notifications={notifications}
          />
        </Grid.Col>

        <Grid.Col span={4}>
          <h1 className={styles.title}>Manage Courses</h1>

          <ManageCourse
            courseData={courseData}
            instructorData={instructorData}
            router={router}
            notifications={notifications}
          />
        </Grid.Col>
      </Grid>
    </>
  )
}
