import React from 'react'
import { createStore } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import CounterApp from './Reducers'
import App from './Components/App'

let store = createStore(CounterApp)

render(
  <Provider store={ store }>
    <App />
  </Provider>
  , document.getElementById("root")
)
