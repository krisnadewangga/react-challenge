import { combineReducers } from "redux"
import swapiReducer from './swapiReducer';

const rootReducer = combineReducers({
  people: swapiReducer,
})

export default rootReducer
