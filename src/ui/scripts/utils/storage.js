import { version } from '../../../../package'

// Should include the package version so we can increase the version number
// when the structure of the state has changed to avoid loading outdated states.
const PERSISTED_STATE_KEY = `ackee_state_${version}`

export const load = () => {
  const serializedState = window.localStorage.getItem(PERSISTED_STATE_KEY)

  if (serializedState == null) return undefined

  return JSON.parse(serializedState)
}

export const save = (state) => {
  const serializedState = JSON.stringify(state)

  window.localStorage.setItem(PERSISTED_STATE_KEY, serializedState)
}
