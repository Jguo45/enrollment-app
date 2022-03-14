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
  const fetcher = async (url) => await fetch(url).then((res) => res.json())
  const router = useRouter()
  // const reload = () => {
  //   router.reload()
  // }
  const { data } = useSWR('/api/enrollment', fetcher)

  const rows = (data ?? []).map((enrollment) => (
    <tr key={enrollment.id}>
      <td>{enrollment.title}</td>
      <td>{enrollment.instructorName}</td>
      <td>{enrollment.studentName}</td>
      <td>{enrollment.grade}</td>
    </tr>
  ))

  const form = useForm({
    initialValues: {
      students: [{ id: 0, name: '', credits: 0 }],
    },
  })

  return (
    <>
      <Container>
        {/* <Group grow>
          <Input placeholder="Student" />
          <Button variant="outline">Submit</Button>
        </Group> */}

        <Table striped>
          <thead className={styles.table_header}>
            <th>Course Title</th>
            <th>Instructor Name</th>
            <th>Student Name</th>
            <th>Grade</th>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        <Grid justify="space-around">
          <Grid.Col span={4}>
            <Box sx={{ maxWidth: 500 }} mx="auto">
              <form
                onSubmit={form.onSubmit((values) => {
                  console.log(values)
                  form.reset()
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
                      {...form.getInputProps('name')}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <TextInput
                      required
                      label="Credits"
                      placeholder="0"
                      sx={{ flex: 1 }}
                      {...form.getInputProps('credits')}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <TextInput
                      required
                      label="ID"
                      placeholder="0"
                      sx={{ flex: 1 }}
                      {...form.getInputProps('id')}
                    />
                  </Grid.Col>
                </Grid>

                {/* </Group> */}
                <Group position="center" mt="md">
                  <Button type="submit">Submit</Button>
                </Group>
              </form>
            </Box>
          </Grid.Col>

          <Grid.Col span={4}>
            <Box sx={{ maxWidth: 500 }} mx="auto">
              <form
                onSubmit={form.onSubmit((values) => {
                  console.log(values)
                  form.reset()
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
                      {...form.getInputProps('name')}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <TextInput
                      required
                      label="Credits"
                      placeholder="0"
                      sx={{ flex: 1 }}
                      {...form.getInputProps('credits')}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <TextInput
                      required
                      label="ID"
                      placeholder="0"
                      sx={{ flex: 1 }}
                      {...form.getInputProps('id')}
                    />
                  </Grid.Col>
                </Grid>

                {/* </Group> */}
                <Group position="center" mt="md">
                  <Button type="submit">Submit</Button>
                </Group>
              </form>
            </Box>
          </Grid.Col>

          <Grid.Col span={4}>
            <Box sx={{ maxWidth: 500 }} mx="auto"></Box>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  )
}
