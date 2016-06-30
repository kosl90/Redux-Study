# Redux Study

Redux study repository, README.md is note.


# Basic

Redux has 4 basic concept: `state`, `action`, `reducer` and `store`


## state

~~~
type state = Any
~~~

`state` is read-only, It usually refers to the single state value that managed by the `store` and returned by `store.getState()`.


## action

~~~
type Action = object
~~~

Action is payloads of information, represents an intention to change the state. Using `store.dispatch()` to send them to `store`. They are the _only_ source of information for the store.


## reducer

~~~
type Reducer<S, A> = (state: S, action: A) => S
~~~

A reducer is a function that accepts an accumulation and a value and returns a new accumulation. In Redux, the accumulated value is the state object, and the values being accumulated are actions. Reducers calculate a new state given the previous state and an action. **It's important to return the previous `state` for any unknown action.**

To avoid huge code block, please carefully splitting reducer into smaller reducers. It's also called _reducer composition_, it's the fundamental pattern of building Redux apps. Redux provides a utility called `combineReducers(reducers: Object) => Reducer`, this combines smaller reducer into one.


## store

~~~
type Store = {
  dispatch: Dispatch,
  getState: () => State,
  subscribe: (listener: () => void) => () => void,
  replaceReducer: (reducer: Reducer) => void
}
~~~

An object that holds the application's state tree. There should be only a single store in a Redux app, as composition happens on the reducer level. Usually, `createStore(reducer: Reducer, initValue?: Any, enhancer?: ()=>void)` is used to create the only store.


## some other useful concepts

* dispatch function: In Redux, there is no `Dispatcher` like `flux`, but a dispatch function is still needed to dispatch action.

* creator: creator is a special concept for Action and Store in common, it is a convenient function to create Action and/or Store.
  `type ActionCreator(...args: Any) => Action|AsyncAction` and `type StoreCreator(reducer: Reducer, initState?: State) => Store`

see [Glossary](http://redux.js.org/docs/Glossary.html) for much more details.

# Redux with React

Please use `react-redux` and [Component-Container pattern](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.mxoiyzxfd), like [Todos](https://github.com/reactjs/redux/tree/master/examples/todos), if you don't use this pattern please see [Counter](https://github.com/reactjs/redux/tree/master/examples/counter).

The whole thing `react-redux` provides are `Provide` component and `connect()` function.

## Container component and connect() function

Technically you could write the container components by hand using `store.subscribe`. It's not advised, because React Redux makes many performance optimizations that are hard to do by hand. For this reason, we'd better generate them using the `connect()` function.

~~~
connect(
  mapStateToProps?: (state, ownProps?) => stateProps,
  mapDispatchToProps?: Object of reduxActionCreator | (dispatch, ownProps?) => dispatchProps,
  mergeProps?: (stateProps, dispatchProps, ownProps) => props,
  options?: Object)
~~~

The most used arguments are `mapStateToProps` and `mapDispatchToProps`.

`mapStateToProps` tells how to transform the current Redux store state into the props you want to pass to a presentational component.

`mapDispatchToProps` receives the `dispatch()` method and returns callback props that you want to inject into the presentational component.

see [connect API doc](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) for much more details.


## Provide component

All container components need access to the Redux store so they can subscribe to it. One option would be to pass it as a prop to every container component. However it gets tedious, the option we recommend is to use a special React Redux component called <Provider> to magically make the store available to all container components in the application without passing it explicitly. You only need to use it once when you render the root component.

~~~JSX
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
~~~


# Vanilla Redux

without `react-redux`, we lose many convenient functions, you should use the only `store` and it's API.

[Counter Vanilla](https://github.com/reactjs/redux/tree/master/examples/counter-vanilla) is the official example.


# Async Redux

// TODO


# HMR

From Redux 2.0, no implicit reload for reducers any more, so do it yourself explicitly, for example:

~~~JavaScript
// file: store/configureStore.js
import reducers from "./reducers"
import { createStore } from "redux"

// these codes works for `webpack-dev-server` too.
function configureStore(initState) {
  let store = createStore(reducers, initState)

  if (module.hot) {
    module.hot.accept("./reducers", ()=>{
      store.replaceReducer(require("./reducers".default));
    }
  }
  
  return store
}
~~~

~~~JavaScript
// file: index.js
// ...
import configureStore from './store/configureStore'

let store = configureStore()

// ...
~~~


## Working with `webpack-dev-server`

Using above codes is ok, just `module.hot.accept()` seems to work too. Stateless function leads to page refreshing.


## Working with `webpack-hot-middleware`

Stateless function component is not supported and page won't be refreshed automatically in my practice, a simple way is to add `module.hot.accept()` in the file which renders the <Provide> component. However, this leads to a warning or maybe an error:

> `<Provider>` does not support changing `store` on the fly. It is most likely that you see this error because you updated to Redux 2.x and React Redux 2.x which no longer hot reload reducers automatically. See https://github.com/reactjs/react-redux/releases/tag/v2.0.0 for the migration instructions.


# References

* [Redux official website](http://redux.js.org/)
* [Glossary](http://redux.js.org/docs/Glossary.html)
* [Redux Examples](http://redux.js.org/docs/introduction/Examples.html)
* [ReduxUsageWithReact](http://redux.js.org/docs/basics/UsageWithReact.html)
