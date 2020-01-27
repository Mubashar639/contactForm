import React, { Component } from "react";
import { Button } from "antd";

export default class ButtonModal extends Component {
  render() {
    const { btnArray,onClickBtn } = this.props;
    return (
      <div className="btntab">
        {btnArray.map((value, index) => {
          return (
            <div key={index}>
              <p name={value.key} className="headingbuild">
                {value.text1}
              </p>
              <p className="optionNot forp"> {value.text2} </p>
              <div className="btnRenoBuild">
                <Button  name={value.key} onClick={(e)=>onClickBtn(e,index)} value={1} className={value.value==1?"innerbtn-r a bdblack":"innerbtn-r a"}>
                  yes
                </Button>
                <Button name={value.key} onClick={(e)=>onClickBtn(e,index)} value={0} className={value.value!=="" && value.value=="0"? "innerbtn-r b bdblack":"innerbtn-r b"}>
                  no
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
