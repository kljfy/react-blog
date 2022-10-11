const initValue = {
  token: ''
}

function reducer(state = initValue, action) {
  const { type, data } = action;
  if (type === 'login/token') {
    return data
  } else if (type === 'login/logout') {
    return {}
  }
  return state
}

export default reducer
