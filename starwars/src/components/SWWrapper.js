import React from "react";
import SWCard from "./SWCard";
import { WrapperDiv } from "../styles/styles";

const SWWrapper = props => {
  const renderCards = arr => {
    return arr.map((card, index) => {
      return <SWCard key={index} data={card} />;
    });
  };

  return (
    <>
      <WrapperDiv>
        {console.log(props.data)}
        {props.data ? renderCards(props.data.results) : null}
      </WrapperDiv>
      <div>
        <button onClick={() => props.callback(props.data.previous)}>
          Previous
        </button>
        <button onClick={() => props.callback(props.data.next)}>Next</button>
      </div>
    </>
  );
};

export default SWWrapper;
