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
import { claimPoints, getPointsPerSec, getReferral, getTable, getTasks, getUser, userAuth} from './components/api/api';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { MinesInfoModal } from './components/home/components/minesPlayBlock/MinesInfoModal';
import { DesktopMobile } from './components/DesktopMobile/DesktopMobile';

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
  const [tokensBalance, setTokensBalance] = useState<any>()
  const [tickets, setTickets] = useState<number>()
  const [minesModal, setMinesModal] = useState(false)
  const [mobile, setMobile] = useState('')
  // const [mainedValue, setMainedValue] = useState<number>()

  ///
  const [secValue, setSecValue] = useState<any>()
  const [count, setCount] = useState(0);
  const [zero, setZero] = useState<boolean>(false)
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

  const toastFn = (title:string) => {
    toast(title)
  }

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
    const userAgent = navigator.userAgent

    const containsMobile = /Mobile\//i.test(userAgent)
    const containsMobileTwo = /Mobile/i.test(userAgent)

    if(containsMobile || containsMobileTwo) {
      setMobile('mobile')
      // alert('IS MOBILE')
    } else {
      setMobile('desktop')
      // alert('IS DESKTOP')
    }
  }, [])

  useEffect(() => {
    

    if (window.Telegram?.WebApp) {
      const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
      // const data = window.Telegram.WebApp.initData;
      window.Telegram.WebApp.expand();
      
      // const params = new URLSearchParams(data);
      // const startParam = params.get('start_param');

      // let parts = startParam?.split("=");

      const code = loc.search.slice(-6)

      setKentId(code)


      setInfo(initDataUnsafe.user)

  
    } 

  }, []);


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

  const setBalance = (addPoints:number, isIncrement:boolean) => {
    if(isIncrement) {
      setTokensBalance(tokensBalance + addPoints)
      console.log(profile.total_points + addPoints)
      console.log(profile.total_points, addPoints)
    } else {
      setTokensBalance(addPoints)
    }
  }

  const setTicketsFn = (ticket:number) => {
    if(tickets) {
      setTickets(tickets - ticket)
    }
  }

  useEffect(() => {
    if(profile) {
      setTokensBalance(profile.total_points)
      setTickets(profile.playing_tickets_amount)
    }
  }, [profile])

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
      document.body.classList.remove('Tasks')
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
    console.log('POINTS', authData?.points_to_claim, authData)
    if(authData?.points_to_claim) {
      setModalVisibility(true)
    } else {
      setModalVisibility(false)
    }
  }, [authData])

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const claimFn = async () => {
    const res = await claimPoints(authData?.token)
    const pos = await getUser(authData?.token)
    console.log(res)
    setBalance(pos.total_points, false)
    localStorage.setItem('count', JSON.stringify(0));
    setIsActive(false)
    setCount(0)
    if(!tokensBalance) {
      toastFn('Oops, something went wrong, please, reload the page')
    }
  }

  useEffect(() => {
    window.scrollTo(0, 10)
  }, [])

  const getPointsSecFn = async () => {
    const res = await getPointsPerSec(authData?.token)
    setSecValue(res)
    setIsActive(true)
  }

  useEffect(() => {
    const el = document.querySelector('.odometer-formatting-mark')
    if(count <= 0.9 && count >= 0.001) {
      setZero(true)

    } else {
      setZero(false)

    }

    if(count <= 0.09 && count >= 0.001) {
      el?.classList.add('hidden')
    } else {
      const zeroComa = document.querySelector('.zeroComa')
      zeroComa?.classList.add('hidden')
    }

  }, [count])

  useEffect(() => {
    const el = document.querySelector('.odometer-formatting-mark')

    if(el) {
      el.textContent = '.'
    }
  }, [])

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

  useEffect(() => {
    if(typeof count !== 'number') {
      toast('Something went wrong, try a lil bit later')
      setIsActive(false)
      setZero(false)
      setCount(0)
      localStorage.setItem('count', JSON.stringify(0));
    }
  }, [count])

  /////

  const setTasks = (id:number, taskResponse: any) => {

    let ans

    if(taskResponse?.non_field_errors) {
      ans = taskResponse?.non_field_errors[0]
    }

    if(ans === 'Task was completed before') {
      return null
    }

    const newTasksList = tasksList.map((element:any) => {
      element.total_completed_tasks = element.total_completed_tasks + 1
      if (element.id === id) {
        return { ...element, is_completed_task: true };
      }
      return element;
    });

    setTimeout(() => {
      setTasksList(newTasksList)
    }, 3000)
  };


  const getTableF = async () => {
    const res = await getTable(authData?.token)
    setTable(res.playing_board)
  }

  const setToken = () => {
    
  }

  return (

    <TokenContext.Provider
      value={{ token: authData?.token, refCode: authData?.refferal_code, setToken, tasks: tasksList, toaster: toastFn, setTasks: setTasks, minesTable: table, setMinesTable: getTableF, profile: profile, referals: refsInfo, tokensBalance: tokensBalance, setBalance: setBalance, tickets: tickets, setTickets: setTicketsFn }}
    >
      {
        mobile === 'desktop' ? (
          <DesktopMobile />
        ) : (
          <div style={{paddingBottom: loc.pathname === '/mines' ? '7px' : '80px'}} className={`mainWrap ${loc.pathname === '/home' && 'mainWrapClaim'} ${loc.pathname === '/frens' && 'mainWrapBottom'}`} >
        {
          loc.pathname !== '/' && loc.pathname !== '/mines' && (
            <FooterMenu />
          )
        }

        <ToastContainer
          className={'toast'}
          position="top-right"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Daily visibility={modalVisibility} setVisibility={setModalVisibility} />
        <MinesInfoModal visibility={minesModal} setVisibility={setMinesModal} />
        {loc.pathname === '/frens' && <FrensBgItem className='frensBgItem' />}
        {loc.pathname === '/tasks' && <img src={TasksBgItem} className='tasksBgItem' />}

        <Routes>
          <Route path='/' element={<SwiperPage />} />
          <Route path='/home' element={<Home setVisibility={setMinesModal} />} />
          <Route path='/frens' element={<Frens />} />
          <Route path='/referals' element={<Referals />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/mines' element={<Mines />} />
        </Routes>
        
        <div
              className={`footer ${loc.pathname === '/home' && 'footerVisible'}`}
            >
              <ClaimBlock 
                  setZero={setZero}
                  zero={zero}
                  claimValue={count} 
                  setIsActive={setIsActive} 
                  isActive={isActive}
                  onClick={getPointsSecFn}
                  claimFn={claimFn}
                />
        </div>                  
      </div>
        )
      }
    </TokenContext.Provider>
  )
}

export default App
