import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

import { createEpicMiddleware } from "redux-observable"

import rootReducer from "./Reducers"
import rootEpic from "./Epics"

const epicMiddleware = createEpicMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
)
epicMiddleware.run(rootEpic)

export default store
