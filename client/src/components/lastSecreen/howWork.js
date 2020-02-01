import React, { Component } from "react";
import "./howWork.css";
import { Button } from "antd";
import { connect } from "react-redux";
import { baseUrl } from "../../redux/indexApiRuote";
import axios from "axios";
import ConfirmModel from "../utils/popup";
import { clearData } from "../../redux/actions/actionFiles/form_Action";

class HowWork extends Component {
  state = {
    email: "",
    firstName: "",
    lastName: "",

    zip: "0",
    phone: "0",
    address: "0",
    interior_finishes: "0",
    art_selection: "0",
    style_guidance: "0",
    furniture_selection: "0",
    want_connection: "0",
    structural_changes: "0",
    contacted_before: "0",
    entire_location: "0",
    living_rooms: "0",
    bed_rooms: "0",
    dining_rooms: "0",
    kitchens: "0",
    bathrooms: "0",
    entryways: "0",
    offices: "0",
    kids: "0",
    outdoor: "0",
    project_info: "0",
    estimated_amount: "0",
    space_type: "0",
    news: "0",
    area: "0",
    degree_renovation: "0",
    modelcontol: false,
    statement: "",
    title: "",
    btnloadin: false
  };

  componentDidMount() {
    const {
      zip,
      phone,
      address,
      interior_finishes,
      art_selection,
      style_guidance,
      furniture_selection,
      want_connection,
      structural_changes,
      contacted_before,
      entire_location,
      living_rooms,
      bed_rooms,
      dining_rooms,
      kitchens,
      bathrooms,
      entryways,
      email,
      offices,
      kids,
      outdoor,
      project_info,
      estimated_amount,
      space_type,
      news,
      area,
      degree_renovation, 
      firstName,
      lastName,
    } = this.props.alldata.form;

    this.setState({
      zip,
      phone,
      address,
      interior_finishes,
      art_selection,
      style_guidance,
      furniture_selection,
      want_connection,
      structural_changes,
      contacted_before,
      entire_location,
      living_rooms,
      bed_rooms,
      dining_rooms,
      kitchens,
      bathrooms,
      entryways,
      offices,
      kids,
      email,
      outdoor,
      project_info,
      estimated_amount,
      space_type,
      news,
      area,
      firstName,
      lastName,
      degree_renovation
    });
  }

  onsumited = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    this.setState({
      btnloadin: true
    });
    const {
      modelcontol,
      statement,
      btnloadin,
      title,
      ...otherProps
    } = this.state;
    const body = JSON.stringify({ ...otherProps });
    try {
      const res = await axios.post(baseUrl + "/form", body, config);
      console.log(res);
      if (res.status === 200) {
        this.props.changeScr("next")
        this.props.clearData();
      }
    } catch (err) {
      this.setState({
        btnloadin: false,
        statement: "Some thing going wrong",
        title: "Failed",
        modelcontol: true
      });
    }
  };
  handleModel = () => {
    this.setState({ modelcontol: false });
  };
  render() {
    return (
      <div className="how_work">
        <div className="detail_c detail-w">
          <ConfirmModel
            title={this.state.title}
            text={this.state.statement}
            ModalCacle={this.handleModel}
            Modalvisible={this.state.modelcontol}
          />
          <p className="title-c">How we work: </p>

          <p className="detail-pt Slider-p" style={{ marginTop: "20px" }}>
            Once we review your project details, we will work to select the
            right designer for your needs. Depending on your project specifics
            and scope, we will recommend a flat fee or an hourly rate and a
            suggested number of hours.
          </p>
          <div
            className="project_info"
            style={{ width: "50%", borderBottom: "1px solid rgb(212,212,212)" }}
          ></div>
          <div style={{ width: "90%" }}>
            <Button
              loading={this.state.btnloadin}
              style={{ background: "rgb(30,30,30)" }}
              key="NEXT"
              type="primary"
              className="btnbuild a2"
              onClick={() => {
                this.onsumited();
              }}
            >
              Finish and request service
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  alldata: state.form_data
});

export default connect(mapStateToProps, { clearData })(HowWork);
// project_info: '',
// estimated_amount: '500000',
// space_type: '0',
// news: 'A Friend',
// area: '1,500 - 2,000',
// degree_renovation: '1'

// this.props.changeScr("pre");
