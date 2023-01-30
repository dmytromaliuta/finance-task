import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { changeTickers, toggleLikeTicker } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

function TickersList() {
    let dispatch = useDispatch()
    let { tickersList } = useSelector(store => store)
    let [input, setInput] = useState('')
    let [tickers, setTickers] = useState(tickersList)

    useEffect(() => {
        setTickers(tickersList.filter(item => {
            return item.ticker.toLowerCase().includes(input)
        }))
    }, [input])

    const handleInput = (e) => {
        setInput(e.target.value.toLowerCase())
    }

    return (
        <div className="TickersList">
            <input type="text" placeholder="Search tickers" onChange={handleInput} value={input} />
            <ul className="items">
                {
                    tickers.map(item => {
                        return (
                            <li key={item.id}>
                                <div className='info' onClick={() => dispatch(changeTickers(item.ticker))}>
                                    <span>{item.ticker}</span>
                                </div>
                                <FontAwesomeIcon
                                    className='star'
                                    icon={item.isLiked ? faStarSolid : faStarRegular}
                                    onClick={() => { dispatch(toggleLikeTicker(item)) }} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default TickersList