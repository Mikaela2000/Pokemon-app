import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getLPokemonsById, limpiarDetail } from "../../redux/actions";
import { useParams } from "react-router-dom";

import style from "./Detail.module.css"

const Detail = () => {
    const dispatch = useDispatch();

    const { id } = useParams();

    const pokemonDetail = useSelector((state) => state.pokemonDetail.length && state.pokemonDetail[0]);

    useEffect(() => {
        dispatch(getLPokemonsById(id))
        return () => {
            dispatch(limpiarDetail('clean'))
        }
    }, [id]);


    return (
        <div className={style.contenedor}>
            <div className={style.detail}>
                <h1>{pokemonDetail.name}</h1>
                <img className={style.image} src={pokemonDetail.image} alt="" />


                <div className={style.rangeConteiner}>
                    <div className={style.range}>
                        <label className={style.hpLabel} htmlFor="hp">Hp: </label>
                        <input type="range" id="hp" value={pokemonDetail.hp} name="hp" min="0" max="100" />
                        <span className={style.hpValue}>{pokemonDetail.hp}</span>


                        <label htmlFor="speed">Speed: </label>
                        <input
                            type="range"
                            id="speed"
                            value={pokemonDetail.speed}
                            name="speed"
                            min="0"
                            max="100"
                        />
                        <span>{pokemonDetail.speed}</span>
                    </div>

                    <div className={style.range2}>
                        <label htmlFor="attack">Attack: </label>
                        <input
                            type="range"
                            id="attack"
                            value={pokemonDetail.attack}
                            name="attack"
                            min="0"
                            max="100"
                            step="1"
                        />
                        <span>{pokemonDetail.attack}</span>

                        <label htmlFor="defense">Defense: </label>
                        <input
                            type="range"
                            id="defense"
                            value={pokemonDetail.defense}
                            name="defense"
                            min="0"
                            max="100"
                            step="1"
                        />
                        <span>{pokemonDetail.defense}</span>
                    </div>

                    <div className={style.range3}>

                        <label htmlFor="height">Height: </label>
                        <input
                            type="range"
                            value={pokemonDetail.height}
                            id="height"
                            name="height"
                            min="0"
                            max="100"
                            step="1"
                        />
                        <span>{pokemonDetail.height}</span>

                        <label htmlFor="weight">Weight: </label>
                        <input
                            type="range"
                            value={pokemonDetail.weight}
                            id="weight"
                            name="weight"
                            min="0"
                            max="100"
                            step="1"
                        />

                        <span>{pokemonDetail.weight}</span>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
