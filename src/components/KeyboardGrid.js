import { useState } from "react/cjs/react.development"
import styled from "styled-components"
import { getTodayWord, words } from "../data/helpers"

const keys1 = ["й","ц","у","к","е","н","г","ш","щ","з","х","ъ"]
const keys2 = ["ф","ы","в","а","п","р","о","л","д","ж","э"]
const keys3 = ["<--","я","ч","с","м","и","т","ь","б","ю","ВВОД"]

const KeyboardGrid = (props) => {
    const { setWord, setEnteredWords, currentWord, setGameEnd, enteredWords, toast, cookies} = props;

    const enterHandler = () => {
        if (currentWord.length === 5) {
            if (words.includes(currentWord.join("").toLowerCase())) {
                setEnteredWords(words => [...words, currentWord])
                console.log(enteredWords.length)
                if (currentWord.join("").toLowerCase() === getTodayWord()) {
                    setGameEnd("win")
                    // cookies.set('status', [], { path: '/' });
                } else if (enteredWords.length === 5) { 
                    setGameEnd("lost")
                    // cookies.set('status', [], { path: '/' });
                }
                setWord([])
            } else toast("В СЛОВАРЕ ИГРЫ НЕТ ТАКОГО СЛОВА")
        } else toast("СЛОВО СЛИШКОМ КОРОТКОЕ")


    }

    const letterHandler = (letter) => {
        if (letter.length > 3) {
            enterHandler()
        } else if (letter.length > 1) {
            setWord(words => words.length > 0 ? words.slice(0, -1) : words)
        } else {
            setWord(words => words.length < 5 ? [...words, letter] : words)
        }
    }

    const renderKeys = (keys) => {
        return keys.map(k => {
            return (
                <div className="key" onClick={e => letterHandler(k)}>
                    {k}
                </div>
            )
        })
    }

    return(
        <Grid>
            <div className="line">
                {renderKeys(keys1)}
            </div>
            <div className="line">
                {renderKeys(keys2)}
            </div>
            <div className="line">
                {renderKeys(keys3)}
            </div>
        </Grid>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    place-items: center;
    height: fit-content;
    width: 90%;
    margin-bottom: 15px;
    margin-right: auto;
    margin-left: auto;

    .line {
        display: flex;
        width: 100%;
        margin: 5px 0;

        .key {
            border-radius: 0.25rem;
            font-size: .75rem;
            line-height: 1rem;
            padding: 1.2rem 0.5rem;
            background-color: rgb(211, 214, 218);
            width: 100%;
            margin: 0 2px;
            text-transform: uppercase;
            font-weight: 700;
            white-space: nowrap;
        }
    }
`

export default KeyboardGrid
