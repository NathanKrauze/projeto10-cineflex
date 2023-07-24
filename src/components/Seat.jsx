import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Seat ({seat, colorSeat, selected, reserveSeat}){

    const [seatStatus, setSeatStatus] = useState('available');

    useEffect( () => {
        if(selected){
            setSeatStatus('selected');
        }else{
            if(seat.isAvailable){
                setSeatStatus('available');
            }else{
                setSeatStatus('unavailable');
            }
        }
    }, [selected]);

    return(
        <SeatItem seatStatus={seatStatus} colorSeat={colorSeat} onClick={reserveSeat}>{seat.name}</SeatItem>
    )
};

const SeatItem = styled.div`
    border: 1px solid ${ props => props.colorSeat[props.seatStatus].border};         
    background-color: ${ props => props.colorSeat[props.seatStatus].backgroundColor};    
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`;