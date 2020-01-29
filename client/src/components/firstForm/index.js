import React, { Component } from "react";
import "./index.css";
import { Select, Alert } from "antd";
import { setFormData } from "../../redux/actions/actionFiles/form_Action";
import { connect } from "react-redux";

const { Option } = Select;
class Firstform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commercialOption: ["Office", "Retail", "Restaurant or Hospaitality"],
      Commercial: "",
      residance: 0,
      space_type: "",
      email: "",
      firstName: ""
    };
  }
  onChange = Commercial => {
    let space_type = 0;
    if (Commercial === "Office") {
      space_type = 1;
    } else if (Commercial === "Retail") {
      space_type = 2;
    } else {
      space_type = 3;
    }
    this.setState({ Commercial, space_type }, this.SendDataAndContinue);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.formData.space_type !== "" &&
      prevState.email !== nextProps.formData.email &&
      nextProps.formData.Commercial === ""
    ) {
      const {
        Commercial,
        space_type,
        residance,
        email,
        
      } = nextProps.formData;
      return {
        ...prevState,
        space_type,
        residance,
        email,
      };
    } else if (
      nextProps.formData.Commercial &&
      nextProps.formData.Commercial !== prevState.Commercial &&
      prevState.email !== nextProps.formData.email
    ) {

      const {
        Commercial,
        space_type,
        residance,
        email,
      } = nextProps.formData;
      return {
        ...prevState,
        space_type,
        residance,
        Commercial,
        email,
      };
    }
    return prevState;
  }
  handleResideance = () => {
    this.setState(
      {
        residance: 1,
        space_type: 0
      },
      this.SendDataAndContinue
    );
  };

  componentDidMount(){
    if(this.props.formData.firstName){
      this.setState({
        firstName:this.props.formData.firstName
      })
    }
  }

  SendDataAndContinue = () => {
    const { Commercial, residance, space_type } = this.state;
    if (Commercial == "") {
      this.props.sendFrom({ space_type, residance, Commercial: "" });
    } else {
      this.props.sendFrom({ space_type, Commercial, residance: 0 });
    }

    this.props.changeScr("next");
  };
  render() {
    const { commercialOption, Commercial, space_type, firstName } = this.state;
    return (
      <div className="first_f">
        <div className="text-form">
          <p className="text_title">Welcome to Homepolish, 
          <span style={{textTransform:"capitalize"}}>{" "+firstName}</span></p>
          <p className="text_sub">
            Start by telling us about your project. The information you provide
            will help us tailor our service and professionals to our need
          </p>
        </div>
        <div className="form_c">
          <p className="title-c myforst">My Space is a </p>
          <div className="btn_div">
            <button
              className={space_type === 0 ? "asbtnblack" : null}
              onClick={this.handleResideance}
            >
              Residence
            </button>
            <Select
              name="Commercial"
              className={
                space_type > 0
                  ? "selectCommerial asbtnblack"
                  : "selectCommerial"
              }
              defaultValue={Commercial === "" ? "Commercial" : Commercial}
              onChange={this.onChange}
            >
              {commercialOption.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
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

export default connect(mapStateToProps, mapDispatchToProps)(Firstform);
