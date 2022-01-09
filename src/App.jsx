import { Header } from "./components/Header"
import { GlobalStyle } from "./styles/global"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Main } from "./components/Main"
import { Footer } from "./components/Footer"
import { Goals } from "./components/Goals"
import { Users } from "./components/Users"

export function App() {
  return (
    <Router>
      <Header />
      <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/users" element={<Users />}/>
          <Route path="/goals" element={<Goals />}/>
      </Routes>
      <Footer />
      <GlobalStyle />
    </Router>
  )
}