import React from "react";
import { Modal, Button, Checkbox, Icon, Radio } from "antd";
import "./buildModal.css";
import "./renovationbtn.css";

import MyButton from "../../utils/button";
import LocationRenoModel from "./locationReno/locationRenoModel";
import ButtonModal from "./btnModel/ButtonModal";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
export default class BuildModal extends React.Component {
  render() {
    const {
      Buildloading,
      Buildvisible,
      handleCancleBuild,
      handleOkBuild,
      buidcheckedListOption,
      buidcheckedList,
      onChangeSlectBuild,
      onChangeBuitChecl,
      title,
      innerTitle,
      SetIntialState,
      downText,
      degree_renovation,
      showpre,
      disablebuild,
      showFbtn,
      btnvalidate,
      showFbtnTwo,
      handleBtnBack,
      locationScreen,
      handleNextbtnTolocation,
      buildSecValidate,
      
    } = this.props;
    return (
      <div>
        <Modal
          className="mycostom"
          visible={Buildvisible}
          title={title}
          onOk={handleOkBuild}
          onCancel={handleCancleBuild}
          footer={[
            showFbtn && (
              <Button
                key="NEXT"
                type="primary"
                className={
                  !buildSecValidate ? "btnbuild a2" : "btnbuild a2 backvalidate"
                }
                disabled={!buildSecValidate}
                onClick={handleOkBuild}
              >
                Next
              </Button>
            ),
            showFbtnTwo && (
              <div>
                <MyButton
                  withoutMargin={true}
                  disablelity={!btnvalidate}
                  validateBlack={btnvalidate}
                  handleNext={handleNextbtnTolocation}
                  handleBtnBack={handleBtnBack}
                />
              </div>
            )
          ]}
        >
          <SimpleBar style={{ maxHeight: 430 }}>
            <div
              className={
                showFbtn || showFbtnTwo ? "modalbody" : "modalbody hightincress"
              }
            >
              {showpre ? (
                <div>
                  {" "}
                  <p className="headingbuild">{innerTitle}</p>
                  <p class="small-msg">{downText}</p>
                  {showFbtn && (
                    <div className="checkboxcon">
                      {buidcheckedListOption.map((value, index) => {
                        return (
                          <Checkbox
                            onChange={e => onChangeBuitChecl(e, index)}
                            checked={
                              buidcheckedListOption[index][3].value === 1
                                ? true
                                : false
                            }
                            name={value[2]}
                            value={value[2]}
                            key={index}
                          >
                            <p className="optionMain"> {value[0]} </p>
                            <p className="optionNot"> {value[1]} </p>
                          </Checkbox>
                        );
                      })}
                      <p
                        className="renoinfo small-msg"
                        onClick={() => SetIntialState()}
                      >
                        {" "}
                        I dont plan to do any Interior design work{" "}
                      </p>
                    </div>
                  )}
                  {!showFbtn && (
                    <div
                      defaultValue={
                        buidcheckedList.length > 0 ? buidcheckedList : null
                      }
                     
                      className="radioCont checkboxcon"
                    >
                      {buidcheckedListOption.map((value, index) => {
                        return (
                          <Button  className={index===degree_renovation?"simpleRadioBtn sleectecd" :"simpleRadioBtn"}  onClick={()=>onChangeSlectBuild(index)} value={value[0]} key={index}>
                            <div className="radiodev-as">
                              <p className="optionMain"> {value[0]} </p>
                              <p className="optionNot"> {value[1].slice(0,41)} </p>
                              <p style={{marginTop:"-7px"}} className="optionNot"> {value[1].slice(41)} </p>

                            </div>
                          </Button>
                        );
                      })}
                    </div>
                  )}
                  {!showFbtn && (
                    <p className="renoinfo small-msg" onClick={SetIntialState}>
                      {" "}
                      I dont plan to do any renovation work{" "}
                    </p>
                  )}
                </div>
              ) : // location screen
              locationScreen ? (
                <LocationRenoModel {...this.props} />
              ) : (
                <ButtonModal {...this.props} />
              )}
            </div>
          </SimpleBar>
        </Modal>
      </div>
    );
  }
}

// <div class='fsc-content'>
// 							<p  class='subtitle planning' style="color: black;font-weight: 500;">What design support do you need?</p>
// 							<p class='small-msg'>Select all that apply</p>

// 						<div class='checkbox-container hoveradd' style='margin-top : 10px;'>
// 							<label class="container interiorLabel">Interior Finishes
// 								<input type="checkbox" class='cb id-cb' id='s4-interior-finishes'>
// 								<span class="checkmark"></span>
// 							</label>
// 						</div>
// 						<div class='checkbox-container hoveradd'>
// 							<label class="container interiorLabel">Art Selection
// 								<input type="checkbox" class='cb id-cb' id='s4-art-selection'>
// 								<span class="checkmark"></span>
// 							</label>
// 						</div>
// 						<div class='checkbox-container hoveradd'>
// 							<label class="container interiorLabel">Style Guidance
// 								<input type="checkbox" class='cb id-cb' id='s4-style-guidance'>
// 								<span class="checkmark"></span>
// 							</label>
// 						</div>
// 						<div class='checkbox-container hoveradd'>
// 							<label class="container interiorLabel">Furniture Selection
// 								<input type="checkbox" class='cb id-cb' id='s4-furniture-selection'>
// 								<span class="checkmark"></span>
// 							</label>
// 						</div>
// 						<p class='subtitle u pointer' id='id-do-nothing'>I dont plan on working with a designer for my project</p>
// 					</div>
