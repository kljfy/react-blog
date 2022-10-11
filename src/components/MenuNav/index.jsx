import React, { useState } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import styles from './index.module.scss'

export default function MenuNav({ items, onClick }) {
  const [currentMenu, setCurrentMenu] = useState('')
  const handleNavItemClick = item => {
    setCurrentMenu(item.key)
    onClick(item)
  }
  return (
    <nav className={styles.root}>
      <ul>
        {items.map(item => {
          return (
            <li key={item.key} onClick={() => handleNavItemClick(item)}>
              <div
                className={classnames(
                  'label',
                  currentMenu === item.key ? 'label-active' : ''
                )}
              >
                {item.label}
              </div>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

MenuNav.propTypes = {
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func
}

MenuNav.defaultProps = {
  onClick: () => {}
}
