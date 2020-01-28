import React, { Component } from "react";
import "./index.css";
import "./reposive.css";
import "../addressForm/address.css";
import { Icon } from "antd";
import MyButton from "../utils/button";
import BuildModel from "./buildModal/buildModal";
import ConfirmModel from "../utils/corfirmModel";
import { alldata } from "./data/alldata";
import { connect } from "react-redux";

import { setFormData } from "../../redux/actions/actionFiles/form_Action";
class BuildAndReno extends Component {
  state = {
    ...alldata
  };

  handleRenoBtn = (e, index) => {
    if (e.target.name === "structural_changes" && e.target.value == 1) {
      const { btnArray } = this.state;
      if (btnArray.length === 2) {
        btnArray.push({
          text1:
            "In case of structural changes, have you already contacted an architect",
          text2: "",
          key: "contacted_before",
          value: ""
        });
      }
      btnArray[index].value = Number(e.target.value);
      this.setState(
        {
          [e.target.name]: Number(e.target.value),
          btnArray
        },
        this.btnRenoValidate
      );
    } else {
      let { btnArray } = this.state;
      if (
        e.target.name === "structural_changes" &&
        e.target.value == 0 &&
        btnArray.length > 2
      ) {
        btnArray = btnArray.slice(0, 2);
      }
      btnArray[index].value = Number(e.target.value);

      this.setState(
        {
          [e.target.name]: Number(e.target.value),
          btnArray
        },
        this.btnRenoValidate
      );
    }
  };
  btnRenoValidate = () => {
    const {
      btnArray,
      want_connection,
      structural_changes,
      contacted_before
    } = this.state;
    if (
      btnArray.length === 2 &&
      want_connection !== "" &&
      structural_changes !== ""
    ) {
      this.setState({
        btnvalidate: true
      });
    } else if (
      btnArray.length === 3 &&
      want_connection !== "" &&
      structural_changes !== "" &&
      contacted_before !== ""
    ) {
      this.setState({
        btnvalidate: true
      });
    } else {
      this.setState({ btnvalidate: false });
    }
  };

  handleVisibleChange = (visible, index) => {
    const { locationArray } = this.state;
    locationArray[index].visible = visible;
    this.setState({ locationArray });
  };

  handleIncrease = (value, index) => {
    const { locationArray } = this.state;
    locationArray[index].value = ++locationArray[index].value;
    this.setState({
      locationArray
    });
  };
  checkValidationRenoPart = () => {
    const {
      entire_location,
      living_rooms,
      bed_rooms,
      dining_rooms,
      kitchens,
      bathrooms,
      entryways,
      offices,
      kids,
      outdoor,
      other
    } = this.state;
    if (
      entire_location ||
      living_rooms ||
      bed_rooms ||
      dining_rooms ||
      kitchens ||
      bathrooms ||
      entryways ||
      offices ||
      kids ||
      outdoor ||
      other
    ) {
      this.setState({ renoPartValidate: true });
    } else {
      this.setState({ renoPartValidate: false });
    }
  };
  handleOkLocation = (value, index, e) => {
    const { locationArray } = this.state;
    const attr = locationArray[index].attr;
    if (value === "cancle") {
      locationArray[index].visible = false;
      return this.setState({
        locationArray
      });
    }
    if (value !== "cross") {
      const items = locationArray[index].value;
      locationArray[index].set = items;
      locationArray[index].visible = false;

      this.setState(
        {
          [attr]: items,
          locationArray
        },
        this.checkValidationRenoPart
      );
    } else {
      e.stopPropagation();

      locationArray[index].set = 0;
      locationArray[index].value = 0;
      this.setState(
        {
          [attr]: 0,
          locationArray
        },
        this.checkValidationRenoPart
      );
    }
  };
  handleDecrease = (value, index) => {
    const { locationArray } = this.state;
    if (locationArray[index].value > 0) {
      locationArray[index].value = --locationArray[index].value;
      this.setState({
        locationArray
      });
    }
  };
  // " I dont plan to do any renovation work";
  onChangeSlectBuild = buidcheckedList => {
    if (buidcheckedList.length > 0) {
      this.setState({
        buidcheckedList,
        buildSecValidate: true
      });
    } else {
      this.setState({
        buidcheckedList: [],
        buildSecValidate: false
      });
    }
  };

  onChangeSlectReno = e => {
    this.setState({
      renoCheckedList: e.target.value,
      BtnReno: true,
      showModalReno: false,
      degree_renovation: e.target.value
    });
  };
  showModalBuid = () => {
    this.setState({
      Buildvisible: true
    });
  };
  showModalReno = () => {
    this.setState({
      showModalReno: true
    });
  };
  handleOkReno = () => {
    this.setState({ renoloading: true });
    setTimeout(() => {
      this.setState({ renoloading: false, showModalReno: false });
    }, 3000);
  };
  handleOkBuild = () => {
    if (this.state.buildSecValidate) {
      const artselection = {
        interior_finishes: 0,
        art_selection: 0,
        style_guidance: 0,
        furniture_selection: 0
      };
      this.state.buidcheckedList.map(value => {
        artselection[value] = 1;
        this.setState(
          {
            ...artselection,
            [value]: 1,
            Buildvisible: false,
            buildScreenOverAllValidate: true
          },
          () => console.log(this.state)
        );
      });
    }
  };
  handleOkBtn = () => {
    this.setState({ showModalReno: false });
  };

  handleCancleBuild = () => {
    this.setState({ Buildvisible: false });
  };
  handleCancleReno = () => {
    this.setState({ showModalReno: false });
  };
  handleBtnBackToReno = () => {
    this.setState({ BtnReno: false, showModalReno: true });
  };
  handleBtnCancle = () => {
    this.setState({ BtnReno: false });
  };
  handleLocationCancle = () => {
    this.setState({ locationVisiable: false });
  };
  handleLocationback = () => {
    this.setState({ locationVisiable: false, BtnReno: true });
  };
  handleNextbtnTolocation = () => {
    this.setState({ locationVisiable: true, BtnReno: false });
  };
  onChangeEntireLocation = entireLocation => {
    this.setState(
      {
        entire_location: entireLocation.key + " sq. ft."
      },
      this.checkValidationRenoPart
    );
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.formData.renovationScreenOverAllValidate &&
      nextProps.formData.renovationScreenOverAllValidate !== "" &&
      prevState.renovationScreenOverAllValidate !==
        nextProps.formData.renovationScreenOverAllValidate &&
      prevState.space_type !== nextProps.formData.space_type
    ) {
      return {
        ...prevState,
        ...nextProps.formData,
        checkWarning: false
      };
    }
    return prevState;
  }
  onCancelEntireLocation = entireLocation => {
    this.setState(
      {
        entire_location: 0
      },
      this.checkValidationRenoPart
    );
  };
  onOKLocation = () => {
    if (this.state.renoPartValidate) {
      this.setState({
        renovationScreenOverAllValidate: true,
        locationVisiable: false
      });
    } else {
      this.setState({
        renovationScreenOverAllValidate: false
      });
    }
  };
  SetIntialStateBuild = () => {
    this.setState({
      Buildvisible: false,
      buidcheckedList: [],
      interior_finishes: 0,
      art_selection: 0,
      style_guidance: 0,
      furniture_selection: 0,
      buidcheckedListOption: [
        [
          "Interior Finishes",
          "(Sourcing material for a renovation)",
          "interior_finishes"
        ],
        ["Art Selection", "(Finding the right pieces)", "art_selection"],
        ["Style Guidance", "(Bring it all togather)", "style_guidance"],
        ["Furniture Selection", "(Choosing new piesces)", "furniture_selection"]
      ],
      buildScreenOverAllValidate: false,

      showModalReno: false
    });
  };
  onConfrim = () => {
    this.setState({
      confirm: false,
      Buildvisible: true
    });
  };
  onCancleConfrim = () => {
    this.setState({
      confirm: false
    });
  };
  SetIntialStateReno = () => {
    this.setState({
      renoloading: false,
      showModalReno: false,
      renoCheckedList: [],
      renoCheckedListOption: [
        ["light", "(Painting walls & installing bookcases)"],
        [
          "medium",
          "(Small bathroom upgrades, kitchen cabinet refreshes, new flooring)"
        ],
        ["gut", "(Knocking down walls, changing bathroom or kitchen layout)"],
        ["new build", "(Building from the ground up)"]
      ],
      renoBtnloading: false,
      BtnReno: false,

      btnArray: [
        {
          text1: "Would you like to be contacted to contractor",
          text2: "",
          key: "want_connection",
          value: ""
        },
        {
          text1: "Are you planning any structural changes",
          text2: "(Knocking down walls)",
          key: "structural_changes",
          value: ""
        }
      ],
      locationloading: false,
      locationVisiable: false,

      want_connection: "",
      structural_changes: "",
      contacted_before: "",
      btnvalidate: false,

      entire_location: 0,
      living_rooms: 0,
      bed_rooms: 0,
      dining_rooms: 0,
      kitchens: 0,
      bathrooms: 0,
      entryways: 0,
      offices: 0,
      kids: 0,
      outdoor: 0,
      other: 0,
      degree_renovation: "",
      renovationScreenOverAllValidate: false,
      renoPartValidate: false,

      locationArray: [
        {
          title: "living rooms",
          value: 0,
          attr: "living_rooms",
          set: 0,
          visible: false
        },
        {
          title: "bed rooms",
          value: 0,
          attr: "bed_rooms",
          set: 0,
          visible: false
        },
        {
          title: "dining rooms",
          value: 0,
          attr: "dining_rooms",
          set: 0,
          visible: false
        },
        {
          title: "kitchens",
          value: 0,
          attr: "kitchens",
          set: 0,
          visible: false
        },
        {
          title: "bathrooms",
          value: 0,
          attr: "bathrooms",
          set: 0,
          visible: false
        },
        {
          title: "entryways",
          value: 0,
          attr: "entryways",
          set: 0,
          visible: false
        },
        {
          title: "offices",
          value: 0,
          attr: "offices",
          set: 0,
          visible: false
        },
        {
          title: "kids",
          value: 0,
          attr: "kids  / nursery",
          set: 0,
          visible: false
        },
        {
          title: "outdoor / foyar",
          value: 0,
          attr: "outdoor",
          set: 0,
          visible: false
        },
        {
          title: "other",
          value: 0,
          attr: "other",
          set: 0,
          visible: false
        }
      ],
      entireLocationOption: [
        "Below 500",
        "500 - 1,000",
        "1,000 - 1,500",
        "Above 1,500"
      ]
    });
  };

  handleNextScreen = () => {
    if (!this.state.checkWarning && !this.state.buildScreenOverAllValidate) {
      this.setState({
        confirm: true,
        checkWarning: true
      });
    } else {
      this.props.sendFrom({
        ...this.state
      });
      this.props.changeScr("next");
    }
  };
  render() {
    const {
      Buildloading,
      Buildvisible,
      buidcheckedListOption,
      buidcheckedList,
      renoloading,
      showModalReno,
      renoCheckedList,
      renoCheckedListOption,
      Btnloading,
      BtnReno,
      btnArray,
      locationloading,
      locationVisiable,
      locationArray,
      btnvalidate,
      renoPartValidate,
      entire_location,
      entireLocationOption,
      renovationScreenOverAllValidate,
      handleOkBuild,
      buildScreenOverAllValidate,
      buildSecValidate
    } = this.state;
    return (
      <div className="build-f">
        <div className="buildfrom">
          <div className="intermadiaterole">
            <div className="buildTop-t">
              <p className="buildtitle-2"> I need:</p>
              <p className="buildsubtitle-2">
                Select one or more services we can provide for your project
              </p>
            </div>
            <div className="buildModel">
              {/* this is for build screen */}
              <BuildModel
                Buildloading={Buildloading}
                Buildvisible={Buildvisible}
                handleCancleBuild={this.handleCancleBuild}
                handleOkBuild={this.handleOkBuild}
                buidcheckedListOption={buidcheckedListOption}
                buidcheckedList={buidcheckedList}
                onChangeSlectBuild={this.onChangeSlectBuild}
                buildSecValidate={buildSecValidate}
                title="interior design"
                showFbtn={true}
                SetIntialState={this.SetIntialStateBuild}
                showpre={true}
                innerTitle="What design support do you need?"
                downText="Select all that apply"
              />
              {/* this is for renovation */}
              <BuildModel
                Buildloading={renoloading}
                Buildvisible={showModalReno}
                handleCancleBuild={this.handleCancleReno}
                handleOkBuild={this.handleOkReno}
                buidcheckedListOption={renoCheckedListOption}
                buidcheckedList={renoCheckedList}
                onChangeSlectBuild={this.onChangeSlectReno}
                title="BUILD AND RENOVATION"
                showpre={true}
                SetIntialState={this.SetIntialStateReno}
                showFbtn={false}
                innerTitle="Which degree of renovations are you planning"
                downText=""
              />
              {/* this.is for bbtn screen */}

              <BuildModel
                Buildloading={Btnloading}
                Buildvisible={BtnReno}
                handleCancleBuild={this.handleBtnCancle}
                handleOkBuild={this.handleOkBtn}
                showpre={false}
                showFbtnTwo={true}
                handleBtnBack={this.handleBtnBackToReno}
                handleNextbtnTolocation={this.handleNextbtnTolocation}
                btnArray={btnArray}
                btnvalidate={btnvalidate}
                onClickBtn={this.handleRenoBtn}
                title="BUILD AND RENOVATION"
                innerTitle="Which degree of renovations are you planning"
                downText=""
              />
              {/* this is for select location  */}

              <BuildModel
                Buildloading={locationloading}
                Buildvisible={locationVisiable}
                handleCancleBuild={this.handleLocationCancle}
                locationScreen={true}
                handleBtnBack={this.handleLocationback}
                locationArray={locationArray}
                handleIncrease={this.handleIncrease}
                handleDecrease={this.handleDecrease}
                handleOkLocation={this.handleOkLocation}
                handleVisibleChange={this.handleVisibleChange}
                entire_location={entire_location}
                onChangeEntireLocation={this.onChangeEntireLocation}
                onCancelEntireLocation={this.onCancelEntireLocation}
                handleNextbtnTolocation={this.onOKLocation}
                // onClickBtn={this.HandleOnClick}
                showFbtnTwo={true}
                btnvalidate={renoPartValidate}
                title="BUILD AND RENOVATION"
                entireLocationOption={entireLocationOption}
                innerTitle="What spaces do you want to renovate?"
                downText="Select the rooms you want to focus on.
                 The more specific you are, the better we can
                  choose a Designer who excels with those spaces."
              />
            </div>
            <ConfirmModel
              visible={this.state.confirm}
              OnYes={this.onConfrim}
              OnCancle={this.onCancleConfrim}
            />
            <div className="lowerpart">
              <div
                className="a btnalso BuildSection"
                onClick={this.showModalBuid}
              >
                <div className="header build">
                  <p className="tilte-ban">Interior Design</p>
                  {!buildScreenOverAllValidate ? (
                    <Icon type="plus" />
                  ) : (
                    <Icon type="check" style={{ color: "green" }} />
                  )}
                </div>
                {!buildScreenOverAllValidate && (
                  <div className="innerItembuild">
                    <p>
                      We'll select a designer who best complements you and your
                      needs and be your advocate throughout the shopping
                      process. Have a specific designer in mind. We'll do our
                      best to match you with them.
                    </p>
                  </div>
                )}
              </div>
              <div
                className=" btnalso renovaionSection"
                onClick={this.showModalReno}
              >
                <div className="header build">
                  <p className="tilte-ban">renovation</p>
                  {!renovationScreenOverAllValidate ? (
                    <Icon type="plus" />
                  ) : (
                    <Icon type="check" style={{ color: "green" }} />
                  )}
                </div>
                {!renovationScreenOverAllValidate && (
                  <div className="innerItembuild">
                    <p className="hieghtequal">
                      Whether it's a light renovation or a full remodel, we'll
                      introduce you to the right construction specialists to
                      work hand-in-hand with you and your designer and provide
                      expert solutions and support.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="btncon">
            <MyButton
              handleBtnBack={() => this.props.changeScr("pre")}
              handleNext={() => this.handleNextScreen()}
              disablelity={!renovationScreenOverAllValidate}
              validateBlack={renovationScreenOverAllValidate}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  formData: state.form_data.form
});

const mapDispatchToProps = dispatch => ({
  sendFrom: data => dispatch(setFormData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(BuildAndReno);
// zip: 'qwer',
// phone: 'asdfjlk',
// address: 'qerfsdfasdf',
// interior_finishes: '0',
// art_selection: '1',
// style_guidance: '0',
// furniture_selection: '0',
// want_connection: '0',
// structural_changes: '1',
// contacted_before: '0',
// entire_location: '',
// living_rooms: '',
// bed_rooms: '4',
// dining_rooms: '',
// kitchens: '',
// bathrooms: '',
// entryways: '',
// offices: '',
// kids: '',
// outdoor: '',
// project_info: '',
// estimated_amount: '500000',
// space_type: '0',
// news: 'A Friend',
// area: '1,500 - 2,000',
// degree_renovation: '1'

{
  /* <div class='form-sub-container' id='stage-3'>
<p class='title'>I need:</p>
<p class='subtitle'>Select one or more services we can provide for your project</p>
<div class='input-container'>
    <div class='mini-content-container' id='view-stage-4'>
    <div class="interiorDesign">
        <p class='mcc-title'>Interior Design </p>
        <p  id='interior-design-status'>+</p>
        </div>
        <p class='subas'>
            We'll select a designer who best complements you and your needs and be your advocate throughout the shopping process. Have a specific designer in mind. We'll do our best to match you with them.
        </p>
    </div>
    <div class='mini-content-container right' id='view-stage-5'>
            <div class="interiorDesign">
        <p class='mcc-title'>Renovation </p>
             <p  id='renovation-status'>+</p>        
             </div>
        <p class='subas'>
            We'll select a designer who best complements you and your needs and be your advocate throughout the shopping process. Have a specific designer in mind. We'll do our best to match you with them.
        </p>
    </div>
    <div class="linea"></div>
    <div class='input-container'>
        <input type='button' class='form-button' value='Back' id='back-stage-3'>
        <input type='button' class='form-button dark textStyle gray' value='Next' id='next-stage-3'>
    </div>
</div>
</div> */
}
