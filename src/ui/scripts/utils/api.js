import timeout from './timeout'

export default async (url, { props, method, body }) => {
  try {
    const headers = new window.Headers()
    const token = props.token.value.id

    if (token) headers.append('Authorization', `Bearer ${token}`)

    const request = window.fetch(url, {
      headers,
      method,
      body
    })

    const response = await timeout(request, 'Request timeout', 30000)

    if (response.ok === false) {
      const text = await response.text()
      throw new Error(text)
    }

    const type = response.headers.get('content-type')

    const isEmpty = type == null
    const isJSON = isEmpty === false && type.includes('application/json') === true

    if (isEmpty === true) {
      return undefined
    }

    if (isJSON === true) {
      const json = await response.json()
      return json.data
    }

    throw new Error('Unknown response content-type')
  } catch (err) {
    console.error(err)

    if (err.message === 'Token invalid') {
      // Reset token and show login
      props.deleteToken(props)
    }

    // Re-throw error so the caller can handle it, too
    throw err
  }
}
