import api from '../utils/api'

export const SET_REFERRERS_SORTING = window.Symbol()
export const SET_REFERRERS_VALUE = window.Symbol()
export const SET_REFERRERS_FETCHING = window.Symbol()
export const SET_REFERRERS_ERROR = window.Symbol()
export const RESET_REFERRERS = window.Symbol()

export const setReferrersSorting = (payload) => ({
  type: SET_REFERRERS_SORTING,
  payload
})

export const setReferrersValue = (domainId, payload) => ({
  type: SET_REFERRERS_VALUE,
  domainId,
  payload
})

export const setReferrersFetching = (domainId, payload) => ({
  type: SET_REFERRERS_FETCHING,
  domainId,
  payload
})

export const setReferrersError = (domainId, payload) => ({
  type: SET_REFERRERS_ERROR,
  domainId,
  payload
})

export const resetReferrers = () => ({
  type: RESET_REFERRERS
})

export const fetchReferrers = (props, domainId) => async (dispatch) => {
  dispatch(setReferrersFetching(domainId, true))
  dispatch(setReferrersError(domainId))

  try {
    const data = await api(`/domains/${domainId}/referrers?sorting=${props.referrers.sorting}`, {
      method: 'get',
      props
    })

    dispatch(setReferrersValue(domainId, data))
  } catch (err) {
    dispatch(setReferrersError(domainId, err))
  } finally {
    dispatch(setReferrersFetching(domainId, false))
  }
}
