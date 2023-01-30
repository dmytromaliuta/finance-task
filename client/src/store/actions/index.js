import { GET_TICKERS } from '../types'
import { CHANGE_TICKER } from '../types'
import { TOGGLE_LIKE_ON_TICKER } from '../types'
import { CHANGE_INTERVAL } from '../types'

export const getTickers = (payload) => {
    return {
        type: GET_TICKERS,
        payload
    }
}

export const changeTickers = (payload) => {
    return {
        type: CHANGE_TICKER,
        payload
    }
}

export const changeInterval = (payload) => {
    return {
        type: CHANGE_INTERVAL,
        payload
    }
}

export const toggleLikeTicker = (payload) => {
    return {
        type: TOGGLE_LIKE_ON_TICKER,
        payload
    }
}