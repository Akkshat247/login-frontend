import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

function Calculator({ onLogout }) {
  const [input, setInput]     = useState("");
  const [history, setHistory] = useState("");
  const [isResult, setIsResult] = useState(false);

  const handleDigit = useCallback((value) => {
    setInput((prev) => {
      if (isResult && /[0-9.]/.test(value)) {
        setIsResult(false);
        return value;
      }
      setIsResult(false);
      return prev + value;
    });
  }, [isResult]);

  const handleOperator = useCallback((op) => {
    setIsResult(false);
    setInput((prev) => {
      if (prev === "" && op === "-") return op;
      if (prev === "") return prev;
      // Replace trailing operator
      const trimmed = prev.replace(/[+\-*/]$/, "");
      return trimmed + op;
    });
  }, []);

  const calculate = useCallback(() => {
    if (!input || input === "-") return;
    try {
      // eslint-disable-next-line no-eval
      const result = eval(input);
      const formatted = parseFloat(result.toFixed(10)).toString();
      setHistory(input + " =");
      setInput(formatted);
      setIsResult(true);
    } catch {
      setInput("Error");
      setIsResult(true);
    }
  }, [input]);

  const clear = useCallback(() => {
    setInput("");
    setHistory("");
    setIsResult(false);
  }, []);

  const backspace = useCallback(() => {
    if (isResult) { clear(); return; }
    setInput((prev) => prev.slice(0, -1));
  }, [isResult, clear]);

  // Keyboard support
  useEffect(() => {
    const handler = (e) => {
      if (e.key >= "0" && e.key <= "9") handleDigit(e.key);
      else if (e.key === ".") handleDigit(".");
      else if (["+", "-", "*", "/"].includes(e.key)) handleOperator(e.key);
      else if (e.key === "Enter" || e.key === "=") calculate();
      else if (e.key === "Backspace") backspace();
      else if (e.key === "Escape") clear();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleDigit, handleOperator, calculate, backspace, clear]);

  const displayValue = input === "" ? "0" : input;

  const buttons = [
    { label: "AC",  action: clear,                  cls: "clear" },
    { label: "⌫",   action: backspace,               cls: "del"   },
    { label: "%",   action: () => handleDigit("%"),  cls: "op"    },
    { label: "÷",   action: () => handleOperator("/"), cls: "op equals-op" },

    { label: "7",   action: () => handleDigit("7") },
    { label: "8",   action: () => handleDigit("8") },
    { label: "9",   action: () => handleDigit("9") },
    { label: "×",   action: () => handleOperator("*"), cls: "op" },

    { label: "4",   action: () => handleDigit("4") },
    { label: "5",   action: () => handleDigit("5") },
    { label: "6",   action: () => handleDigit("6") },
    { label: "−",   action: () => handleOperator("-"), cls: "op" },

    { label: "1",   action: () => handleDigit("1") },
    { label: "2",   action: () => handleDigit("2") },
    { label: "3",   action: () => handleDigit("3") },
    { label: "+",   action: () => handleOperator("+"), cls: "op" },

    { label: "0",   action: () => handleDigit("0"), cls: "wide" },
    { label: ".",   action: () => handleDigit(".") },
    { label: "=",   action: calculate,              cls: "equals" },
  ];

  return (
    <div className="container">
      <div className="page-bg" />

      <div className="wordmark">
        <div className="wordmark-icon">∑</div>
        <div className="wordmark-text">Calc<span>Pro</span></div>
      </div>

      <div className="card calc-card">
        {/* Display */}
        <div className="calc-display">
          <div className="calc-history">{history || " "}</div>
          <div className={`calc-value${isResult ? " result" : ""}`}>
            {displayValue}
          </div>
        </div>

        {/* Button grid */}
        <div className="calc-grid">
          {buttons.map(({ label, action, cls }) => (
            <button
              key={label}
              className={`calc-btn${cls ? " " + cls : ""}`}
              onClick={action}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="calc-footer">
          <span>Keyboard shortcuts enabled</span>
          {onLogout && (
            <button className="btn-logout" onClick={onLogout}>
              Sign out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Calculator;