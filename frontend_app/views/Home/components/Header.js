import React from 'react'
import SlideOne from './SlideOne'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'

const styles = {
  slide: {
    margin: 0,
    padding: 0,
    color: 'white',
    height: 450,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  },
  slide1: {
    backgroundImage: "url('/static/img/cover_slide1.png')"
  },

}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

export default function Header() {
  return (
    <AutoPlaySwipeableViews enableMouseEvents resistance interval={4000}>
      <div style={Object.assign({}, styles.slide, styles.slide1)}>
        <SlideOne />
      </div>
    </AutoPlaySwipeableViews>
  )
}
