import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>Sobre Nosotros</h6>
            <p className="text-justify">Nuestro compromiso con los clientes va más allá de ofrecer una amplia variedad de equipos de tenis, en Tennis House trabajamos continuamente para brindar la mejor experiencia de servicio al cliente posible.</p>
          </div>
          <div className="col-sm-12 col-md-6">
            <ul className="social-icons">
              <img className="imgFooter" src="/logo.png" alt=''></img>
              <li><a className="facebook" href="https://www.facebook.com/" ><FontAwesomeIcon icon={faFacebookF} /></a></li>
              <li><a className="twitter" href="https://www.twitter.com/" ><FontAwesomeIcon icon={faTwitter} /></a></li>
              <li><a className="instagram" href="https://www.instagram.com/" ><FontAwesomeIcon icon={faInstagram} /></a></li>
            </ul>
          </div>
        </div>
        <div className="copy">
          <p>Copyright &copy; Tennis House </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;