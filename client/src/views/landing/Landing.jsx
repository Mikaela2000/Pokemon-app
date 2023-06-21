import { Link } from "react-router-dom";
import style from './Landing.module.css'

const Landing =()=>{
    return(
        <div className={style.conteiner}>
            <img src="https://www.freepnglogos.com/uploads/pokemon-logo-png-0.png" className={style.img} alt="" />
        <Link to="/home">
        <button className={style.btn}>START</button>
        </Link>
        </div>
    )
}

export default Landing;