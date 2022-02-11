import styled from "styled-components"
import { getTodayWord, wordColoring } from "../data/helpers";


const GameEnd = (props) => {
    const { gameEnd, enteredWords, replay } = props

    const renderStats = enteredWords.map(word => {
        const colors = wordColoring(word, getTodayWord())
        const tmp = colors.map(color => {
            if (color === 0) {
                return <div className="rect">🟩</div>
            } else if (color === 1) {
                return <div className="rect">🟨
                </div>
            } else {
                return <div className="rect">⬜️</div>
            }
        })
        return(
            <div className="line">
                {tmp}
            </div>
        )
    })

    for (const word of enteredWords) {
        const colors = wordColoring(word, getTodayWord())

    }
    

    return(
        <Container>
            <div className="stats">
                {renderStats}              
            </div>
            <div className="note">
                {gameEnd === "win" ?
                    "МОЛОДЕЦ, ТЫ ОТГАДАЛ СЛОВО ДНЯ! ЗАВТРА БУДЕТ ДРУГОЕ СЛОВО, ЗАХОДИ, ПОПРОБУЙ ОТГАДАТЬ!"
                    :
                    <>
                        НЕУДАЧА, ПОПРОБУЙ ЕЩЕ РАЗ!
                        <button onClick={e => replay()}>ПОВТОРИТЬ ПОПЫТКУ</button>
                    </>
                }
            </div>
        </Container>
    )

}

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    place-items: center;

    .stats {
        display: flex;
        flex-direction: column;

        font-size: 2.5rem;
        line-height: 2.5rem;
    }

    .line {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
    }

    .rect {
        margin: 3px;
    }

    .note {
        font-size: 1.5rem;

        display: flex;
        flex-direction: column;
        align-items: center;

        padding: 30px;

        button {
            background-color:#44c767;
            border-radius:8px;
            display:inline-block;
            cursor:pointer;
            color:#ffffff;
            font-family:Arial;
            font-size:25px;
            padding:11px 31px;
            text-decoration:none;

            margin-top: 15px;
        }
    }
`

export default GameEnd