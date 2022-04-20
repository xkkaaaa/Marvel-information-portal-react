import { Link } from 'react-router-dom'
import thor from './image/thor.jpg'
import './style.scss'

const Error404 = () => {
  return (
    <div className="error-404">
      <h2>Error 404</h2>
      <div>
        <img src={thor} alt="error 404" />
      </div>
      <Link className="back" to="/">
        Bact to main page
      </Link>
    </div>
  )
}

export default Error404
