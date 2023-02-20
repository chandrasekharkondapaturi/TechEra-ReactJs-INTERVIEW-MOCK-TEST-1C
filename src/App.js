import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import CourseItemDetails from './components/CourseItemDetails'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={CourseItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
