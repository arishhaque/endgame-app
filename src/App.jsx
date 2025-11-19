import Header from './components/Header'
import Main from './components/Main'
import './App.css'


function App() {

  const totalAttempts = 10;

  return (
    <>
      <Header totalAttempts={totalAttempts}/>
      <Main totalAttempts={totalAttempts}/>
    </>
  )
}

export default App
