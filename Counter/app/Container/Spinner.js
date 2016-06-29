import { connect } from 'react-redux'
import S from "../Components/Spinner"
import { Inc, Dec } from "../Actions"

function mapDispatchToProps(dispatch) {
  return {
    onLeftClick: () => dispatch(Dec()),
    onRightClick: () => dispatch(Inc())
  }
}

const Spinner = connect(null, mapDispatchToProps)(S)

export default Spinner
