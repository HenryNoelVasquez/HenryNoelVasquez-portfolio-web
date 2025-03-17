import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Works from './components/Works'
import ProjectDetail from './components/ProjectDetail'
import Contact from './components/Contact'
import './App.css'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <Works />
          </>
        } />
        <Route path="/works" element={<Works />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </Router>
  )
}

export default App
