import React, { useState, Suspense, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import styles from './index.module.scss'
import MenuNav from '@/components/MenuNav'
import PersonData from './components/PersonData'

const Home = React.lazy(() => import('@/pages/Home'))
const MdArticleView = React.lazy(() => import('@/pages/MdArticle/View'))
const MdArticleEdit = React.lazy(() => import('@/pages/MdArticle/Edit'))
const ManageArticle = React.lazy(() => import('@/pages/ManageArticle'))
const PersonCenter = React.lazy(() => import('@/pages/PersonCenter'))

export default function Layout() {
  const history = useHistory()
  const token = useSelector(state => state.login.token)
  const [menuItems, setMenuItems] = useState([])
  useEffect(() => {
    if (!!token) {
      setMenuItems(() => {
        return [
          {
            label: '首页',
            key: 'home',
            path: '/home'
          },
          {
            label: '管理中心',
            key: 'manageCenter',
            path: '/home/manage'
          }
        ]
      })
    } else {
      setMenuItems(() => {
        return [
          {
            label: '首页',
            key: 'home',
            path: '/home'
          }
        ]
      })
    }
  }, [token])

  const handlerMenuClick = value => {
    history.push(value.path)
  }
  return (
    <div className={styles.root}>
      <div className="layout-header">
        <div className="header-center">
          <div className="header-left">
            <MenuNav items={menuItems} onClick={handlerMenuClick} />
          </div>
          <div className="header-right">
            <PersonData />
          </div>
        </div>
      </div>
      <div className="layout-body">
        <Suspense fallback={<div>loading</div>}>
          <Switch>
            <Route path="/home" exact component={Home}></Route>
            <Route
              path="/home/articleView"
              exact
              component={MdArticleView}
            ></Route>
            <Route
              path="/home/articleEdit"
              exact
              component={MdArticleEdit}
            ></Route>
            <Route
              path="/home/manage"
              exact
              component={ManageArticle}
            ></Route>
            <Route
              path="/home/personCenter"
              exact
              component={PersonCenter}
            ></Route>
          </Switch>
        </Suspense>
      </div>
    </div>
  )
}
