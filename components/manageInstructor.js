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
import { getInstructorRows } from '../lib/fillTableRows'
import { getInstructorList } from '../lib/listIds'
import { post, remove } from '../lib/dbCommands'

export default function ManageInstructor({
  instructorData,
  router,
  notifications,
}) {
  const instructorList = getInstructorList(instructorData)
  const instructorRows = getInstructorRows(instructorData)

  const instructorForm = useForm({
    initialValues: {
      instructorId: '',
      instructorName: '',
      department: '',
    },
  })

  const deleteInstructorForm = useForm({
    initialValues: {
      deleteInstructor: 0,
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
        // ADD INSTRUCTOR
        onSubmit={instructorForm.onSubmit(async (values) => {
          const res = await post('/api/instructor', values)
          instructorForm.reset()

          if (res.ok) {
            router.reload(window.location.pathname)
          } else {
            notifications.showNotification({
              title: 'Unable to Add',
              message: 'Instructor ID already exists',
              color: 'red',
            })
          }
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
            const res = await remove('/api/instructor', values.deleteInstructor)
            deleteInstructorForm.reset()

            if (res.ok) {
              router.reload(window.location.pathname)
            } else {
              notifications.showNotification({
                title: 'Unable to Delete',
                message: 'Instructor exists in enrollment table',
                color: 'red',
              })
            }
          }
        })}
      >
        <Group grow align="flex-end" position="center">
          <Select
            required
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
  )
}
