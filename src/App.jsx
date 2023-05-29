import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import axios from "axios"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

export default function App() {

    const[movieSelected, setMovieSelected] = useState([])
    const[seatsSelected, setSeatsSelected] = useState([])
    const[clientName, setClientName] = useState([])
    const[clientCPF, setClientCPF] = useState([])

    axios.defaults.headers.common['Authorization'] = 'seuTokenDeAcessoNoHUB';

    return (
        <>
            <BrowserRouter>
                <NavContainer>CINEFLEX</NavContainer>
                <Routes>
                    <Route path= "" element={<HomePage />}/>
                    <Route path= "/sessoes/:idFilme" element={
                        <SessionsPage 
                        movieSelected = {movieSelected}
                        setMovieSelected = {setMovieSelected}/>}/>
                    <Route path= "/assentos/:idSessao" element={
                        <SeatsPage 
                        movieSelected = {movieSelected} 
                        setMovieSelected = {setMovieSelected}
                        setSeatsSelected = {setSeatsSelected}
                        setclientName = {setClientName}
                        setclientCPF = {setClientCPF}/>}/>
                    <Route path= "/sucesso" element={
                        <SuccessPage 
                        movieSelected = {movieSelected} 
                        seatsSelected = {seatsSelected}
                        clientName = {clientName} 
                        clientCPF = {clientCPF}/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    left: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
