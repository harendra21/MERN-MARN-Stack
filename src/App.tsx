import './App.css'
import Header from './components/header'
import Home from './components/home';
import Quiz from './components/quiz'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Results from './components/result';
import Interview from './components/interview';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:quizType" element={<Quiz />} />
          <Route path="/interview/:interviewType" element={<Interview />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
