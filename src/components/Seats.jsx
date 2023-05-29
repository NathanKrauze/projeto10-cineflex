import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Seats (props) {

    const{seats, setSeatsSelected} = props;

    const[isSelected, setIsSelected] = useState([])

    function selectSeat(i){
        if(isSelected.includes(i)){
            console.log(isSelected)
            const arrayRemove = [... isSelected]
            arrayRemove.splice(i,1)
            setIsSelected(arrayRemove)
            return
        }
        else {
            const novoArray = [...isSelected];
            novoArray.push(i);
            setIsSelected(novoArray)
        }
    }

    return(
        <SeatsContainer>
            {seats.map((seat,indice)=>
                <SeatItem 
                key={indice}
                isAvailable = {seat.isAvailable} 
                isSelected = {isSelected.includes(indice)} 
                onClick={() => selectSeat(indice)} 
                data-test="seat">{seat.name}</SeatItem>)}
        </SeatsContainer>
    )
}

const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const SeatItem = styled.div`
    border: 1px solid ${props => !props.isAvailable ? "#F7C52B" : props.isSelected ? "#0E7D71" : "#808F9D"};
    background-color: ${props => !props.isAvailable ? "#FBE192" : props.isSelected ? "#1AAE9E" : "#C3CFD9"};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`