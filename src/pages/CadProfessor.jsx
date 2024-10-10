import React, {useState, useEffect} from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import './CadProfessor.css'

const CadProfessor = () => {

    const [dados, setDados] = useState({})
    const [clicou, setClicou] = useState(false)

    function enviarDados(){
        axios.post('http://localhost:8080/cadProfessor', 
            dados
        ).then(response => console.log(response))
        .then(dados => alert('Dados enviados com sucesso'))
        .catch(error => console.log(error))
    }
    
    useEffect(()=>{
       clicou ? enviarDados() : console.log('app no ar')
       return (()=>setClicou(false))
    }, [clicou])
    
    return (
    <div>
        <h1>Cadastrar Professor</h1>
        <Formik
            initialValues={{
                id: 0,
                Nome: '',
                Email: '',
                Senha: '',
                Certificado: null,
                Endereco: '',
                CPF: '',
                statusProf: 'ATIVO'
            }}
            onSubmit={(values, actions) => {

                if(values.Nome.length > 0){
                        setTimeout(() => {
                        setDados({
                            Nome: values.Nome,
                            Email: values.Email,
                            Senha: values.Senha,
                            Certificado: values.Certificado,
                            Endereco: values.Endereco,
                            CPF: values.CPF,
                            statusProf: values.statusProf
                        })
                        setClicou(true)
                        // alert(JSON.stringify(values, null, 2));
                        // console.log(JSON.stringify(values, null, 2));
                        // actions.setSubmitting(false);
                    }, 1000);
                } else {
                    alert('Favor preencher informações!')
                }
                
            }}
        > 
            {props => (
                <form onSubmit={props.handleSubmit}>
                    <div>
                        <input
                            type="number"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.id}
                            placeholder='id'
                            name="id"
                            disabled
                        />
                        {props.errors.id && <div id="feedback">{props.errors.id}</div>}
                    </div>

                    <div>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.Nome}
                            placeholder="Seu nome"
                            name="Nome"
                        />
                        {props.errors.Nome && <div id="feedback">{props.errors.Nome}</div>}
                    </div>

                    <div>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.Email}
                            name="Email"
                            placeholder="E-mail"
                        />
                        {props.errors.Email && <div id="feedback">{props.errors.Email}</div>}
                    </div>
                    <div>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.Senha}
                            name="Senha"
                            placeholder="Senha"
                        />
                        {props.errors.Senha && <div id="feedback">{props.errors.Senha}</div>}
                    </div>
                    <div>
                        <input
                            type="image"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.Certificado}
                            name="Certificado"
                            placeholder="Foto do Certificado"
                            hidden
                        />
                        {props.errors.Certificado && <div id="feedback">{props.errors.Certificado}</div>}
                    </div>
                    <div>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.Endereco}
                            name="Endereço"
                            placeholder="Seu endereço"
                        />
                        {props.errors.Endereco && <div id="feedback">{props.errors.Endereco}</div>}
                    </div>
                    <div>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.CPF}
                            name="CPF"
                            placeholder="CPF"
                        />
                        {props.errors.CPF && <div id="feedback">{props.errors.CPF}</div>}
                    </div>
                    <div>
                        <select
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.statusProf}
                            name="statusProf"
                        >
                            <option>ATIVO</option>
                            <option>INATIVO</option>
                        </select>
                        {props.errors.statusProf && <div id="feedback">{props.errors.statusProf}</div>}
                    </div>
                    
                    <button type="submit">SALVAR</button>
                </form>
            )}
        </Formik>
    </div>
    );
}

export default CadProfessor