import React, { Component } from "react";
import "./esti_budget.css";
import { Input, Slider } from "antd";
import MyButton from "../utils/button";
import { connect } from "react-redux";
import { setFormData } from "../../redux/actions/actionFiles/form_Action";

class EsimateBudget extends Component {
  state = {
    estimated_amount: 56000,
    space_type: "",
    step: 10000,
    properformate: "",
    validateSec: false
  };

  kFormatter(num) {
    let properformate =
      Math.abs(num) > 999
        ? "$" + Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
        : Math.sign(num) * Math.abs(num);
    this.setState({ properformate });
  }
  MFormatter(num) {
    let properformate =
      Math.abs(num) > 999999
        ? "$" + Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + "M"
        : Math.sign(num) * Math.abs(num);
    this.setState({ properformate });
  }
  onChange = value => {
    let step = 0;
    if (value > 100000) {
      step = 50000;
    } else if (value > 50000) {
      step = 10000;
    } else if (value > 25000) {
      step = 5000;
    } else step = 1000;

    this.setState(
      { step: step, estimated_amount: value, validateSec: true },
      () => {
        if (value > 999999) {
          this.MFormatter(value);
        } else {
          this.kFormatter(value);
        }
      }
    );
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.space_type !== nextProps.formData.space_type) {
      const {
        estimated_amount,
        properformate,
        space_type,
        validateSec
      } = nextProps.formData;
      if (estimated_amount) {
        return {
          ...prevState,
          estimated_amount,
          properformate,
          space_type,
          validateSec
        };
      } else {
        return {
          ...prevState,
          estimated_amount:56000,
          properformate,
          space_type,
          validateSec
        };
      }
    }
    return prevState;
  }
  handleMainOk = () => {
    const { estimated_amount, properformate, validateSec } = this.state;
    this.props.sendFrom({ estimated_amount, properformate, validateSec });
    this.props.changeScr("next");
  };
  MianMainBack = () => {
    const { estimated_amount, properformate, validateSec } = this.state;
    this.props.sendFrom({ estimated_amount, properformate, validateSec });
    this.props.changeScr("pre");
  };
  render() {
    const { estimated_amount, step, properformate, validateSec } = this.state;
    return (
      <div className="detail_f">
        <div className="detail_c">
          <p className="title-c Slider-h">I am estimating a total budget of:</p>

          <p className="detail-pt Slider-p">
            Provide us with your best estimate for your entire project (we can
            adjust later). Your budget should represent the full scope of your
            project, including design and renovation services, furniture, and
            decor.
          </p>

          <div className="Slider_info">
            {properformate ? (
              <Input
                disabled
                min={5000}
                className="inputNum"
                max={1000000}
                in
                value={properformate}
                onChange={this.onChange}
              />
            ) : (
              <p className="Slider-Ad">Adjust the Slider to begin </p>
            )}
            <div className="slider-con">
              <Slider
                min={5000}
                max={1005000}
                step={step}
                onChange={this.onChange}
                onAfterChange={this.onAfterChange}
                value={
                  typeof estimated_amount === "number" ? estimated_amount : 0
                }
              />
              <div className="bootom_limit">
                <p className="detail-pt">5K</p>
                <p className="detail-pt">1M</p>
              </div>
            </div>
          </div>
          <MyButton
            handleBtnBack={() => this.MianMainBack()}
            handleNext={() => this.handleMainOk()}
            disablelity={!validateSec}
            validateBlack={validateSec}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(EsimateBudget);
// project_info: '',
// estimated_amount: '500000',
// space_type: '0',
// news: 'A Friend',
// area: '1,500 - 2,000',
// degree_renovation: '1'

// 5k - 25k in 1k increments
// 25k - 50k in 5k increments
// 50k - 100k in 10k increments 100k - 1M + in 50k increments
