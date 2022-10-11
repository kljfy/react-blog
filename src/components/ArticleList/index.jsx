import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './index.module.scss'

export default function ArticleList({ info }) {
  const history = useHistory()
  const handleGotoArticle = item => {
    history.push('/home/articleView', { articleId: item.id })
  }
  return (
    <div className={styles.root}>
      <div className="title" onClick={() => handleGotoArticle(info)}>
        {info.title}
      </div>
      <div className="tags">{info.gmtCreate}</div>
      <div className="introduction">{info.description}</div>
    </div>
  )
}

ArticleList.propTypes = {
  info: PropTypes.shape({
    title: PropTypes.string,
    gmtCreate: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string
  })
}

ArticleList.defaultProps = {
  info: {}
}
