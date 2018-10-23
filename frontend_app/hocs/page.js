import { compose } from 'redux'
import withApolloLayout from './withApolloLayout'
import withNavlessLayout from './withNavlessLayout'


export const pageWithStandardLayout = compose(
  withApolloLayout,
  withNavlessLayout
)
