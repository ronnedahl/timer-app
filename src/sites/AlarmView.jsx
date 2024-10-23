import React from 'react'
import('./alarmview.css')
import Ellipse from '../assets/Ellipse.svg'
import Ellipsetwo from '../assets/Ellipsetwo.svg'
import Ellipsethree from '../assets/Ellipsethree.svg'
import Ellipsefour from '../assets/Ellipsefour.svg'
import Alarmicon from '../assets/alarmicon.svg'
import NewTimerButton from '../components/NewTimerButton'
import { Link } from 'react-router-dom'

function AlarmView() {
  return (
    <>
    <section className='alarm-view-container'>
      <figure className='alarm-view-container__image'>
        <img className='ellipse-one' src={Ellipse} alt="elipse" />
        <img className='ellipse-two' src={Ellipsetwo} alt="elipse" />
        <img className='ellipse-three' src={Ellipsethree} alt="elipse" />
        <img className='ellipse-four' src={Ellipsefour} alt="elipse" />
        <img className='alarm-icon' src={Alarmicon} alt="alarm icon" />
      </figure>
      <article className='alarm-view-container__text'>
        <h1>Times Up!</h1>
      </article>
      <div className='alarm-view-container__wrapper-button'>
        <section className='alarm-view-container__button'>
          <Link to="/start">
            <NewTimerButton />
          </Link>
        </section>
      </div>

    </section>
    </>
  )
}

export default AlarmView
