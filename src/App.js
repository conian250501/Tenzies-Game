
import './App.css';
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Die from './components/Die'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {

    const allHeld = dice.every((die) => die.isHeld);
    //lấy giá trị đầu tiên của mảng die
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      alert('Congratulations, You succeeded!')
    }
  }, [dice])

  //Xử lý trả về id, random và status
  function generateNewDie() {
    return {
      id: nanoid(),
      isHeld: false,
      value: Math.ceil(Math.random() * 10),
    }
  }

  //Hàm xử lý thêm số mới vào mảng
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }


  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }


  const diceElement = dice.map((die, index) => (
    <Die
      key={index}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))
  return (
    <div className="App">
      <main>
        {tenzies && <Confetti />}
        <h1 className="AppTitle">Welcome To Tenzies Game</h1>
        Roll until all the numbers same
        <div className="die__container">{diceElement}</div>
        <button className="roll__dice" onClick={rollDice} >
          {tenzies ? 'New Game' : 'Roll'}
        </button>
      </main>
    </div>
  );
}

export default App;
