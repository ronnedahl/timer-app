import React from 'react'
import('./timerbutton.css')
import { motion } from 'framer-motion'

function TimerButton() {
  return (
    <>
      <motion.section 
      className='timerbutton-container__button'
      whileHover={{
        scale: 0.95,
      }}
     
      transition={{
        duration: 0.2,
        ease: 'easeInOut'
      }}
      >
      <button>START TIMER</button>
      </motion.section>
   
  
    </>
  )
}

export default TimerButton
