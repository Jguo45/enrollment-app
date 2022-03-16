export async function post(url, values) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response
}

export async function remove(url, id) {
  const path = `${url}/${id}`
  const response = await fetch(path, {
    method: 'DELETE',
  })
  return response
}
