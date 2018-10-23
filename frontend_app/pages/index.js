import Home from '../views/Home'
import React from 'react'
import { pageWithUserData } from '../hocs/page'

export default pageWithUserData(() => <Home />)
