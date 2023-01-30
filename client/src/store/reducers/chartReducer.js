import { GET_TICKERS } from '../types'
import { CHANGE_TICKER } from '../types'
import { CHANGE_INTERVAL } from '../types'

let initialState = {
    currentTicker: 'AAPL',
    currentInterval: 5000,
    tickers: {
        "AAPL": {
            300000: [],
            60000: [],
            30000: [],
            5000: []
        },
        "GOOGL": {
            300000: [],
            60000: [],
            30000: [],
            5000: []
        },
        "MSFT": {
            300000: [],
            60000: [],
            30000: [],
            5000: []
        },
        "AMZN": {
            300000: [],
            60000: [],
            30000: [],
            5000: []
        },
        "FB": {
            300000: [],
            60000: [],
            30000: [],
            5000: []
        },
        "TSLA": {
            300000: [],
            60000: [],
            30000: [],
            5000: []
        }
    }
}

export function chartReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_TICKER:
            return { ...state, currentTicker: action.payload }
        case CHANGE_INTERVAL:
            return { ...state, currentInterval: action.payload }
        case GET_TICKERS:
            let updatedTickers = Object.assign({}, state.tickers)
            action.payload.forEach(tickerObject => {
                Object.keys(updatedTickers[tickerObject.ticker]).forEach(intervalKey => {
                    if (updatedTickers[tickerObject.ticker][intervalKey].length === 0) {
                        updatedTickers[tickerObject.ticker][intervalKey].push(tickerObject)
                    }
                    let newTickerDate = new Date(tickerObject.last_trade_time)
                    let targetCurrencyArray = updatedTickers[tickerObject.ticker][intervalKey]
                    let oldTickerDate = new Date(targetCurrencyArray[targetCurrencyArray.length - 1].last_trade_time)

                    if (newTickerDate.getTime() - oldTickerDate.getTime() >= intervalKey) {
                        updatedTickers[tickerObject.ticker][intervalKey].push(tickerObject)
                    }
                    updatedTickers[tickerObject.ticker][intervalKey] = updatedTickers[tickerObject.ticker][intervalKey].slice(-20)
                })
            })
            return { ...state, tickers: updatedTickers }
        default:
            return state
    }
}