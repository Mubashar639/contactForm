import React, { Component } from "react";
import "./moreDetailSrc.css";
import { Input } from "antd";
import MyButton from "../utils/button";

import { connect } from "react-redux";
import { setFormData } from "../../redux/actions/actionFiles/form_Action";
const { TextArea } = Input;
class MoreDetials extends Component {
  state = {
    project_info: ""
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.formData.project_info &&
      nextProps.formData.project_info !== "" &&
      prevState.project_info !== nextProps.formData.project_info
    ) {
      const { project_info } = nextProps.formData;
      return {
        ...prevState,
        project_info
      };
    }
    return prevState;
  }
  onChange = ({ target: { value } }) => {
    this.setState({ project_info: value });
  };
  HandleMainOk = () => {
    const { project_info } = this.state;
    this.props.sendFrom({
      project_info
    });
    this.props.changeScr("next");
  };
  render() {
    const {project_info} =this.state
    return (
      <div className="detail_f">
        <div className="detail_c">
          <p className="title-c">Tell us more about your project</p>
          <p className="detail-p">
            We use this information to find the best designer for you, faster.
          </p>
          <p className="detail-pt">
            Additional details like plans, style preferences, relevant links, or
            Pinterest insiration help us understand you goals, match you with
            the right designer more quickly, and tailor the Homepolish
            experience to you.
          </p>
          <div className="project_info">
            <TextArea
              className="project_detail"
              value={project_info}
              placeholder="What is your space like now? What are you trying to accomplish? "
              autoSize={{ minRows: 15, maxRows: 17 }}
              onChange={this.onChange}
              spellCheck={true}
            />
          </div>
          <MyButton
            handleBtnBack={() => this.props.changeScr("pre")}
            handleNext={this.HandleMainOk}
            validateBlack={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(MoreDetials);
// project_info: '',
// estimated_amount: '500000',
// space_type: '0',
// news: 'A Friend',
// area: '1,500 - 2,000',
// degree_renovation: '1'
