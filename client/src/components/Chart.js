import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeInterval } from '../store/actions/'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: true
        }
    },
    scales: {
        x: {
            display: true,
            border: {
                color: '#1f202f'
            },
            grid: {
                color: false,
                tickColor: false
            }
        },
        y: {
            min: 50,
            max: 400,
            grid: {
                tickColor: false
            }
        }
    }
}

const formatDate = (date) => {
    const leadingZero = (num) => `0${num}`.slice(-2);

    let hours = leadingZero(new Date(date).getHours())
    let minutes = leadingZero(new Date(date).getMinutes())
    let seconds = leadingZero(new Date(date).getSeconds())
    return `${hours}:${minutes}:${seconds}`
}

const getLabels = (lastTime, currentInterval, length) => {
    let arr = []
    for (let i = 1; i <= length; i++) {
        let date = new Date(lastTime).getTime() + currentInterval * i
        arr.push(new Date(date).toISOString())
    }
    return arr
}

function Chart() {

    let dispatch = useDispatch()
    let { tickers, currentTicker, currentInterval, tickersList } = useSelector(store => {
        return {
            ...store.chart,
            tickersList: store.tickersList
        }
    })

    useEffect(() => {
        setData({
            ...data,
            labels: generateLabels().map(item => {
                return formatDate(item)
            }),
            datasets: [
                {
                    label: currentTicker,
                    data: tickers[currentTicker][currentInterval].map((obj) => obj.price),
                    borderColor: '#79787e',
                    backgroundColor: '#1d202f'
                }
            ]
        })
    }, [tickers, currentTicker, currentInterval, tickersList])

    const [data, setData] = useState({
        datasets: [
            {
                data: tickers[currentTicker][currentInterval].map((item) => { return item.price }),
                borderColor: '#79787e',
                backgroundColor: '#1f202f',
                tension: 0.1
            }
        ]
    })

    let [btns, setBtns] = useState([
        { id: 1, value: '5s', active: true },
        { id: 2, value: '30s', active: false },
        { id: 3, value: '1m', active: false },
        { id: 4, value: '5m', active: false }
    ])

    const handleIntervalChange = (e) => {
        setBtns(btns.map(item => {
            item.value === e.target.value ? item.active = true : item.active = false
            return item
        }))
        switch (e.target.value) {
            case '5s':
                dispatch(changeInterval(5000))
                break;
            case '30s':
                dispatch(changeInterval(30000))
                break;
            case '1m':
                dispatch(changeInterval(60000))
                break;
            case '5m':
                dispatch(changeInterval(300000))
                break;
            default:
                return
        }
    }

    const generateLabels = () => {
        let arr = tickers[currentTicker][currentInterval].map((item) => {
            return item.last_trade_time
        })
        if (arr.length < 20 && arr.length !== 0) return [...arr, ...getLabels(arr[arr.length - 1], currentInterval, 20 - arr.length)]
        return arr
    }

    return (
        <div className='Chart'>
            <div className='btns'>
                {
                    btns.map(item => {
                        return <input className={item.active ? 'active' : ''} type="submit" key={item.id} value={item.value} onClick={handleIntervalChange} />
                    })
                }
            </div>
            <Line options={options} data={data} />
        </div>
    )
}

export default Chart