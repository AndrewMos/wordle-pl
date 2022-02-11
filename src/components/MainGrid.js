import { useEffect, useState } from "react"
import styled from "styled-components"
import KeyboardGrid from "./KeyboardGrid"
import WordsGrid from "./WordsGrid"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GameEnd from "./GameEnd";
import Cookies from 'universal-cookie';
import { getTodayWord } from "../data/helpers";

const cookies = new Cookies();

const MainGrid = () => {
    const [enteredWords, setEnteredWords] = useState([]);
    const [currentWord, setCurrentWord] = useState([]);
    const [gameEnd, setGameEnd] = useState("");
    const [showGame, setShowGame] = useState(true);

    const replay = () => {
        setEnteredWords([])
        setCurrentWord([])
        setGameEnd("")
        setShowGame(true)
    }

    // useEffect(() => {
    //     (showGame && enteredWords.length && enteredWords.length < 6) && cookies.set('status', enteredWords, { path: '/' });
    // }, [enteredWords])

    // useEffect(() => {
    //     // const status = cookies.get('status')
    //     // status && setEnteredWords(status)

    //     // if (getTodayWord() !== cookies.get('word')) {
    //     //     cookies.set('word', "", { path: '/' });
    //     //     cookies.set('win', false, { path: '/' });
    //     // }

    //     // if (cookies.get('win') === true) {
    //     //     setGameEnd("win")
    //     //     setShowGame(false)
    //     // }
    // }, [])

    useEffect(() => {
        if (gameEnd === "") return;
        setTimeout(() => {
            setShowGame(false);
        }, 2000)
    }, [gameEnd])

    return(
        <Container>
            <div className="header">
                <div className="info" onClick={e => 
                        toast(`Угадай сегодняшнее слово, вводи слова с пяти букв и они будут менять цвет: ⬜️  такая буква не в слове, 🟨  такая буква в слове, но не на своем месте, 🟩  такая буква стоит правильно! У тебя всего шесть попыток! Новый день - новое слово`)
                    }>

                    как играть?
                </div>
                СЛОВЕЧКИ
            </div>
            <ToastContainer hideProgressBar={true} position="top-center" autoClose={6000}/>
            {showGame ?
                <>
                    <WordsContainer>
                    <WordsGrid currentWord={currentWord} enteredWords={enteredWords} closeOnClick/>    
                    </WordsContainer>
                    <KeyboardGrid setWord={setCurrentWord} enteredWords={enteredWords} setEnteredWords={setEnteredWords} currentWord={currentWord} setGameEnd={setGameEnd} toast={toast} cookies={cookies}/>
                </>
            :
                <GameEnd gameEnd={gameEnd} enteredWords={enteredWords} replay={replay}/>
            }
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    max-width: 450px;
    min-width: 360px;
    height: 100vh;
    /* background: rgb(240, 240, 240); */

    display: flex;
    flex-direction: column;

    margin-left: auto;
    margin-right: auto;

    .header {
        width: 100;

        display: grid;
        place-items: center;
        font-size: 30px;
        border-bottom: 1px solid rgb(229, 231, 235, 200);
        padding: 8px 0;
        font-weight: 800;

        position: relative;

        .info {
            position: absolute;
            top: 35%;
            left: 5px;
            font-size: 12px;
        }
    }
`

const WordsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    padding: 20px 0;
`


export default MainGrid