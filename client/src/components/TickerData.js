import { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"

function TickerData() {

    let { currentTicker, target } = useSelector(store => {
        let targetArray = store.chart.tickers[store.chart.currentTicker]['5000']
        return {
            currentTicker: store.chart.currentTicker,
            target: targetArray[targetArray.length - 1] || {}
        }
    })

    const price = useRef(0);
    const changePercent = useRef(0);

    useEffect(() => {
        
        price.current < target.price ? setPriceStyle('high') : setPriceStyle('low')
        changePercent.current < target.change_percent ? setChangePercentStyle('high') : setChangePercentStyle('low')


        price.current = target.price
        changePercent.current = target.change_percent

    }, [target])


    let [priceStype, setPriceStyle] = useState('low')
    let [changeStypePercent, setChangePercentStyle] = useState('low')

    return (
        <div className="TickerData">
            <ul>
                <li>
                    <p className="ticker">{currentTicker}</p>
                </li>
                <li>
                    <p className="exchange">{target.exchange}</p>
                </li>
                <li>
                    <p className={'price ' + priceStype}>{target.price}$</p>
                </li>
                <li>
                    <p className="details">Change: {target.change}$</p>
                </li>
                <li>
                    <p className={'details ' + changeStypePercent}>Change percent: {target.change_percent}%</p>
                </li>
                <li>
                    <p className="details">Dividend: {target.dividend}</p>
                </li>
                <li>
                    <p className="details">Yield: {target.yield}</p>
                </li>
            </ul>
        </div>
    )
}

export default TickerData