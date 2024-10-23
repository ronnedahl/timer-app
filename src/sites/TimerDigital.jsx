import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './timerdigital.css'
import Navigation from '../components/Navigation'
import AbortButton from '../components/AbortButton'
import useTimer from 'easytimer-react-hook'
import { motion } from 'framer-motion'
import { pageVariants, pageTransition } from '../assets/animations/variants'

function TimerDigital() {
  const [data, setData] = useState(null)
  const [currentTime, setCurrentTime] = useState(null)
  const navigate = useNavigate()
  const [timer, isTargetAchieved] = useTimer({
    countdown: true,
    });

  useEffect(() => {
    const counterValue = window.localStorage.getItem('counter_value')
    setData(counterValue)
  }, [])

  useEffect(() => {
    const runningValue = window.localStorage.getItem('counter_running'); console.log('Det här är runningValue:', runningValue);

    if (runningValue && runningValue !== '0') {
      const totalSeconds = parseInt(runningValue, 10);

      if (!isNaN(totalSeconds) && totalSeconds > 0) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        console.log('Startar timer med:', minutes, 'minuter och', seconds, 'sekunder');
        timer.start({ startValues: { minutes, seconds } });
      } else {
        console.warn('Ogiltigt format för runningValue:', runningValue);
      }
    } else {
      const storedData = window.localStorage.getItem('counter_value');
      if (storedData) {
        const parsedValue = parseInt(storedData, 10);

        if (!isNaN(parsedValue) && parsedValue > 0) {
          console.log('Hämtat counter_value:', parsedValue);
          setData(parsedValue); // Totalt antal sekunder
        } else {
          console.warn('Ogiltigt counter_value:', storedData);
        }
      }
    }
  }, [timer]);

  useEffect(() => {
    if (data !== null && !timer.isRunning()) {
      const minutes = Math.floor(data / 60)
      const seconds = data % 60
      timer.start({ startValues: { minutes: data, } });
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
      
      alert('Tiden är ute!');
    }
  }, [isTargetAchieved]);

  const handleAbort = () => {
    timer.stop()
    window.localStorage.setItem('counter_running', '0')
    navigate('/start')
}

  return (
    <>
    <motion.div
      nitial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
    <section className='timer-digital-container'>
      <Navigation />
      <section className='timer-digital-container__inner'>
        <article className='timer-digital-container__counter'>
          <h1>{timer.getTimeValues().toString(['minutes', 'seconds'])}</h1>;
        </article>
        <section onClick={handleAbort} className='timer-digital-container__button'>
          <AbortButton />
        </section>
      </section>
   </section>
   </motion.div>
   </>
 )
}

export default TimerDigital
