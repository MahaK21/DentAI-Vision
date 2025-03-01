import { Link } from "react-router-dom"

/*
A simple element for the NavBar. When you click the text,
it redirects you to {link}.
 */

const NavItem = ({ href, link, children}) => (
  <a href={href}className="nav-item">
    <Link className="nav-item" to={link}>{children}</Link>
  </a>
)

/*
Navbar with the key pages for DentAI. We'll show this at the top
of each page.
*/

const Navbar = () => {
  return (
	<nav className="nav">
        <div className="nav-content">
			{/* TODO: Use react-router for routing. */}
          <NavItem link="/">Home</NavItem>
          <NavItem link="/about" >About DentAI</NavItem>
          <NavItem link="/chat">Chat</NavItem>
          <NavItem link="/contact">Contact</NavItem>
        </div>
  </nav>
  )
}

export default Navbar