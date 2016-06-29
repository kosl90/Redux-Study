import React, { PropTypes } from 'react'
import "./NumberView.css"

function NumberView({ text }) {
  return <div className="number-view">{text}</div>
}

NumberView.propTypes = {
  text: PropTypes.number.isRequired
}
export default NumberView
