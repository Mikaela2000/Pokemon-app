import React, { useState, useEffect } from "react";
import style from './Form.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { agregarPokemon, getTypes } from "../../redux/actions";
import validate from './validations';


const Form = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); //me redirige a la ruta que le indico
    const tipos = useSelector((state) => state.tipos);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        image: "",
        hp: "50",
        attack: "50",
        defense: "50",
        speed: "50",
        height: "5",
        weight: "50",
        types: []
    })


    useEffect(() => {
        dispatch(getTypes());
    }, [])

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))

    }
    const handleSelect = (e) => {
        if (input.types.length >= 2) {
            return alert("Solo puedes seleccionar hasta dos tipos")
        }
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    const handleDelete = (el) => {
        setInput({
            ...input,
            types: input.types.filter(ty => ty !== el)
        })
    }

    const [imageUrl, setImageUrl] = useState('');

    const handleImageUrlChange = (event) => {
        setInput({
            ...input,
            image: event.target.value,
        });
        setImageUrl(event.target.value);

        setErrors(validate({
            ...input,
            image: event.target.value
        }))
    };




    const handleSubmit = (event) => {
        event.preventDefault();

        if (Object.keys(errors).length !== 0) {
            alert("Faltan campos por completar.");
            return;
        }

        if (input.types.length === 0) {
            return alert('Complete el campo de tipos')
        }

        dispatch(agregarPokemon(input));
        alert("Nuevo pokemon creado!")
        setInput({
            name: "",
            image: "",
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            types: []
        })
        navigate('/home');

    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className={style.create}>
                <div className={style.contenedor}>
                    <h3>Crea tu pokemon!</h3>

                    <div className={style.contenedor2}>

                        <div className={style.name} >
                            <label htmlFor="name">Name: </label>
                            <input
                                type="text"
                                value={input.name}
                                name="name"
                                onChange={handleChange} />
                            <p className={style.errorEmail}>{errors.name}</p>

                        </div>

                        <div className={style.range}>
                            <label htmlFor="hp">Hp: </label>
                            <input
                                type="range"
                                id="hp"
                                value={input.hp}
                                name="hp"
                                min="0"
                                max="100"
                                step="1"
                                onChange={handleChange} />
                            <span>{input.hp}</span>

                            <label htmlFor="speed">Speed: </label>
                            <input
                                type="range"
                                id="speed"
                                value={input.speed}
                                name="speed"
                                min="0"
                                max="100"
                                step="1"
                                onChange={handleChange} />
                            <span>{input.speed}</span>

                        </div>

                        <div className={style.range2}>
                            <label htmlFor="attack">Attack: </label>
                            <input
                                type="range"
                                id="attack"
                                value={input.attack}
                                name="attack"
                                min="0"
                                max="100"
                                step="1"
                                onChange={handleChange} />
                            <span>{input.attack}</span>

                            <label htmlFor="defense">Defense: </label>
                            <input
                                type="range"
                                id="defense"
                                value={input.defense}
                                name="defense"
                                min="0"
                                max="100"
                                step="1"
                                onChange={handleChange} />
                            <span>{input.defense}</span>
                        </div>

                        <div className={style.range3}>

                            <label htmlFor="height">Height: </label>
                            <input
                                type="range"
                                value={input.height}
                                id="height"
                                name="height"
                                min="0"
                                max="100"
                                step="1"
                                onChange={handleChange} />
                            <span>{input.height}</span>

                            <label htmlFor="weight">Weight: </label>
                            <input
                                type="range"
                                value={input.weight}
                                id="weight"
                                name="weight"
                                min="0"
                                max="100"
                                step="1"
                                onChange={handleChange} />

                            <span>{input.weight}</span>

                        </div>

                        <div className={style.type}>

                            <label htmlFor="type">Type: </label>
                            <select name="type" onChange={(e) => handleSelect(e)}>
                                {tipos.map(ty => (
                                    <option key={ty.id} value={ty.name}>{ty.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className={style.conteinerImg}>
                            <label htmlFor="image">Image: </label>
                            <input type="text"
                                id="image"
                                value={input.image}
                                name="image"
                                accept="image/*"
                                onChange={handleImageUrlChange}
                            />
                            <p className={style.errorEmail}>{errors.image}</p>
                        </div>

                    </div>

                    {input.types.map(el =>
                        <div className={style.divTyp} key={el}>
                            <p>{el}</p>
                            <button onClick={() => handleDelete(el)}>X</button>
                        </div>
                    )}

                </div>

                <div className={style.divImg} >
                    {imageUrl && <img className={style.imageForm} src={imageUrl} alt="Imagen del Pokémon" />}
                </div>

                <button className={style.buttonCrear} type="submit"></button>


                <Link to="/home">
                    <button className={style.home}></button>
                </Link>



            </div>


        </form>

    );
};

export default Form;