import {
  Box,
  Table,
  Grid,
  Group,
  Button,
  TextInput,
  Select,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import styles from '../styles/Home.module.css'
import { getCourseRows } from '../lib/fillTableRows'
import { getCourseList, getInstructorList } from '../lib/listIds'
import { post, remove } from '../lib/dbCommands'

export default function ManageCourse({
  courseData,
  instructorData,
  router,
  notifications,
}) {
  const courseList = getCourseList(courseData)
  const instructorList = getInstructorList(instructorData)
  const courseRows = getCourseRows(courseData)

  const courseForm = useForm({
    initialValues: {
      courseId: '',
      courseTitle: '',
      instructor: 0,
    },
  })

  const deleteCourseForm = useForm({
    initialValues: {
      deleteCourse: 0,
    },
  })

  return (
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
        onSubmit={courseForm.onSubmit(async (values) => {
          const res = await post('/api/course', values)
          if (res.ok) {
            courseForm.reset()
            router.reload(window.location.pathname)
          } else {
            notifications.showNotification({
              title: 'Unable to Add',
              message: 'Course ID already exists',
              color: 'red',
            })
          }
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
              required
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
            required
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
  )
}
