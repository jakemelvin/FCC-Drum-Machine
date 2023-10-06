import React from "react";
import "./index.css";
import Key from "./Components/Key";
export default function App() {
  const [power, setPower] = React.useState(false);
  const [volume, setVolume] = React.useState(1);
  const [textInput, setTextInput] = React.useState("");
  const mapSounds = [
    {
      value: "Q",
      sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
      soundName: "Heater 1",
    },
    {
      value: "W",
      sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
      soundName: "Heater 2",
    },
    {
      value: "E",
      sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
      soundName: "Heater 3",
    },
    {
      value: "A",
      sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
      soundName: "Heater 4",
    },
    {
      value: "S",
      sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
      soundName: "Clap",
    },
    {
      value: "D",
      sound: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
      soundName: "Open HH",
    },
    {
      value: "Z",
      sound: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
      soundName: "Kick n' Hat",
    },
    {
      value: "X",
      sound: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
      soundName: "Kick",
    },
    {
      value: "C",
      sound: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
      soundName: "Closed HH",
    },
  ];
  const [keyArray, setKeyArray] = React.useState([
    {
      value: "",
      sound: "",
      soundName: "",
    },
  ]);
  React.useEffect(() => {
    setKeyArray(mapSounds);
  });
  function ecrireText(text) {
    if (power) {
      setTextInput("");
      document.getElementById("display").innerText = "";
    } else {
      document.getElementById("display").innerText = text;
      setTextInput(text);
    }
  }
  function eteindreLumiere() {
    setTextInput("");
    if (!power) {
      setVolume(0);
    } else {
      setVolume(1);
    }
    setPower((prevState) => !prevState);
  }

  let keysList = keyArray.map((key) => {
    return (
      <Key
        className="drum-pad"
        key={key.value}
        value={key.value}
        sound={key.sound}
        soundName={key.soundName}
        volume={volume}
        changeText={ecrireText}
        power={power}
      />
    );
  });
  return (
    <main>
      <div className="body">
        <div className="titre">
          JTM <i class="fa-solid fa-computer"></i>
        </div>
        <div className="conteneur-fonction">
          <div className="clavier" id="drum-machine">
            {keysList}
          </div>
          <div className="fonctions">
            <div className="power-slider">
              <p>Power</p>
              <div className="slider" onClick={eteindreLumiere}>
                <div className={!power ? "pointer eteind" : "pointer"}></div>
              </div>
            </div>
            <div type="text" className="info" id="display">
              {textInput}
            </div>
            <div className="volume-slider">
              <div className="volume-bar">
                {power ? (
                  <input
                    type="range"
                    step="0.01"
                    onChange={(e) => setVolume(e.target.value)}
                    value={volume}
                    min="0"
                    max="1"
                    className="volume-bar"
                    disabled
                  />
                ) : (
                  <input
                    type="range"
                    step="0.01"
                    onChange={(e) => setVolume(e.target.value)}
                    value={volume}
                    min="0"
                    max="1"
                    className="volume-bar"
                  />
                )}
              </div>
            </div>
            <div className="power-slider bank">
              <p>Bank</p>
              <div className="slider">
                <div className="pointer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
