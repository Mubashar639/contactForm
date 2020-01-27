import React, { Component } from "react";
import { Modal, Button, Icon } from "antd";
import "../buildAndrenovation/index.css";
import "./cofirmModel.css";
export default class ConfirmModel extends Component {

  render() {
      const {visible, OnYes, OnCancle } =this.props
    return (
      <div className="confirmModel">

        <Modal
        className="confirmModel_M"
          title="Modal"
          visible={visible}
          onOk={this.OnYes}
          onCancel={this.onCancel}
          okText="ok"
          cancelText="cancle"
        >
          <div className="header build innner_idv">
            <p className="tilte-ban">Interior Design</p>
            <Icon type="plus" />
          </div>
          <div className="innerItembuild">
            <p>
              We'll select a designer who best complements you and your needs
              and be your advocate throughout the shopping process. Have a
              specific designer in mind. We'll do our best to match you with
              them.
            </p>
          </div>

          <div className="notesDesignPhone">
            You didn't select interior design as part of your renovation
            process. We feel a designer helps drice the crestive visiton of your
            project and ensures you have all the information for our
            construction specialisht to provide an accourate bid. Would you like
            us to also match you with a designer?
          </div>
          <div className="underline-Cbtn">
              <p className="underlineBtn" onClick={OnYes}>
                  Yes Please
              </p>
              <p className="underlineBtn" onClick={OnCancle}>
                  No don't need a designer
              </p>
          </div>
        </Modal>
      </div>
    );
  }
}
