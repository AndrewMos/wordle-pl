import styled from "styled-components"
import { getTodayWord, wordColoring } from "../data/helpers";


const WordsGrid = (props) => {
    const { currentWord, enteredWords } = props;

    const renderLetters = () => {
        let list = []

        for (let i = 0; i < enteredWords.length; i++) {
            const colorsList = ["#07bc0c", "#f1c40f", "#787C7E"]
            const colors = wordColoring(enteredWords[i], getTodayWord())
            for (let j = 0; j < enteredWords[i].length; j++) {
                list.push(
                    <div style={{backgroundColor: colorsList[colors[j]], color: "white"}} className="box bordered">{enteredWords[i][j]}</div>
                )
            }
        }

        for (let i = 0; i < currentWord.length; i++) {
            list.push(
                <div className="box filled">{currentWord[i]}</div>
            )
        }

        const num = currentWord.length + enteredWords.length * 5;

        for (let i = 0; i < 6*5 - num; i++) {
            list.push(
                <div className="box bordered"></div>
            )
        }

        return list;
    }

    return(
        <Grid>
           {renderLetters()}
        </Grid>
    )
}

const Grid = styled.div`
    width: 80%;
    height: 100%;
    max-height: 480px;
    margin: 0 20px;
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;

    .box {
        width: 100%;
        height: 100%;

        font-size: 2.5rem;
        line-height: 2.5rem;
        text-transform: uppercase;
        font-weight: 700;

        display: grid;
        place-items: center;
    }

    .filled {
        border: 2px solid rgb(150, 140, 150);
    }

    .bordered {
        border: 2px solid rgb(211, 214, 218);
    }
`

export default WordsGrid