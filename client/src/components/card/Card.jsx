import style from './card.module.css'
import { Link } from 'react-router-dom';
const Card = ({ id, nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, types }) => {


    return (
        <div className={style.conteiner}>
            <div className={style.conteiner2}>
                <div className={style.conteiner3}>
                    <Link className={style.link} to={`/detail/${id}`} >
                        <h2 className={style.nombre}>{`${nombre}`}</h2>
                    </Link>
                    <h2>{`${vida}`}</h2>
                    <p className={style.hp}>hp</p>
                </div>

                <div className={style.imgContenedor}><img className={style.imagen} src={`${imagen}`} alt='' /></div>

                <div className={style.conteiner4}>

                    <h2>{`Attack: ${ataque}`}</h2>
                    <h2>{`Defense: ${defensa}`}</h2>
                    <h2>{`Speed: ${velocidad}`}</h2>
                    <h2>{`Types: ${types}`}</h2>

                </div>
                <div className={style.datos}>
                    <h2>{`${altura}`}</h2>
                    <p className={style.altura}>cm</p>
                    <h2 className={style.pesoh2}>{`${peso}`}</h2>
                    <p className={style.peso}>kg</p>
                </div>
            </div>
        </div>
    )
}

export default Card;