// import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { persistStore, persistReducer } from 'redux-persist'
// 存储机制，当前使用 sessionStorage, 可换成 localStorage
import storageSession from 'redux-persist/lib/storage/session'
import reducer from './reducers'

const persistConfig = {
  key: 'root', // 必须有的
  storage: storageSession, // 缓存机制
  whitelist: ['login', 'user'] // reducer 里持久化的数据，除此外均为不持久化数据
  // blacklist: ['login'] // reducer 里不持久化的数据，除此外全部持久化数据
}

const persistReducers = persistReducer(persistConfig, reducer)

export const store = createStore(
  persistReducers,
  composeWithDevTools(applyMiddleware(thunk))
)
export const persistor = persistStore(store)

// export default configureStore(
//   // 参数一：根reducer
//   { reducer },
//   // 参数二：初始化时要加载的状态
//   {
//     login: getToken()
//   },
//   // 参数三：增强器
//   composeWithDevTools(applyMiddleware(thunk))
// );
