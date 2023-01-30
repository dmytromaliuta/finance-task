import { combineReducers } from 'redux'
import { chartReducer } from './chartReducer'
import { tickersListReducer } from './tickersListReducer'

export default combineReducers({
    chart: chartReducer,
    tickersList: tickersListReducer
})