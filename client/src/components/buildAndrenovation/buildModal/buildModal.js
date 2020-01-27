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
      title,
      innerTitle,
      SetIntialState,
      downText,
      showpre,
      showFbtn,
      btnvalidate,
      showFbtnTwo,
      handleBtnBack,
      locationScreen,
      handleNextbtnTolocation,
      buildSecValidate
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
                    <div>
                      <Checkbox.Group
                        defaultValue={buidcheckedList}
                        onChange={onChangeSlectBuild}
                      >
                        {buidcheckedListOption.map((value, index) => {
                          return (
                            <Checkbox value={value[2]} key={index}>
                              <p className="optionMain"> {value[0]} </p>
                              <p className="optionNot"> {value[1]} </p>
                            </Checkbox>
                          );
                        })}
                      </Checkbox.Group>
                      <p
                        className="renoinfo small-msg"
                        onClick={() => SetIntialState("asdfasd")}
                      >
                        {" "}
                        I dont plan to do any Interior design work{" "}
                      </p>
                    </div>
                  )}
                  {!showFbtn && (
                    <Radio.Group
                      defaultValue={buidcheckedList}
                      onChange={onChangeSlectBuild}
                      className="radioCont"
                    >
                      {buidcheckedListOption.map((value, index) => {
                        return (
                          <Radio.Button value={value[0]} key={index}>
                            <div className="radiodev-as">
                              <p className="optionMain"> {value[0]} </p>
                              <p className="optionNot"> {value[1]} </p>
                            </div>
                          </Radio.Button>
                        );
                      })}
                    </Radio.Group>
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
