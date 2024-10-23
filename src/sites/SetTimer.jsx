
import('./settimer.css')
import Navigation from '../components/Navigation'
import TimerButton from '../components/TimerButton'
import increment from '../assets/increment.svg'
import decrement from '../assets/decrement.svg'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageVariants, pageTransition } from '../assets/animations/variants'

function SetTimer() {
  const [time, setTime] = useState(10)
  const [timerStarted, setTimerStarted] = useState(false)

  const handleDecrease = () => {
    if (time > 1) {
      setTime(time - 1)
    }
  }

  const handleIncrease = () => {
    setTime(time + 1)
  }

  useEffect(() => {
    window.localStorage.setItem('counter_value', time.toString())
    const timeInSeconds = time * 60
    window.localStorage.setItem('time_seconds', timeInSeconds.toString())
  }, [time,])

  const handleStartTimer = () => {
    setTimerStarted(true)
  }

  return (
     <>
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <section className='settimer-container'>
        <Navigation />
        <section className='settimer-container__inner'>
          <section className='settimer-container__change-minutes-container'>
            <motion.figure onClick={handleDecrease}
              className='settimer-container__decrease-img'
              whileTap={{
                x: [-10, 0, 10, -10],
              }}
              transition={{
                duration: 0.2,
                ease: 'easeInOut'
              }}
            >
              <img src={decrement} alt="increment icon" />
            </motion.figure>
            <article className='settimer-container__big-number'>
              <h5>{time}</h5>
              <p>Minutes</p>
            </article>
            <motion.figure onClick={handleIncrease}
              className='settimer-container__right-increase-img'
              whileTap={{
                x: [0, 10, -10, 0],
              }}
              transition={{
                duration: 0.2,
                ease: 'easeInOut'
              }}
            >
              <img src={increment} alt="decrement icon" />
            </motion.figure>

          </section>
          <section onClick={handleStartTimer} className='settimer-container__button'>
            <Link to="/digital">
              <TimerButton />
            </Link>
          </section>
          {timerStarted ? <h1>Timern har startats!</h1> : null}
        </section>

      </section>
    </motion.div>
    </>   
  )
}

export default SetTimer
