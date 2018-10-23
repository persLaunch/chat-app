import { compose } from 'redux'
import withApolloLayout from './withApolloLayout'


export const pageWithStandardLayout = compose(
  withApolloLayout,
)
