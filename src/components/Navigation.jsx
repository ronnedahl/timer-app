import React, { useState } from 'react'
import('./navigation.css')
import navicon_white from '../assets/navicon_white.svg'
import navicon from '../assets/navicon.svg'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
function Navigation() {
  const [openNav, setOpenNav] = useState(false)

  function handleNav(e) {
    setOpenNav(!openNav)
  }
  
  return (
    <section className={`navigation-container ${openNav ? 'add-background' : ''}`}>
      <motion.img onClick={handleNav} src={openNav ? navicon_white : navicon} alt="nav-icon"
        whileHover={{
          scale: 0.9,
          transition: { duration: 0.5 }
        }}

      />
      {openNav ? (
        <nav
          className='navigation-container__nav-menu'>
          <ul>
            <Link to="/analog">
              <motion.li
                whileHover={{
                  scale: 0.9,
                }}

                transition={{
                  duration: 0.2,
                  ease: 'easeInOut'
                }}
              >
                ANALOG TIMER</motion.li>
            </Link>
            <Link to="/digital" style={{ textDecoration: 'none' }}>
              <motion.li
                whileHover={{
                  scale: 0.9,
                }}

                transition={{
                  duration: 0.2,
                  ease: 'easeInOut'
                }}

              >DIGITAL TIMER</motion.li>
            </Link>
            <Link to="/analog">
              <li>VISUAL TIMER</li>
            </Link>
            <li>TEXT TIMER</li>
            <li>CIRCLES TIMER</li>
          </ul>

        </nav>
      ) : null}

    </section>

  )
}

export default Navigation
