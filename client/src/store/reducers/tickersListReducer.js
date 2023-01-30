import { TOGGLE_LIKE_ON_TICKER } from '../types'

let initialState = [
    {
        id: 1,
        ticker: 'AAPL',
        isLiked: false,
    },
    {
        id: 2,
        ticker: 'GOOGL',
        isLiked: false,
    },
    {
        id: 3,
        ticker: 'MSFT',
        isLiked: false,
    },
    {
        id: 4,
        ticker: 'AMZN',
        isLiked: true,
    },
    {
        id: 5,
        ticker: 'FB',
        isLiked: false,
    },
    {
        id: 6,
        ticker: 'TSLA',
        isLiked: false,
    }
]

export function tickersListReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_LIKE_ON_TICKER:
            return state.map(item => {
                if (item.id === action.payload.id) {
                    item.isLiked = !item.isLiked
                }
                return item
            })
        default:
            return state
    }
}