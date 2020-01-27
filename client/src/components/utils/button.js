import React, { Component } from "react";
import "./button.css";
import { Button } from "antd";

export default class MyButton extends Component {
  render() {
    const {
      withoutMargin,
      handleBtnBack,
      handleNext,
      validateBlack,
      disablelity
    } = this.props;
    return (
      <div className={!withoutMargin ? "btn_divform" : "withoutMargin"}>
        <Button onClick={handleBtnBack} className="btnform2 a1">
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={disablelity}
          className={validateBlack ? "btnform2 a2 backvalidate" : "btnform2 a2"}
        >
          Next
        </Button>
      </div>
    );
  }
}
