import About from './components/About'
import BookingForm from './components/BookingForm'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Navbar from './components/Navbar'
import Services from './components/Services'
import Showreel from './components/Showreel'
import Skills from './components/Skills'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Gallery />
      <Showreel />
      <Services />
      <BookingForm />
      <Contact />
      <Footer />
    </>
  )
}

export default App
