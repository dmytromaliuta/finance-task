import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { changeTickers, toggleLikeTicker } from '../store/actions'

function LikedTickers() {

    let dispatch = useDispatch()
    let { tickersList } = useSelector(store => store)

    return (
        <div className="LikedTickers">
            <h4>Watch list</h4>
            <ul className="items">
                {
                    tickersList
                        .filter(item => {
                            return item.isLiked
                        })
                        .map(item => {
                            return (
                                <li key={item.id}>
                                    <div className='info' onClick={() => dispatch(changeTickers(item.ticker))}>
                                        <span>{item.ticker}</span>
                                    </div>
                                    <FontAwesomeIcon className='trash' icon={faTrash} onClick={() => dispatch(toggleLikeTicker(item))} />
                                </li>
                            )
                        })
                }
            </ul>
        </div>
    )
}

export default LikedTickers