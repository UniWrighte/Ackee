export const SET_ROUTE_VALUE = window.Symbol()
export const RESET_ROUTE = window.Symbol()

export const setRouteValue = (payload) => ({
  type: SET_ROUTE_VALUE,
  payload
})

export const resetRoute = () => ({
  type: SET_ROUTE_VALUE
})
