import React, { Suspense } from 'react'
import './App.css'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Loading from './cubes/loading'
import ErrorBoundary from './ErrorBoundary'
const Todolist = React.lazy(() => import('./features/todos/todolist'))

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className='App'>
          <header className='App-header'></header>
          <Switch>
            <Suspense fallback={<Loading />}>
              <Route path='/:page?/:limit?' component={Todolist} />
            </Suspense>
          </Switch>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
