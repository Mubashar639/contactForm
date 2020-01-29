import React, { Component } from "react";
import "../addressForm/address.css";
import "../addressForm/reponsiveaddress.css";
import "./register.css";
import { Form, Input, Button, Select } from "antd";
import MyButton from "../utils/button";
import { connect } from "react-redux";
import { setFormData } from "../../redux/actions/actionFiles/form_Action";

const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

class Address extends Component {
  state = {
    email: "",
    emailIsValid: false,
    emailHelp: "",
    emailValidateStatus: "success",

    firstName: "",
    firstNameIsValid: false,
    firstNameHelp: "",
    firstNameValidateStatus: "success",

    lastName: "",
    lastNameIsValid: false,
    lastNameHelp: "",
    lastNameValidateStatus: "success"
  };

  onChangeValidator = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        if (value.trim() === "" || value.length < 2) {
          this.setState({
            [name]: value,
            [`${name}ValidateStatus`]: "error",
            [`${name}Help`]:
              name === "firstName"
                ? "A First Name is required to create an account"
                : "A Last Name is required to create an account",
            [`${name}IsValid`]: false
          });
        } else {
          this.setState({
            [name]: value,
            [`${name}ValidateStatus`]: "success",
            [`${name}Help`]: "",
            [`${name}IsValid`]: true
          });
        }
        break;
      case "email":
        if (!emailPattern.test(value)) {
          this.setState({
            [name]: value,
            [`${name}ValidateStatus`]: "error",
            [`${name}Help`]: "Please enter a valid email address",
            [`${name}IsValid`]: false
          });
        } else {
          this.setState({
            [name]: value,
            [`${name}ValidateStatus`]: "success",
            [`${name}Help`]: "",
            [`${name}IsValid`]: true
          });
        }
        break;
    }
  };

  handleChange = e => {
    this.onChangeValidator(e.target.name, e.target.value);
  };

  componentDidMount() {
    if (this.props.formData.email) {
      const {
        email,
        firstName,
        lastName,
        emailIsValid,
        lastNameIsValid,
        firstNameIsValid
      } = this.props;
      this.setState({
        email,
        firstName,
        lastName,
        emailIsValid,
        lastNameIsValid,
        firstNameIsValid
      });
    }
  }

  handleMainOk = () => {
    const {
      email,
      firstName,
      lastName,
      emailIsValid,
      lastNameIsValid,
      firstNameIsValid
    } = this.state;
    if (emailIsValid && firstNameIsValid && lastNameIsValid) {
      this.props.sendFrom({
        email,
        firstName,
        lastName,
        emailIsValid,
        lastNameIsValid,
        firstNameIsValid
      });
      this.props.changeScr("mext");
    }
  };

  render() {
    const {
      email,
      emailIsValid,
      emailHelp,
      emailValidateStatus,
      firstName,
      firstNameIsValid,
      firstNameHelp,
      firstNameValidateStatus,
      lastName,
      lastNameIsValid,
      lastNameHelp,
      lastNameValidateStatus
    } = this.state;
    return (
      <div className="SignupForm">
        <div className="SignupForm_inner">
          <div className="top-t sign">
            <p className="Signup">Create your project</p>
            <p className="subtitle-2address">
              Set up an account so we can match you with the perfect design
              team.
            </p>
          </div>

          <div className="form-a">
            <div className="input-container-a">
              <p className="form-label-a ">Email</p>
              <Form.Item
                validateStatus={emailValidateStatus}
                help={emailHelp}
                className="formItem"
              >
                <Input
                  type="email"
                  name="email"
                  onChange={this.handleChange}
                  value={email}
                  placeholder="Example@gmail.com"
                  className="inputStyle"
                />
              </Form.Item>
            </div>
            <div className="input-container-a">
              <p className="form-label-a">First Name</p>
              <Form.Item
                validateStatus={firstNameValidateStatus}
                help={firstNameHelp}
                className="formItem"
              >
                <Input
                  type="text"
                  name="firstName"
                  onChange={this.handleChange}
                  value={firstName}
                  placeholder="First Name"
                  className="inputStyle"
                />
              </Form.Item>
            </div>
            <div className="input-container-a">
              <p className="form-label-a">Last Name</p>
              <Form.Item
                validateStatus={lastNameValidateStatus}
                help={lastNameHelp}
                className="formItem"
              >
                <Input
                  type="text"
                  name="lastName"
                  onChange={this.handleChange}
                  value={lastName}
                  placeholder="Last Name"
                  className="inputStyle"
                />
              </Form.Item>
            </div>
            <Button
              key="SIGNUP"
              type="primary"
              className={
                !(emailIsValid && firstNameIsValid && lastNameIsValid)
                  ? "signguo a2"
                  : "signguo a2 backvalidate"
              }
              // disabled={!buildSecValidate}
              onClick={this.handleMainOk}
            >
              SIGNUP
            </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Address);
