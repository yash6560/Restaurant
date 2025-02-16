import {Link} from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa6'
const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content rounded p-10">
  <nav className="grid grid-flow-col gap-4">
    <Link className="link link-hover">About us</Link>
    <Link className="link link-hover">Contact</Link>
    <Link className="link link-hover">Privacy</Link>
    <Link className="link link-hover">Legal</Link>
  </nav>
  <nav>
    <div className="grid grid-flow-col gap-4">
      <Link><FaFacebook size={25}/></Link>
      <Link><FaTwitter size={25}/></Link>
      <Link><FaInstagram size={25}/></Link>
      <Link><FaYoutube size={25}/></Link>
    </div>
  </nav>
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by Patel Foods</p>
  </aside>
</footer>
  )
}

export default Footer