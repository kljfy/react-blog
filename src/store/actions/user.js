export const saveUser = data => {
  return {
    type: 'user/save',
    data
  }
}

export const removeUser = () => {
  return {
    type: 'user/remove'
  }
}

export const updateUser = data => {
  return {
    type: 'user/update',
    data
  }
}
