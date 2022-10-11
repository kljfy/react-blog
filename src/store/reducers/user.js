const initValue = {}

function reducer(state = initValue, action) {
  const { type, data } = action
  if (type === 'user/save') {
    return data
  } else if (type === 'user/remove') {
    return {}
  } else if (type === 'user/update') {
    return data
  }
  return state
}

export default reducer
