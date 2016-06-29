import { connect } from 'react-redux'
import NV from '../Components/NumberView'

function mapStateToProps(state) {
  return {
    text: state
  }
}

const NumberView = connect(mapStateToProps)(NV)

export default NumberView
