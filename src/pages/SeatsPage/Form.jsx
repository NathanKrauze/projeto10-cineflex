import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Form({ setUserInfo, seats, seatsSelected }) {

    const navigate = useNavigate();

    const [disabled, setDisabled] = useState(true);
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');

    useEffect(() => {
        if (seatsSelected.length > 0 && cpf !== '' && name !== '') {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [seatsSelected, name, cpf]);

    function reserve(e) {
        e.preventDefault();
        const newReserve = {
            ids: seatsSelected.map(s => s.id),
            name: name,
            cpf: cpf
        };

        axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many', newReserve)
            .then(response => {
                const info = {
                    movie: seats.movie.title,
                    date: seats.day.date,
                    session: seats.name,
                    seats: seatsSelected.map(s => `Assentos ${s.name}`),
                    name: name,
                    cpf: cpf
                };
                setUserInfo(info);
                navigate('/sucesso');
            })
            .catch(error => console.log(error));
    };

    return (
        <FormContainer onSubmit={reserve}>
            <label htmlFor='nome'>Nome do Comprador:</label>
            <input
                placeholder="Digite seu nome..."
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                data-test='client-name'
            />
            <label htmlFor="cpf">CPF do Comprador:</label>
            <input
                placeholder="Digite seu CPF..."
                id="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
                data-test='client-cpf'
            />
            <button type="submit" disabled={disabled} data-test='book-seat-btn'>Reservar Assento(s)</button>
        </FormContainer>
    )
};

const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`;
