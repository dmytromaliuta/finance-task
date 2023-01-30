import './index.css';
import BaseLayout from './components/BaseLayout'
import Chart from './components/Chart'
import TickerData from './components/TickerData'
import TickersList from './components/TickersList'
import LikedTickers from './components/LikedTickers'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import io from 'socket.io-client'
import { getTickers } from './store/actions/index'

const socket = io.connect('http://localhost:4000');

function App() {

  let dispatch = useDispatch()

  useEffect(() => {
    socket.emit('start');
    socket.on('ticker', response => {
      dispatch(getTickers(response))
    });
  }, [])

  return (
    <>
      <BaseLayout>
        <Chart />
        <TickerData />
        <TickersList />
        <LikedTickers />
      </BaseLayout>
    </>
  );
}

export default App;
