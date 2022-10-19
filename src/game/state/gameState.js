import { combineReducers, createStore } from '../../lib/store.js'
import movePlayer from './actions/movePlayer.js'
import startGame from './actions/startGame.js'
import initialState from './initialState.js'

const rootReducer = combineReducers({ startGame })
const store = createStore(rootReducer, initialState)
export default store
