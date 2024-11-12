import './index.css'
import { Provider } from 'react-redux'
import store from './store'
import AppRouter from './routes'

const App = () => (
  <Provider store={store}>
    {/* Wrap AppRouter here to use the routing structure */}
    <AppRouter />
  </Provider>
)

export default App
