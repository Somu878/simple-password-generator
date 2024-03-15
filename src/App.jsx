import "./styles.css";
import { useState } from "react";
import usePasswordGenerator from "./custom hooks/usePasswordGenerator";
export default function App() {
  const [charSize, setCharSize] = useState(4);
  const [copied, setCopied] = useState(false);

  const [checkBoxes, setCheckBoxes] = useState([
    {
      id: 1,
      title: "Include uppercase letters",
      state: false,
    },
    {
      id: 2,
      title: "Include lowercase letters",
      state: false,
    },
    {
      id: 3,
      title: "Include numbers",
      state: false,
    },
    {
      id: 4,
      title: "Include symbols",
      state: false,
    },
  ]);
  const getStrengthColor = () => {
    switch (passwordStrength) {
      case "Weak":
        return "red";
      case "Medium":
        return "orange";
      case "Strong":
        return "green";
      default:
        return "black";
    }
  };
  const handleCheckBox = (id) => {
    const newCheckBoxes = [...checkBoxes];
    newCheckBoxes[id - 1].state = !newCheckBoxes[id - 1].state;
    setCheckBoxes(newCheckBoxes);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  const { password, error, generatePassword, passwordStrength } =
    usePasswordGenerator();
  return (
    <div className="App">
      <div className="container">
        {password ? (
          <div className="header">
            <h3>{password}</h3>
            <button
              style={{ height: "33px" }}
              onClick={handleCopy}
              disabled={copied}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        ) : (
          <span style={{ color: "red" }}>{error}</span>
        )}
        <div className="charLength">
          <span className="charLengthSpan">
            <label>Password Length</label>
            <label>{charSize}</label>
          </span>
          <input
            className="slider"
            type="range"
            value={charSize}
            min={4}
            max={20}
            onChange={(e) => setCharSize(e.target.value)}
          />
        </div>
        <div className="checkBoxContainer">
          {checkBoxes.map((item) => {
            return (
              <div className="checkBox" key={item.id}>
                <input
                  type="checkbox"
                  checked={item.state}
                  onChange={() => handleCheckBox(item.id)}
                />
                <label>{item.title}</label>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: "15px" }}>
          Strength:{" "}
          <span style={{ color: getStrengthColor() }}>{passwordStrength}</span>
        </div>
        <button
          className="generateBtn"
          onClick={() => generatePassword(checkBoxes, charSize)}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}
