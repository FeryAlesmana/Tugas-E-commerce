
import './NavAdmin.css'
import navlogo from '../Assets/logo-admin-mebelify.png'
import navProfile from '../Assets/navbar-profile.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userImage = localStorage.getItem('profile-image');
  const handleLogoClick = () => {
    navigate("/");
    
  };
  if(location.pathname !== '/admin'){
    return null;
  }
  return (
    <div className='navAdmin'>
        <img src={navlogo} onClick={handleLogoClick} alt="" className="navAdmin-logo" />
        <Link to='/dashboard' className='admin-profile'>
          <img src={userImage? userImage : navProfile} className='navAdmin-profile' alt="" />
        </Link>
        
    </div>
  )
}

export default NavAdmin