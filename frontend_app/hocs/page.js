import { compose } from 'redux'
import withApolloLayout from './withApolloLayout'
import withDefaultLayout from './withDefaultLayout'
import withData from './withData'
import withUser from './withUser'


export const pageWithStandardLayout = compose(
  withApolloLayout,
  withDefaultLayout
)

export const pageWithUserData = compose(
  withData,
  withUser,
  withDefaultLayout
)
