import React, { PropTypes } from 'react'

function Spinner({ onLeftClick, onRightClick }) {
  return <div><button onClick={onLeftClick}>-</button><button onClick={onRightClick}>+</button></div>
}

Spinner.propTypes = {
  onLeftClick: PropTypes.func.isRequired,
  onRightClick: PropTypes.func.isRequired
}

export default Spinner
