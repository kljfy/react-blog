import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import { store, persistor } from './store'
import { disableReactDevTools } from '@/utils/base'
import '@/assets/styles/index.css'
import 'antd/dist/antd.css'

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
