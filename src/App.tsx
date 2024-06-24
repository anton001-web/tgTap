import { useEffect, useState } from 'react'
// import viteLogo from '/vite.svg'
import './styles/App.scss'
import { ClaimBlock } from './components/claimBlock/ClaimBlock';
import { FooterMenu } from './components/footerMenu/FooterMenu';
import { Home } from './components/home/Home';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Frens } from './components/frens/Frens';
import FrensBgItem from './assets/images/frensBgItem.svg?react'
import { Referals } from './components/referals/Referals';
import { Daily } from './components/daily/Daily';
import { Tasks } from './components/tasks/Tasks';
import TasksBgItem from './assets/images/tasksBgItem.png'
import { SwiperPage } from './components/swiperPage/SwiperPage';

function App() {
  const loc = useLocation()
  const [info, setInfo] = useState<any>()

  useEffect(() => {

    if (window.Telegram?.WebApp) {
      const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
      const initData = window.Telegram.WebApp.initData;
      const initDataRaw = window.Telegram.WebApp.initDataRaw;
      const params = new URLSearchParams(initData);
      window.Telegram.WebApp.expand();

      // const user = params.get('user') ? JSON.parse(params.get('user')) : null;
      const queryId = params.get('query_id');

      setInfo(params)
    }

  }, []);

  useEffect(() => {
    console.log('INFO', window.Telegram.WebApp)
  }, [info])

  useEffect(() => {

    if(loc.pathname === '/') {
      document.body.classList.add('Main')
      document.body.classList.remove('Frens')
    } else if (loc.pathname === '/frens') {
      document.body.classList.add('Frens')
      document.body.classList.remove('Main')
    } else if (loc.pathname === '/tasks') {
      document.body.classList.add('Tasks')
      document.body.classList.remove('Main')
      document.body.classList.remove('Frens')
    } else if (loc.pathname === '/referals') {
      document.body.classList.add('Frens')
      document.body.classList.remove('Main')
      document.body.classList.remove('Tasks')
    } else if (loc.pathname === '/swiper') {
      document.body.classList.add('Frens')
      document.body.classList.remove('Main')
      document.body.classList.remove('Tasks')
    }
  }, [loc])

  useEffect(() => {
    if(loc.pathname === '/swiper') {
      document.body.style.overflowY = 'hidden'
      document.documentElement.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'scroll'
      document.documentElement.style.overflowY = 'scroll'
    }
  }, [loc])

  return (
    <div className='mainWrap' style={{padding: '7px'}} >
      {/* <Daily /> */}
      {loc.pathname === '/frens' && <FrensBgItem className='frensBgItem' />}
      {loc.pathname === '/tasks' && <img src={TasksBgItem} className='tasksBgItem' />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/frens' element={<Frens />} />
        <Route path='/referals' element={<Referals />} />
        <Route path='/tasks' element={<Tasks />} />
        <Route path='/swiper' element={<SwiperPage />} />
      </Routes>
      {
        loc.pathname !== '/swiper' && (
          <div
            className='footer'
          >
            {
              loc.pathname !== '/referals' && loc.pathname !== '/tasks' && <ClaimBlock />
            }
            <FooterMenu />
          </div>
        )
      }
    </div>
  )
}

export default App
