
const validate =(input)=>{
    let errors = {};

    if(!input.name){
        errors.name = 'Ingrese un nombre';
    }else if(input.name.length>10){
        errors.name ='No puede tener mas de 10 caracteres'
    }else if(/\d/.test(input.name)){
        errors.name ='No debe tener numeros'
    }else if(/[^\w\s]/.test(input.name)){
        errors.name = 'No puede contener simbolos'
    }
    else if(!input.image){
        errors.image = 'Ingrese una imagen'
    }
    return errors
}

export default validate;