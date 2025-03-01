import "./Homepage.css"

import Navbar from "../Navbar"
import { Link } from "react-router-dom"

const Homepage = () => {
  return (
    <div className="container">
      <Navbar/>

      <main className="main">
        <div className="hero-card">
          <div className="hero-content">
            <div className="mascot-container">
              <img src={"./assets/placeholder.png"} alt="DentAI Mascot" className="mascot" />
            </div>
            <h1 className="hero-title">DentAI Vision</h1>
          </div>
        </div>

        <h2 className="tagline">Improving patient trust, one smile at a time.</h2>

        <button className="chat-button">
          <Link to="/new-chat">New Chat</Link>
        </button>
      </main>
    </div>
  )
}

export default Homepage

