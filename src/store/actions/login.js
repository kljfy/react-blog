export const saveToken = (data) => {
  return {
    type: 'login/token',
    data
  }
}

export const removeToken = () => {
  return {
    type: 'login/logout',
  }
}

/**
 * 登录功能
 */
// export const login = data => {
//   return async dispatch => {
//     const res = await request({
//       method: 'post',
//       url: '/login/user',
//       data
//     })
//     dispatch(saveToken(res.data))
//     setToken(res.data)
//   }
// }
