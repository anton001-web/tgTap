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
import TasksBgItem from './assets/images/tasksBgItem.webp'
import { SwiperPage } from './components/swiperPage/SwiperPage';
import { Mines } from './components/mines/Mines';
import { TokenContext } from './providers/Auth';
import { claimPoints, getPointsPerSec, getReferral, getTable, getTasks, getUser, userAuth } from './components/api/api';

function App() {
  const [modalVisibility, setModalVisibility] = useState(false)
  const loc = useLocation()
  const [profile, setProfile] = useState<any>()
  const [info, setInfo] = useState<any>()
  const navigate = useNavigate()
  const [authData, setAuthData] = useState<any>();
  const [tasksList, setTasksList] = useState<any>()
  const [kentId, setKentId] = useState<string>('')
  const [table, setTable] = useState<any>(null)
  const [refsInfo, setRefsInfo] = useState<any>()

  ///
  const [secValue, setSecValue] = useState<any>()
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  ///

  const getRefsF = async () => {
    const res = await getReferral(authData?.token)
    setRefsInfo(res)
  }

  useEffect(() => {
    if(authData?.token && !refsInfo) {
      getRefsF()
    }     
  }, [authData?.token])

  const getUserF = async () => {
    const res = await getUser(authData?.token)
    setProfile(res)
  }

  useEffect(() => {
      if(authData?.token && !profile) {
          getUserF()
      }       
  }, [authData?.token])

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
      console.log('initData:', data);
  
    } 

  }, []);

  useEffect(() => {
    console.log('second', count)
  }, [count])

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
      if(info?.id && !authData) {
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

  const getTasksF = async () => {
    const res = await getTasks(authData?.token)
    setTasksList(res)
  }

  useEffect(() => {
    authData?.token && !tasksList && getTasksF()
  }, [authData?.token])

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

  useEffect(() => {
    if(authData?.points_to_claim) {
      setModalVisibility(true)
    } else {
      setModalVisibility(false)
    }
  }, [authData])

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const claimFn = async () => {
    const res = await claimPoints(authData?.token)
    localStorage.setItem('count', JSON.stringify(0));
    setIsActive(false)
    setCount(0)
  }

  const getPointsSecFn = async () => {
    const res = await getPointsPerSec(authData?.token)
    setSecValue(res)
    setIsActive(true)
  }

  useEffect(() => {
    const savedCount = localStorage.getItem('count');
    const savedTime = localStorage.getItem('time');

    if (savedCount && savedTime) {

      setCount(parseInt(savedCount));
    }
  }, []);

  useEffect(() => {
    let timer:any;
    if (isActive) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount + secValue?.points_per_second);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive]);


  useEffect(() => {
    localStorage.setItem('count', JSON.stringify(count));
  }, [count]);

  /////

  const getTableF = async () => {
    const res = await getTable(authData?.token)
    setTable(res.playing_board)
  }

  const setToken = () => {
    
  }

  return (

    <TokenContext.Provider
      value={{ token: authData?.token, setToken, tasks: tasksList, minesTable: table, setMinesTable: getTableF, profile: profile, referals: refsInfo }}
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
                loc.pathname !== '/referals' && loc.pathname !== '/tasks' && 
                <ClaimBlock 
                  claimValue={count} 
                  setIsActive={setIsActive} 
                  isActive={isActive}
                  onClick={getPointsSecFn}
                  claimFn={claimFn}
                />
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
