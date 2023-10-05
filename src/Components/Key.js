import useSound from "use-sound";
import "../index.css";
import React from "react";
export default function Key(props) {
  const [active, setActive] = React.useState(false);
  React.useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [props]);
  function handleKeyPress(event) {
    if (event.key.toLowerCase() == props.value.toLowerCase()) {
      playSound();
      props.changeText(props.soundName);
    }
  }
  async function playSound() {
    setActive(true);
    props.changeText(props.soundName);
    setTimeout(() => setActive(false), 200);
    const audio = document.getElementById(`${props.value}`);
    audio.currentTime = 0;
    audio.volume = props.volume;
    props.changeText(props.soundName);
    await audio.play().catch(console.error);
  }
  let className = "key";
  if (props.power) {
    className = "keys unpressed";
  } else if (props.power && active) {
    className = "keys unpressed active";
  } else if (!props.power) {
    className = "key";
  } else if (!props.power && active) {
    className = "key pressed";
  }
  return (
    <div
      className={
        props.power
          ? `drum-pad keys unpressed ${active && "shallow"}`
          : `drum-pad key ${active && "pressed"}`
      }
      onClick={playSound}
      id={"key " + props.value}
    >
      <audio src={props.sound} id={props.value} className="clip" />
      {props.value}
    </div>
  );
}
