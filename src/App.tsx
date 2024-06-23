import { useEffect } from 'react'
// import viteLogo from '/vite.svg'
import './styles/App.scss'
import { ClaimBlock } from './components/claimBlock/ClaimBlock';
import { FooterMenu } from './components/footerMenu/FooterMenu';
import { Home } from './components/home/Home';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Frens } from './components/frens/Frens';
import FrensBgItem from './assets/images/frensBgItem.svg?react'

function App() {
  const loc = useLocation()

  useEffect(() => {

    if (window.Telegram?.WebApp) {
      console.log('++')
      window.Telegram.WebApp.expand();
    }

  }, []);

  useEffect(() => {

    if(loc.pathname === '/') {
      document.body.classList.add('Main')
      document.body.classList.remove('Frens')
    } else if (loc.pathname === '/frens') {
      document.body.classList.add('Frens')
      document.body.classList.remove('Main')
    }
  }, [loc])

  return (
    <div className='mainWrap' style={{padding: '7px'}} >

      {loc.pathname === '/frens' && <FrensBgItem className='frensBgItem' />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/frens' element={<Frens />} />
      </Routes>
      <div
        className='footer'
      >
        <ClaimBlock />
        <FooterMenu />
      </div>
    </div>
  )
}

export default App
