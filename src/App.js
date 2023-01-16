import React from "react";
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [counter, setCounter] = React.useState(0)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            id: nanoid(),
            isHeld: false
        }
    }
    function allNewDice() {
        //generate a new array 
        const newDice = []
        // loop it 10 time 
        for (let i = 0; i < 10; i++) {
            //push it to the new array
            newDice.push(generateNewDie())
        }
        //return new array 
        return newDice
    }
    //roll dice to generate a new array
    function rollDice() {
        //roll dice if user hasn't won yet 
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }
    // holding dice that has been clicked
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        }))
    }
    // mapping elements on the new array
    const diceElement = dice.map(die =>
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    )
    function trackCount() {
        if (!tenzies) {
            setCounter(prevCount => prevCount + 1)
        } else {
            setCounter(0)
        }
    }
    //  reseting States

    function resetState() {
        setCounter(0)
        setDice(allNewDice())
        setTenzies(false)
    }

    // another way reseting states
    // const resetState = useCallback(() => {
    //     setCounter(0)
    //     setDice(allNewDice())
    //     setTenzies(false)
    // }, [setCounter, setDice, setTenzies, 0, allNewDice(), false])


    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same.
                Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElement}
            </div>
            <h3 className="move">Moves: {counter}</h3>
            <div className="btns">
                <button
                    className="roll-dice"
                    onClick={() => { rollDice(); trackCount() }}
                >
                    {tenzies ? "New Game" : "Roll"}
                </button>
                <button
                    className="reset-dice"
                    onClick={resetState}>Reset</button></div>

        </main>
    )
}