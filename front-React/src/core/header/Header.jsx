import logo from '../../assets/logo-autohaus.svg';
import { Link } from 'react-router-dom';


export const Header = () => {
  
    return (
      <header>
        <img src={logo} alt="Logo" />
        <Link to="/auth/login/">
            <button>Iniciar Sesión</button>
        </Link>
      </header>
    );
};