import React, { useEffect, useState } from "react";
import "./App.css";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import Button from "./components/Button";
import ButtonGroup from "./components/ButtonGroup";

function App() {
  const btnValues = [
    ["AC", "+/-", "%", "÷"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];

  const [text, setText] = useState({
    prev: "",
    curr: "",
    operator: undefined,
  });

  const [calc, setCalc] = useState({
    prev: "",
    curr: "",
    operator: undefined,
  });

  const onClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.value;

    if (["+", "-", "X", "÷", "%"].includes(value)) {
      operation(value);
    } else if (value === "AC") {
      clear();
    } else if (value === "=") {
      compute();
    } else if (value === "+/-") {
      invert();
    } else {
      append(value);
    }
  };

  const onKeydownHandler = (e) => {
    if (e.key.match(/[0-9.]/g)) {
      append(e.key);
    } else if (e.key.match(/[+\-*x/%]/g)) {
      operation(e.key);
    } else if (e.key === "Enter" || e.key === "=") {
      compute();
    } else if (e.key === "Delete" || e.key === "c") {
      clear();
    } else if (e.key === "i") {
      invert();
    }
  };

  const clear = () => {
    setCalc({
      prev: "",
      curr: "",
      operator: undefined,
    });
  };

  const invert = () => {
    setCalc((ex) => ({
      prev: ex.prev,
      curr: ex.curr * -1,
      operator: ex.operator,
    }));
  };

  const append = (number) => {
    if (number === "." && calc.curr.toString().includes(".")) return;
    if (number === "." && calc.curr.toString().charAt(0) === "") number = "0.";
    setCalc((ex) => ({
      prev: ex.prev,
      curr: calc.curr.toString() + number,
      operator: ex.operator,
    }));
  };

  const operation = (op) => {
    if (calc.curr === "") return;
    if (calc.prev !== "") compute();

    setCalc((ex) => ({
      prev: ex.curr,
      curr: "",
      operator: op,
    }));
  };

  const compute = () => {
    let result;
    const prev = parseFloat(calc.prev);
    const curr = parseFloat(calc.curr);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (calc.operator) {
      case "+":
        result = prev + curr;
        break;

      case "-":
        result = prev - curr;
        break;

      case "X":
        result = prev * curr;
        break;

      case "*":
        result = prev * curr;
        break;

      case "÷":
        result = prev / curr;
        break;

      case "/":
        result = prev / curr;
        break;

      case "%":
        result = (prev / 100) * curr;
        break;

      default:
        break;
    }

    setCalc((ex) => ({
      prev: "",
      curr: result,
      operator: undefined,
    }));
  };

  const numDisplay = (number) => {
    const intDigits = parseFloat(number.toString().split(".")[0]);
    const isComma = number.toString().includes(".");
    const decDigits = number.toString().split(".")[1];

    if (isNaN(intDigits)) {
      return "";
    }

    const display = intDigits.toLocaleString("en", {
      maximumFractionDigits: 0,
    });

    return `${display}${isComma ? "." : ""}${decDigits ? decDigits : ""}`;
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeydownHandler);
    document.title = "React Calculator";

    setText((ex) => ({
      prev: calc.operator ? numDisplay(calc.prev) + " " + calc.operator : "",
      curr: numDisplay(calc.curr),
      operator: undefined,
    }));

    return () => {
      window.removeEventListener("keydown", onKeydownHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calc]);

  return (
    <Wrapper>
      <Screen prev={text.prev} curr={text.curr} />
      <ButtonGroup>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={
                btn === "="
                  ? "equals"
                  : !isNaN(btn) || btn === "."
                  ? ""
                  : "func"
              }
              value={btn}
              onClick={onClickHandler}
            />
          );
        })}
      </ButtonGroup>
    </Wrapper>
  );
}

export default App;
