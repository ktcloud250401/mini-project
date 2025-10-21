import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('KT Cloud TECH UP 계산기');
  const [previousValue, setPreviousValue] = useState('');
  const [operator, setOperator] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setEquation('');
    setPreviousValue('');
    setOperator('');
    setWaitingForOperand(false);
  };

  const clearDisplay = () => {
    setDisplay('0');
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (previousValue === '') {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue || 0;
      let newValue = currentValue;

      switch (operator) {
        case '/':
          newValue = currentValue / inputValue;
          break;
        case '*':
          newValue = currentValue * inputValue;
          break;
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '%':
          newValue = currentValue % inputValue;
          break;
        default:
          break;
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
    
    if (nextOperator !== '=') {
      setEquation(display + nextOperator);
    } else {
      setEquation('');
    }
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handlePercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <div className="equation">{equation}</div>
          <div className="result">{display}</div>
        </div>

        <div className="buttons">
          <button className="btn function" onClick={clearAll}>C</button>
          <button className="btn function" onClick={handleBackspace}>←</button>
          <button className="btn function" onClick={handlePercent}>%</button>
          <button className="btn operator" onClick={() => performOperation('/')}>/</button>

          <button className="btn number" onClick={() => inputDigit(7)}>7</button>
          <button className="btn number" onClick={() => inputDigit(8)}>8</button>
          <button className="btn number" onClick={() => inputDigit(9)}>9</button>
          <button className="btn operator" onClick={() => performOperation('*')}>*</button>

          <button className="btn number" onClick={() => inputDigit(4)}>4</button>
          <button className="btn number" onClick={() => inputDigit(5)}>5</button>
          <button className="btn number" onClick={() => inputDigit(6)}>6</button>
          <button className="btn operator" onClick={() => performOperation('-')}>-</button>

          <button className="btn number" onClick={() => inputDigit(1)}>1</button>
          <button className="btn number" onClick={() => inputDigit(2)}>2</button>
          <button className="btn number" onClick={() => inputDigit(3)}>3</button>
          <button className="btn operator" onClick={() => performOperation('+')}>+</button>

          <button className="btn number" onClick={() => inputDigit(0)}>0</button>
          <button className="btn number" onClick={inputDecimal}>.</button>
          <button className="btn equals" onClick={() => performOperation('=')}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;