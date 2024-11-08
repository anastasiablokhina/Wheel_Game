import React from 'react'
import playIcon from '../assets/icons/play.svg';
import pauseIcon from '../assets/icons/pause.svg';

const PauseTimer = ({ isPaused, onClick }) => {
  return (
    <img
      className="timer__toggle"
      src={isPaused ? playIcon : pauseIcon}
      alt={isPaused ? 'play' : 'pause'}
      onClick={onClick}
    />
  )
}

export default PauseTimer