import React, {useState, useEffect} from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import './Cadastro.css'
import { useLocation, Navigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Alterar = () => {

    const {produto} = useLocation().state;
    const [dados, setDados] = useState({})
    const [clicou, setClicou] = useState(false)
    const [navegar, setNavegar] = useState(false)

    useEffect(()=>{
        if(clicou){
            setNavegar(true)
        }
        
        return () =>{
            setNavegar(false)
            setClicou(false)
        }
    }, [clicou])

    function enviarDados(){
        axios.put('http://localhost:8080/produto', 
            dados
        ).then(response => console.log(response))
        .then(dados => {
            alert('Dados alterados com sucesso');
            
        })
        .catch(error => console.log(error))
    }
    
    useEffect(()=>{
        if (clicou) {
            enviarDados()
            setNavegar(true)
        } 
        else {
            console.log('app no ar')
        }
       return (()=>{
            setClicou(false);
            setNavegar(false);
        })
    }, [clicou])
    
    return (
    <div>
        <h1>Alterar Produto</h1>
        <Formik
            initialValues={{
                statusProd: produto.statusProd
            }}
            onSubmit={(values, actions) => {
                if(values.nome.length > 0){
                        setTimeout(() => {
                        setDados({
                            statusProd: values.statusProd
                        })
                        setClicou(true)
                    }, 1000);
                } else {
                    alert('Favor preencher informações!')
                }
                
            }}
        >
            {props => (
                <form onSubmit={props.handleSubmit}>
                   
                    <div>
                        <select
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.statusProd}
                            name="statusProd"
                        >
                            <option>ATIVO</option>
                            <option>INATIVO</option>
                        </select>
                        {props.errors.statusProd && <div id="feedback">{props.errors.statusProd}</div>}
                    </div>
                    
                    {(navegar) ? <Navigate 
                        to="/listagem" 
                        replace={true}
                    /> : <></>}

                    <Button 
                        variant="primary"
                        type="submit">ALTERAR</Button>
                </form>
            )}
        </Formik>
    </div>
    );
}

export default Alterar