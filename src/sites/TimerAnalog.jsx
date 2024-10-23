import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './timeranalog.css'
import Navigation from '../components/Navigation'
import AbortButton from '../components/AbortButton'
import useTimer from 'easytimer-react-hook'
import { motion } from 'framer-motion'

function TimerAnalog() {
  const [data, setData] = useState(null)
  const [currentTime, setCurrentTime] = useState(null)
  const [timeSec, setTimeSec] = useState(1)
  const navigate = useNavigate()

  const [timer, isTargetAchieved] = useTimer({
    countdown: true,
  });


  useEffect(() => {
    const testStored = window.localStorage.getItem('counter_value')

    setData(testStored)
  }, [])

  useEffect(() => {
    const timeInSec = window.localStorage.getItem('time_seconds')
    const parsedTime = parseInt(timeInSec, 10)

    if (!isNaN(parsedTime)) {
      console.log('Parsed time_seconds', parsedTime)
      setTimeSec(parsedTime)
    } else {
      setTimeSec(60)
    }
    //klockan skapas här av javascript

  }, [])

  useEffect(() => {
    createClockMarks()

  }, [])

  const createClockMarks = () => {
    const clock = document.querySelector('.timer-analog-container__clock')
    if (clock) {
      for (let i = 0; i < 60; i++) {
        const mark = document.createElement('div')
        mark.className = 'mark'

        mark.style.transform = `rotate(${i * 6}deg) translateY(-120px)`
        clock.appendChild(mark)
      }
    }
  }

  useEffect(() => {
    const clockRunningValue = window.localStorage.getItem('counter_running');
    console.log('Det här är clockRunningValue:', clockRunningValue);

    if (clockRunningValue && clockRunningValue !== '0') {
      const totalSeconds = parseInt(clockRunningValue, 10);
      if (!isNaN(totalSeconds) && totalSeconds > 0) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        console.log('Startar timer med:', minutes, 'minuter och', seconds, 'sekunder');
        timer.start({ startValues: { minutes, seconds } });
      } else {
        console.warn('Ogiltigt format för clockRunningValue:', clockRunningValue);
      }
    }
  }, [timer]);

  useEffect(() => {
    if (data !== null && !timer.isRunning()) {
      const minutes = Math.floor(data / 60)
      const seconds = data % 60
      console.log('startar timern med ', minutes, 'och', seconds)
      timer.start({ startValues: { minutes: data, seconds: 0 } });
    }
  }, [data, timer]);

  useEffect(() => {
    const interval = setInterval(() => {
      const timeValues = timer.getTimeValues()
      const totalSeconds = timeValues.minutes * 60 + timeValues.seconds
      setCurrentTime(totalSeconds)
      window.localStorage.setItem('counter_running', totalSeconds.toString())

      if (totalSeconds === 0) {
        navigate('/alarm')
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [timer, navigate])

  useEffect(() => {
    if (isTargetAchieved) {
    }
  }, [isTargetAchieved]);

  const handleAbort = () => {
    let currentTime = 0
    window.localStorage.setItem('counter_running', currentTime)
    navigate('/start')
  }

  return (
      <>
    <section className='timer-analog-container'>
      <Navigation />
      <section className='timer-analog-container__inner'>
        <figure className='timer-analog-container__clock'>
          <motion.figure className='timer-analog-container__minute hand'
            animate={{
              transformOrigin: 'top center',
              rotate: 360
            }}

            transition={{
              duration: 60,
              ease: 'linear',
            }}

          ></motion.figure>
          <motion.figure className='timer-analog-container__second hand'
            animate={{
              transformOrigin: 'top center',
              rotate: 360 * timeSec,
            }}
            transition={{
              duration: timeSec,
              ease: 'linear',
            }}
          >
          </motion.figure>
        </figure>

        <section onClick={handleAbort} className='timer-analog-container__button'>
          <AbortButton />
        </section>
      </section>
   </section>
   </>
  )
  }

export default TimerAnalog
