import React from "react";
import ReactCardFlip from "react-card-flip";
import "./FlipCard.css";

function FlipCard(props) {
  return (
    <ReactCardFlip isFlipped={props.flip} >
      <img name={props.config.name} title={props.config.title} src={props.config.frontImage} onClick={props.handleClick} height={200} width={200} />
      <img name={props.config.name} title={props.config.title} src={props.config.backImage} onClick={props.handleClick} height={200} width={200} />
    </ReactCardFlip>
  );
}

export default FlipCard;