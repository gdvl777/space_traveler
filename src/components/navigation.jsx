import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/navigation.css';

function NavBar() {
  return (
    <nav>
      <div className="parentcontainer300">
        <div className="container300">
          <img className="logo300" src={logo} alt="Space Traveler" />
          <h1>Space Traveler</h1>
        </div>
        <ul className="navlinkcontainer300">
          <li>
            <NavLink to="/space-traveler" className="navlink300">Rockets</NavLink>
          </li>
          <li>
            <NavLink to="/dragons" className="navlink300">Dragons</NavLink>
          </li>
          <li>
            <NavLink to="/missions" className="navlink300">Missions</NavLink>
          </li>
          <li>
            <NavLink to="/myprofile" className="navlink300">My Profile</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
