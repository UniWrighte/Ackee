import api from '../utils/api'

export const SET_TOKEN_VALUE = window.Symbol()
export const SET_TOKEN_FETCHING = window.Symbol()
export const SET_TOKEN_ERROR = window.Symbol()
export const RESET_TOKEN = window.Symbol()

export const setTokenValue = (payload) => ({
  type: SET_TOKEN_VALUE,
  payload
})

export const setTokenFetching = (payload) => ({
  type: SET_TOKEN_FETCHING,
  payload
})

export const setTokenError = (payload) => ({
  type: SET_TOKEN_ERROR,
  payload
})

export const resetToken = () => ({
  type: RESET_TOKEN
})

export const fetchToken = (props, state) => async (dispatch) => {
  dispatch(setTokenFetching(true))
  dispatch(setTokenError())

  try {
    const data = await api('/tokens', {
      method: 'post',
      body: JSON.stringify(state),
      props
    })

    dispatch(setTokenValue(data))
  } catch (err) {
    dispatch(setTokenError(err))
  } finally {
    dispatch(setTokenFetching(false))
  }
}

export const deleteToken = (props) => async (dispatch) => {
  dispatch(resetToken())

  props.resetDomains()
  props.resetViews()
  props.resetReferrers()
  props.resetRoute()

  try {
    await api(`/tokens/${props.token.value.id}`, {
      method: 'delete',
      props
    })
  } catch (err) {
    dispatch(setTokenError(err))
  }
}
