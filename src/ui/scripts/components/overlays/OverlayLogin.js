import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'

import { homepage } from '../../../../../package'

import Input from '../Input'
import Spacer from '../Spacer'
import Headline from '../Headline'
import Text from '../Text'
import Spinner from '../Spinner'
import Message from '../Message'

const OverlayLogin = (props) => {
  const [ inputs, setInputs ] = useState({
    username: '',
    password: ''
  })

  const onChange = (key) => (e) => setInputs({
    ...inputs,
    [key]: e.target.value
  })

  const onSubmit = (e) => {
    e.preventDefault()
    props.fetchToken(inputs)
  }

  const hasError = props.token.error != null
  const isFetching = props.token.fetching === true

  return (
    h('form', { className: 'card card--overlay', onSubmit },
      h('div', { className: 'card__inner align-center' },

        h(Spacer, { size: 2.4 }),

        h(Headline, {
          type: 'h1',
          className: 'color-white'
        }, 'Ackee'),
        h(Text, {}, 'Welcome back, sign in to continue.'),

        h(Spacer, { size: 2.5 }),

        hasError === true && h(Message, { status: 'error' }, props.token.error.message),

        h(Input, {
          type: 'username',
          required: true,
          disabled: isFetching === true,
          focused: true,
          placeholder: 'Username',
          value: inputs.username,
          onChange: onChange('username')
        }),
        h(Input, {
          type: 'password',
          required: true,
          disabled: isFetching === true,
          placeholder: 'Password',
          value: inputs.password,
          onChange: onChange('password')
        }),

        h(Spacer, { size: 1 })

      ),
      h('div', { className: 'card__footer' },

        h('a', {
          className: 'card__button link',
          href: homepage
        }, 'Help'),

        h('div', {
          className: 'card__separator'
        }),

        h('button', {
          className: 'card__button card__button--primary link color-white',
          disabled: isFetching === true
        }, isFetching === true ? h(Spinner) : 'Sign In →')

      )
    )
  )
}

OverlayLogin.propTypes = {
  token: PropTypes.object.isRequired,
  fetchToken: PropTypes.func.isRequired
}

export default OverlayLogin
