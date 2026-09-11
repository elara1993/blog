import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Post from './pages/Post'
import About from './pages/About'
import Category from './pages/Category'
import Search from './pages/Search'
import Write from './pages/Write'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<Post />} />
            <Route path="/about" element={<About />} />
            <Route path="/category/:name" element={<Category />} />
            <Route path="/search" element={<Search />} />
            <Route path="/write" element={<Write />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
