import React from 'react'
import ('./abortbutton.css')
import { motion} from 'framer-motion'

function AbortButton() {
  return (
    <>
    
      <motion.section className='abort-button-container__button'
      whileHover={{
      scale:0.9,
      transition: {duration:0.2}
     }}
      
      >
      
      <button>ABORT TIMER</button>
     
    </motion.section>
  
    </>
  )
}

export default AbortButton
