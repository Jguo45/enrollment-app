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
import { getStudentRows } from '../lib/fillTableRows'
import { getStudentList } from '../lib/listIds'
import { post, remove } from '../lib/dbCommands'

export default function ManageStudent({ studentData, router, notifications }) {
  const studentList = getStudentList(studentData)
  const studentRows = getStudentRows(studentData)

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

  const deleteStudentForm = useForm({
    initialValues: {
      deleteStudent: 0,
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
        // ADD STUDENT
        onSubmit={studentForm.onSubmit(async (values) => {
          const res = await post('/api/student', values)
          studentForm.reset()
          if (res.ok) {
            router.reload(window.location.pathname)
          } else {
            notifications.showNotification({
              title: 'Unable to Add Student',
              message: 'Student ID already exists',
              color: 'red',
            })
          }
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
            required
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
  )
}
