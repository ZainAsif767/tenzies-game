import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {
    const [dice, setDice] = React.useState(allNewDice())

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()

        }
    }


    function allNewDice() {
        // generate a new array
        const newDice = []
        // loop it 10 times
        for (let i = 0; i < 10; i++) {
            // push it to the new array
            newDice.push(generateNewDie())
        }
        //  return new array 
        return newDice
    }
    // roll dice to generate a new array
    function rollDice() {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ?
                die :
                generateNewDie()
        }))
    }
    // Holding the dice that has been clicked
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        }))
    }
    //  mapping elements on the new array
    const diceElements = dice.map(die =>
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    )

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>Roll</button>
        </main>
    )
}