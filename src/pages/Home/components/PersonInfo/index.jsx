import React from 'react'
import { useSelector } from 'react-redux'
import avatorAsset from '@images/avator.jpg'
import styles from './index.module.scss'

export default function PersonInfo() {
  const user = useSelector(state => state.user)
  // const tags = [
  //   {
  //     label: '阅读',
  //     key: 'read',
  //     num: 10
  //   },
  //   {
  //     label: '类别',
  //     key: 'category',
  //     num: 10
  //   },
  //   {
  //     label: '标签',
  //     key: 'label',
  //     num: 10
  //   }
  // ]
  return (
    <div className={styles.root}>
      <div className="person-info">
        <div className="head-portrait">
          <div className="avator">
            <img
              className="avator-img"
              src={user.avatar ? `data:image/jpg;base64,${user.avatar}` : avatorAsset}
              alt=""
            />
          </div>
        </div>
        <div className="name">{user.nickname}</div>
        {user.personSignature ? <div className="person-signature">{user.personSignature}</div> : null}
        {/* <div className="tags">
          {tags.map(item => {
            return (
              <div className="tag" key={item.key}>
                <div className="category">{item.label}</div>
                <div className="number">{item.num}</div>
              </div>
            )
          })}
        </div> */}
      </div>
    </div>
  )
}
