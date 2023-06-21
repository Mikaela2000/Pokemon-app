import style from './search.module.css'
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getNameCharacters} from '../../redux/actions'


const SearchBar = () => {
   const allCharacters = useSelector((state) => state.allCharacters);
   const dispatch= useDispatch()
   const [name, setName] = useState("")

   const handleChange= (event)=>{
      event.preventDefault();
      setName(event.target.value) 
    
   };

   const handleSubmit= async (event)=>{
      event.preventDefault();
      const foundCharacter = allCharacters.find((character) => character.name === name);
     
     console.log(foundCharacter)
     if(!name){
      return alert('Ingrese un nombre')
     }
     if(!foundCharacter){
      setName("")
      return alert('Pokemon no encontrado')
      
     }
      
      dispatch(getNameCharacters(name))
      setName("")
   }

   return (
      <div className={style.contenedor}> 
         <input className={style.input} type='text' value={name} onChange={handleChange} placeholder='Ingresar nombre...'/>
         <button className={style.btn} type='submit' onClick={(e)=> handleSubmit(e)}></button> 
       
      </div>
   );
}

export default SearchBar;