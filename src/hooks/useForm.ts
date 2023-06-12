import { useState, useEffect, useMemo } from 'react';

export const useForm = <T>( initialForm :T , formValidations:any) => {
  
    const [ formState, setFormState ] = useState<any>( initialForm );
    const [formValidation, setFormValidation] = useState<any>({});

    useEffect(() => {
      createValidators();
    }, [formState])
    
    const isFormValid = useMemo(()=>{
        for (const formValue of Object.keys(formValidation)) {
            if(formValidation[formValue] !== null) return false; 
        }
        return true;

    },[formValidation])

    const onInputChange = ({ target } : any) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () =>{
        const formCheckValues:any = {};

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];

            formCheckValues[`${formField}Valid`] = fn( formState[formField]) ? errorMessage : null;
        }
        setFormValidation(formCheckValues);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}