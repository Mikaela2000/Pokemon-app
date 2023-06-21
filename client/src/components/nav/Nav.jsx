import SearchBar from "../searchBar/SearchBar"
import { Link } from "react-router-dom";
import style from './nav.module.css'

const Nav = () => {
    return (
        <div className={style.contenedor}>
            
                <Link to="/home">
                    <img className={style.logo} src="https://www.freepnglogos.com/uploads/pokemon-logo-png-0.png" alt="" />
                </Link>

                <SearchBar ></SearchBar>

                <Link to="/create">
                <button className={style.btn}>New Pokemon</button>
                </Link>
 
        </div>
    )

}
export default Nav;