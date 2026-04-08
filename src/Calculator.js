import React, { useState } from "react";
import "./App.css";

function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput(input + value);
  };

  const calculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  const clear = () => {
    setInput("");
  };

  return (
    <div className="container">
      <h1>Calculator App</h1>

      <div className="card">
        <input className="display" value={input} readOnly />

        <div className="grid">
          {["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"].map((btn) => (
            <button
              key={btn}
              onClick={() => btn === "=" ? calculate() : handleClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>

        <button className="clear" onClick={clear}>Clear</button>
      </div>
    </div>
  );
}

export default Calculator;