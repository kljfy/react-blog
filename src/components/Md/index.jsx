import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import PropTypes from 'prop-types'
import styles from './index.module.scss'

export default function Md({ readOnly, onMdChange, articleContent }) {
  const [value, setValue] = React.useState('')
  const handleValueChange = val => {
    setValue(val)
    if (onMdChange) {
      onMdChange(val)
    }
  }
  return (
    <div className={styles.root}>
      {readOnly ? (
        <MDEditor.Markdown
          source={articleContent}
          style={{ whiteSpace: 'pre-wrap' }}
        />
      ) : (
        <MDEditor
          className="md-edit-my"
          value={value}
          onChange={handleValueChange}
        />
      )}
    </div>
  )
}

Md.propTypes = {
  readOnly: PropTypes.bool
}

Md.defaultProps = {
  readOnly: false
}
