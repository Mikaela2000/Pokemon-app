import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, orderName, orderAttack, filterType, showAllCards, filterOrigenCards, getTypes } from "../../redux/actions";
import style from './Home.module.css';
import Paginado from "../../components/paginado/paginado";
import Card from "../../components/card/Card";

const Home = () => {
    const dispatch = useDispatch();
    const allCharacters = useSelector((state) => state.characters);
    const tipos = useSelector((state) => state.tipos);
    const [currentPage, setCurrentPage] = useState(1);
    const [charactersPerPage] = useState(12);
    const indexOfLastCharacter = currentPage * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    const currentCharacters = allCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, []);

    const handleOrder = (e) => {
        dispatch(orderName(e.target.value));
    };

    const handleOrderAttack = (e) => {
        dispatch(orderAttack(e.target.value));
    };

    const handleFilter = (e) => {
        if (e.target.value === "Todos") {
            dispatch(showAllCards());

        } else dispatch(filterType(e.target.value));
    };
    const handleButton = (e) => {
        dispatch(showAllCards());
    }

    const handleFilterOrigin = (e) => {

        dispatch(filterOrigenCards(e.target.value));
    };
    return (
        <div className={style.home}>

            <button className={style.all} onClick={handleButton}>All</button>

            <div className={style.select}>
                <select className={style.select1} onChange={handleOrder}>
                    <option value="A">A...Z</option>
                    <option value="D">Z...A</option>
                </select>

                <select className={style.select1} onChange={handleOrderAttack}>
                    <option value="A">Ascendente</option>
                    <option value="D">Descendente</option>
                </select>

                <select className={style.select1} onChange={handleFilterOrigin}>
                    <option value="All">Todos</option>
                    <option value="API">API</option>
                    <option value="BD">Base de datos</option>
                </select>

                <select className={style.select2} onChange={handleFilter}>
                    <option value="Todos">Todos</option>
                    {tipos.map((type) => (
                        <option key={type.name} value={type.name}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className={style.contenedor}>
                {currentCharacters.map(({ id, name, image, hp, attack, defense, speed, height, weight, types }) => (
                    <Card
                        key={id}
                        id={id}
                        nombre={name}
                        imagen={image}
                        vida={hp}
                        ataque={attack}
                        defensa={defense}
                        velocidad={speed}
                        altura={height}
                        peso={weight}
                        types={types}
                    />
                ))}
                <Paginado className={style.paginado}
                    charactersPerPage={charactersPerPage}
                    totalCharacters={allCharacters.length}
                    currentPage={currentPage}
                    paginado={paginado}
                />
            </div>
        </div>
    );
};

export default Home;
