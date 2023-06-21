import React from "react";
import style from './paginado.module.css';

const Paginado = ({ charactersPerPage, totalCharacters, currentPage, paginado }) => {
  const adjustedTotalCharacters = totalCharacters >= 15 ? totalCharacters - 15 : 0; // Asegurarse de que totalCharacters sea al menos 15
  const pageNumbers = Math.ceil(adjustedTotalCharacters / charactersPerPage);

  return (
    <div className={style.container}>
      <ul>
        <button className={style.button} disabled={currentPage === 1} onClick={() => paginado(currentPage - 1)}>Back</button>
        {[...Array(pageNumbers)].map((_, index) => (
          <li key={index} className={currentPage === index + 1 ? "active" : ""} onClick={() => paginado(index + 1)}>{index + 1}</li>
        ))}
        <button className={style.button} disabled={currentPage === pageNumbers} onClick={() => paginado(currentPage + 1)}>Next</button>
      </ul>
    </div>
  );
};

export default Paginado;


// import React from "react";
// import style from './paginado.module.css';

// export default function paginado({ pokemonPerPage, allPokemons, paginated }) {
//   const pageNumbers = [];
//   for (let i = 0; i < Math.ceil(allPokemons / pokemonPerPage); i++) {
//     pageNumbers.push(i + 1);
//   }

//   return (
//     <div className={style.container}>
//       {pageNumbers &&
//         pageNumbers.map((e) => (
//           <button onClick={() => paginated(e)} className={style.pagination} key={e}>
//             {e}
//           </button>
//         ))}
//     </div>
//   );
// }

