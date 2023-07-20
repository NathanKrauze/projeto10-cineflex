import styled from "styled-components"
import axios from "axios"
import { useState, useEffect } from "react"
import Movie from "../../components/Movie"

export default function HomePage() {

    const[ movies, setMovies ] = useState([])


    useEffect(()=>{
        const request = axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies') 
        request.then(response => setMovies(response.data));
        request.catch(error => alert(error.response.data));
    },[]);

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {movies.map(movie => <Movie movie={movie}/>)}
            </ListContainer>
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
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`