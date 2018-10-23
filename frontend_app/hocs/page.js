import { compose } from 'redux'
import withApolloLayout from './withApolloLayout'
import withDefaultLayout from './withDefaultLayout'


export const pageWithStandardLayout = compose(
  withApolloLayout,
  withDefaultLayout
)
