import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components"
import Seat from "../../components/Seat";
import { colorSeat } from "../../constants/colorSeat";
import Form from "./Form"

export default function SeatsPage({ setUserInfo }) {

    const { idSessao } = useParams();
    const [seats, setSeats] = useState(undefined);
    const [seatsSelected, setSeatsSelected] = useState([]);

    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)
            .then(response => setSeats(response.data))
            .catch(error => console.log(error.response.data))
    }, []);

    if (seats === undefined) {
        return <div> Carregando...</div>
    }

    function reserveSeat(seat) {
        if (!seat.isAvailable) {
            alert('Assento não disponível');
        } else {
            const selecteds = seatsSelected.some(s => s.id === seat.id);
            if (selecteds) {
                const newArray = seatsSelected.filter(s => s.id !== seat.id);
                setSeatsSelected(newArray);
            } else {
                setSeatsSelected([...seatsSelected, seat]);
            }
        }
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.seats.map(seat =>
                    <Seat
                        seat={seat}
                        key={seat.id}
                        colorSeat={colorSeat}
                        selected={seatsSelected.some(s => s.id === seat.id)}
                        reserveSeat={() => reserveSeat(seat)} />
                )}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle status={'selected'} colorSeat={colorSeat} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle status={'available'} colorSeat={colorSeat} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle status={'unavailable'} colorSeat={colorSeat} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <Form setUserInfo={setUserInfo} seats={seats} seatsSelected={seatsSelected} />

            <FooterContainer>
                <div>
                    <img src={seats.movie.posterURL} alt={seats.movie.title} />
                </div>
                <div>
                    <p>{seats.movie.title}</p>
                    <p>{seats.day.weekday} - {seats.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => props.colorSeat[props.status].border};  
    background-color: ${props => props.colorSeat[props.status].backgroundColor};   
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`