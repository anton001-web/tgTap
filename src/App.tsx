import { useEffect, useState } from 'react'
// import viteLogo from '/vite.svg'
import './styles/App.scss'
import { ClaimBlock } from './components/claimBlock/ClaimBlock';
import { FooterMenu } from './components/footerMenu/FooterMenu';
import { Home } from './components/home/Home';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Frens } from './components/frens/Frens';
import FrensBgItem from './assets/images/frensBgItem.svg?react'
import { Referals } from './components/referals/Referals';
import { Daily } from './components/daily/Daily';
import { Tasks } from './components/tasks/Tasks';
import TasksBgItem from './assets/images/tasksBgItem.png'
import { SwiperPage } from './components/swiperPage/SwiperPage';
import { Mines } from './components/mines/Mines';
import { TokenContext } from './providers/Auth';
import { userAuth } from './components/api/api';

function App() {
  const [modalVisibility, setModalVisibility] = useState(false)
  const loc = useLocation()
  const [info, setInfo] = useState<any>()
  const navigate = useNavigate()
  const [authData, setAuthData] = useState<any>();
  const [kentId, setKentId] = useState<string>('')

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
      const data = window.Telegram.WebApp.initData;
      window.Telegram.WebApp.expand();
      
      const params = new URLSearchParams(data);
      const startParam = params.get('start_param');

      let parts = startParam?.split("=");
      parts && setKentId(parts[1].trim())

      setInfo(initDataUnsafe.user)
    } 

  }, []);

  useEffect(() => {
    console.log('KENT', kentId)
  }, [kentId])

  const authUserF = async () => {
    const res = await userAuth({
      tgId: info?.id,
      tgName: info?.first_name,
      languageCode: info?.language_code,
      username: info?.username,
      isPremium: info?.is_premium,
      kentId: kentId?.toString(),
    })
    setAuthData(res)
}

  useEffect(() => {
    const visitedSwiperPage = localStorage.getItem('visitedSwiperPage');

    if(visitedSwiperPage) {
      if(info?.id) {
        authUserF()
      }
    }

  }, [info, loc])

  useEffect(() => {

    if(loc.pathname === '/home') {
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
    } else if (loc.pathname === '/') {
      document.body.classList.add('Frens')
      document.body.classList.remove('Main')
      document.body.classList.remove('Tasks')
    }
  }, [loc])

  useEffect(() => {
    if(loc.pathname === '/' || loc.pathname === '/mines') {
      document.body.style.overflowY = 'hidden'
      document.documentElement.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'scroll'
      document.documentElement.style.overflowY = 'scroll'
    }
  }, [loc])

  useEffect(() => {
    const visitedSwiperPage = localStorage.getItem('visitedSwiperPage');
    if (visitedSwiperPage && location.pathname === '/') {
      navigate('/home');
    }
  }, [location, navigate]);

  // useEffect(() => {
  //   console.log('INFO', authData)
  //   if(authData.points_to_claim) {
      
  //   }
  // }, [authData])

  const setToken = () => {
    
  }

  return (

    <TokenContext.Provider
      value={{ token: authData?.token, setToken }}
    >
      <div className='mainWrap' style={{padding: '7px'}} >
        <Daily visibility={modalVisibility} setVisibility={setModalVisibility} />
        {loc.pathname === '/frens' && <FrensBgItem className='frensBgItem' />}
        {loc.pathname === '/tasks' && <img src={TasksBgItem} className='tasksBgItem' />}

        <Routes>
          <Route path='/' element={<SwiperPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/frens' element={<Frens />} />
          <Route path='/referals' element={<Referals />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/mines' element={<Mines />} />
        </Routes>
        {
          loc.pathname !== '/' && loc.pathname !== '/mines' &&  (
            <div
              className='footer'
            >
              {
                loc.pathname !== '/referals' && loc.pathname !== '/tasks' && loc.pathname !== '/home' && <ClaimBlock />
              }
              <FooterMenu />
            </div>
          )
        }
      </div>
    </TokenContext.Provider>
  )
}

export default App
