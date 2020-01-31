import React, { Component } from "react";
import "./address.css";
import "./reponsiveaddress.css";
import { Form, Input, Button, Select } from "antd";
import MyButton from "../utils/button";
import ErrorPopUp from "../utils/popup";
import { connect } from "react-redux";
import { setFormData } from "../../redux/actions/actionFiles/form_Action";

var z1 = /^[+-]?(?=.)(?:\d+,)*\d*(?:\.\d+)?$/;
const { Option } = Select;
class Address extends Component {
  state = {
    space_type: "",
    zip: "",
    zipIsValid: false,
    // zipHelp: "City Zip Code is required to create a project",
    zipHelp: "",
    zipValidateStatus: "success",

    phone: "",
    phoneIsValid: false,
    // phoneHelp: "Phone Number is required to create a project",
    phoneHelp: "",
    phoneValidateStatus: "success",

    address: "",
    addressIsValid: false,
    // addressHelp: "Street is required to create a project",
    addressHelp: "",

    addressValidateStatus: "success",
    areaOption: [
      "Below 500",
      "500 - 1000",
      "1,000 - 1,500",
      "1,500 - 2,000",
      "2,000 - 2,500",
      "2,500 - 3,000"
    ],
    heardOption: [
      "Goop",
      "Newyork Times",
      "A Friend",
      "An Event",
      "A Desginer"
    ],
    area: "",
    news: "",

    errorModel: false
  };

  onChangeValidator = (name, value) => {
    switch (name) {
      case "address":
        if (value.trim() === "" || value.length < 10) {
          this.setState({
            [name]: value,
            addressValidateStatus: "error",
            addressHelp: "Your address is not valid!",
            addressIsValid: false
          });
        } else {
          this.setState({
            [name]: value,
            addressValidateStatus: "success",
            addressHelp: "",
            addressIsValid: true
          });
        }
        break;
      case "zip":
      case "phone":
        if (value === "") {
          this.setState({
            [name]: value,
            [`${name}ValidateStatus`]: "error",
            [`${name}Help`]: name + " is required to create a project !",
            [`${name}IsValid`]: false
          });
        }
        if (!z1.test(value)) {
          this.setState({
            [`${name}ValidateStatus`]: "error",
            [`${name}Help`]: "Enter a valid " + name + " !",
            [`${name}IsValid`]: false
          });
        } else {
          this.setState({
            [name]: Number(value),
            [`${name}ValidateStatus`]: "success",
            [`${name}Help`]: "",
            [`${name}IsValid`]: true
          });
        }
        break;
    }
  };
  handleModel = () => {
    this.setState({ errorModel: false });
  };

  handleChange = e => {
    if (
      e.target.name === "phone" ||
      e.target.name === "zip" ||
      e.target.name === "address"
    ) {
      this.onChangeValidator(e.target.name, e.target.value);
    }
  };
  onChangeArea = area => {
    this.setState({ area });
  };
  onChangeNews = news => {
    this.setState({ news });
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.formData.address &&
      nextProps.formData.address !== "" &&
      prevState.address !== nextProps.formData.address &&
      prevState.space_type !== nextProps.formData.space_type
    ) {
      const {
        zip,
        phone,
        address,
        area,
        news,
        space_type,
        zipIsValid,
        phoneIsValid,
        addressIsValid
      } = nextProps.formData;

      return {
        ...prevState,
        zip,
        phone,
        address,
        area,
        news,
        space_type,
        zipIsValid,
        phoneIsValid,
        addressIsValid
      };
    }
    return prevState;
  }
  handleMainOk = () => {
    const {
      zipIsValid,
      phoneIsValid,
      addressIsValid,
      area,
      news,
      address,
      zip,
      phone
    } = this.state;
    if (zipIsValid && phoneIsValid && addressIsValid) {
      this.props.sendFrom({
        zip,
        phone,
        address,
        area,
        news,
        zipIsValid,
        phoneIsValid,
        addressIsValid
      });
      this.props.changeScr("mext");
    } else {
      this.setState({ errorModel: true });
    }
  };
  backbtn = () => {
    const {
      area,
      news,
      address,
      zip,
      phone,
      zipIsValid,
      phoneIsValid,
      addressIsValid
    } = this.state;
    this.props.sendFrom({
      zip,
      phone,
      address,
      area,
      news,
      zipIsValid,
      phoneIsValid,
      addressIsValid
    });
    this.props.changeScr("pre");
  };
  render() {
    const {
      zip,
      phone,
      address,
      zipHelp,
      zipIsValid,
      zipValidateStatus,
      phoneIsValid,
      phoneHelp,
      phoneValidateStatus,
      addressIsValid,
      addressHelp,
      area,
      news,
      areaOption,
      heardOption,
      addressValidateStatus,
      errorModel
    } = this.state;
    return (
      <div className="address-f">
        <ErrorPopUp
          title="Something is wrong"
          text="A Required fields is empty"
          ModalCacle={this.handleModel}
          Modalvisible={errorModel}
        />
        <div className="addressfrom">
          <div className="top-t">
            <p className="title-2address">My space is located at</p>
            <p className="subtitle-2address">
              We'll use your address to select designers and renovation
              professionals for your project that are in your area.
            </p>
          </div>

          <div className="form-a">
            <div className="input-container-a">
              <p className="form-label-a ">Street Address</p>
              <Form.Item
                validateStatus={addressValidateStatus}
                help={addressHelp}
                className="formItem"
              >
                <Input
                  type="text"
                  name="address"
                  onChange={this.handleChange}
                  value={address}
                  placeholder="Street and number, apartment, suite, unit, floor, etc."
                  className="inputStyle"
                />
              </Form.Item>
            </div>
            <div className="input-container-a">
              <p className="form-label-a">ZIP</p>
              <Form.Item
                validateStatus={zipValidateStatus}
                help={zipHelp}
                className="formItem"
              >
                <Input
                  type="text"
                  name="zip"
                  onChange={this.handleChange}
                  value={zip}
                  placeholder="City Zip Code"
                  className="inputStyle"
                />
              </Form.Item>
            </div>
            <div class="input-container-a">
              <p class="form-label-a">Phone Number</p>
              <Form.Item
                validateStatus={phoneValidateStatus}
                help={phoneHelp}
                className="formItem"
              >
                <Input
                  type="text"
                  name="phone"
                  onChange={this.handleChange}
                  value={phone}
                  placeholder="Mobile Number"
                  className="inputStyle"
                />
              </Form.Item>
            </div>
            <div class="input-container-a">
              <p class="form-label-a">
                The estimated total square footage of your space
              </p>
              <Select
                placeholder="Optional"
                className={
                  !area ? "selectinlocation forPlace" : "selectinlocation "
                }
                onChange={this.onChangeArea}
                defaultValue={area === "" ? "Optional" : area}
                name="area"
              >
                {areaOption.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </div>
            <div class="input-container-a heardabout">
              <p class="form-label-a">I heard about this through</p>
              <Select
                showSearch
                className={
                  !news ? "selectinlocation forPlace" : "selectinlocation "
                }
                placeholder="Optional"
                onChange={this.onChangeNews}
                defaultValue={news === "" ? "Optional" : news}
                name="news"
              >
                {heardOption.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </div>
            <MyButton
              validateBlack={zipIsValid && phoneIsValid && addressIsValid}
              // disablelity={!zipIsValid || !phoneIsValid || !addressIsValid}
              disablelity={false}
              handleBtnBack={() => this.backbtn()}
              handleNext={this.handleMainOk}
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

export default connect(mapStateToProps, mapDispatchToProps)(Address);
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
  /* <p class='title'>My space is located at</p>
<div class="stage2divSub"><p class='subtitle stage-2sub'>We'll use your address to select designers and renovation professionals for your project that are in your area.</p></div>
<div class='input-container'>
    <p class='form-label firstlabel'>Street Address</p>
    <input class='form-input' placeholder="Street and number, apartment, suite, unit, floor, etc." oninput="myfuntion('s2-address')" type='text' id='s2-address' />
    <div style="height: 20px;"><p class='input-note hidenote' id="addressnote">Street is required to create a project</p></div>
</div>
<div class='input-container'>
    <p class='form-label'>ZIP</p>
    <input class='form-input' placeholder="City Zip Code" oninput="myfuntion('s2-zip')" type='text' id='s2-zip'>
    <div style="height: 20px;"><p class='input-note hidenote'>ZIP is required to create a project</p></div>
</div>
<div class='input-container'>
    <p class='form-label'>Phone Number</p>
    <input class='form-input' placeholder="Mobile Number" oninput="myfuntion('s2-phone')" type='text' id='s2-phone'>
    <div style="height: 20px;"><p class='input-note hidenote'>Phone Number is required to create a project</p></div>
</div>
<div id="addressDD" onclick="addressDDF('addressDD')" class="input-container asasdf">
        <p class='form-label'>The estimated total square footage of your space</p>
    
    <p  class='dropbtn' id='s2-area'>Optional</p>

    <div class="dropdown-content">
      <p id="option1address" onclick="selectvalue('option1address','addressDD','s2-area')" class="optionadress">Below 500 </p>
      <p id="option2address" onclick="selectvalue('option2address','addressDD','s2-area')" class="optionadress">500 - 1000</p>
      <p id="option3address" onclick="selectvalue('option3address','addressDD','s2-area')" class="optionadress">1,000 - 1,500</p>
      <p id="option4address" onclick="selectvalue('option4address','addressDD','s2-area')" class="optionadress">1,500 - 2,000</p>
      <p id="option5address" onclick="selectvalue('option5address','addressDD','s2-area')" class="optionadress">2,000 - 2,500</p>
      <p id="option6address" onclick="selectvalue('option6address','addressDD','s2-area')" class="optionadress">2,500 - 3,000</p>
    </div>
  </div>


  <div id="contectfrom" onclick="addressDDF('contectfrom')" class="input-container asasdf">
    <p class='form-label'>I heard about this through</p>
    
    <p  class='dropbtn' id='s2-news'>Optional</p>

    <div class="dropdown-content positionabove">
      <p id="option1con" onclick="selectvalue('option1con','contectfrom','s2-news')" class="optionadress">Goop </p>
      <p id="option2con" onclick="selectvalue('option2con','contectfrom','s2-news')" class="optionadress">Newyork Times</p>
      <p id="option3con" onclick="selectvalue('option3con','contectfrom','s2-news')" class="optionadress">A Friend</p>
      <p id="option4con" onclick="selectvalue('option4con','contectfrom','s2-news')" class="optionadress">An Event</p>
      <p id="option5con" onclick="selectvalue('option5con','contectfrom','s2-news')" class="optionadress">A Desginer</p>
    </div>
  </div>



<div class='input-container addressbutton' style='margin-top : 50px;'>
    <input type='button' class='form-button textStyle ' value='Back' id='back-stage-2'>
    <input type='button' class='form-button textStyle gray' value='Next' id='next-stage-2'>
</div> */
}

// const onChangeValidator = (name, value) => {
//     switch (name) {
//       case "password":
//         if (value.trim() === "" || value.length < 5) {
//           setFormData({
//             ...formData,
//             [name]:value,
//             passwordValidateStatus: "error",
//             passwordHelp: "Enter more than 5 digit password!",
//             passwordIsValid: false
//           });
//         } else {
//           setFormData({
//             ...formData,
//             [name]:value,
//             passwordValidateStatus: "success",
//             passwordHelp: "",
//             passwordIsValid: true
//           });
//         }
//         break;
//       case "email":
//         if (!emailPattern.test(value)) {
//           setFormData({
//             ...formData,
//             [name]:value,
//             emailValidateStatus: "error",
//             emailHelp: "Enter a valid Email address!",
//             emailIsValid: false
//           });
//         } else {
//           setFormData({
//        ...formData,
//             [name]:value,
//             emailValidateStatus: "success",
//             emailHelp: "",
//             emailIsValid: true
//           });
//         }
//         break;
//     }
//   };
//   const { email, password, remember } = formData;

//   const handleChange = e => {
//     if (e.target.name === "email" || e.target.name==="password" ) {
//         onChangeValidator(e.target.name, e.target.value)
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value })
//     }
//   };
//   const { getFieldDecorator } = props.form;
//   function onChange(e) {
//     setFormData({ ...formData, [e.target.name]: e.target.checked });
//     console.log(`checked = ${e.target.checked}`);
//   }
//   const handleSubmit = e => {

//     const { email, password, remember } = formData;

//     e.preventDefault();
//     let isFormValid = true;
//     if (!formData.emailIsValid) {
//       isFormValid = false;
//       setFormData({
//         emailValidateStatus: "error",
//         emailHelp: "Enter your Email !"
//       });
//     }

//     if (!formData.passwordIsValid) {
//       isFormValid = false;
//       setFormData({
//         passwordIsValid: false,
//         passwordHelp: "Enter your password !",
//         passwordValidateStatus: "error"
//       });
//     }
//     if (isFormValid) {
//     props.form.validateFieldsAndScroll((err, values) => {
//       if (!err) {
//         console.log("Received values of form: ", values);
//         console.log(values)
//         props.loginUser({ email, password, remember });
//       }
//     });
//   } else {
//     console.log("Validation Error");
//   }
//   };
