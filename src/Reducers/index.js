import appReducer from "./appReducer"

import { combineReducers } from "redux"

const rootReducer = combineReducers({
  appReducer: appReducer
})

export default rootReducer
