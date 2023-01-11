import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {
    const [dice, setDice] = React.useState(allNewDice())

    function allNewDice() {
        // generate a new array
        const newDice = []
        // loop it 10 times
        for (let i = 0; i < 10; i++) {
            // push it to the new array
            newDice.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()

            })
        }
        //  return new array 
        return newDice
    }
    // roll dice to generate a new array
    function rollDice() {
        setDice(allNewDice())
    }
    //  mapping elements on the new array
    const diceElements = dice.map(die =>
        <Die key={die.id} value={die.value} isHeld={die.isHeld} />
    )

    return (
        <main>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>Roll</button>
        </main>
    )
}