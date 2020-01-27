import React from "react";
import { Modal } from "antd";
import "./popup.css"
export default class BuildModal extends React.Component {
  render() {
    const { Modalvisible, ModalCacle, text, title } = this.props;

    return (
      <div>
        <Modal
        className="errorBox"
          visible={Modalvisible}
          title={title}
          onCancel={ModalCacle}
        >
          <div style={{textAlign:"center"}}>{text}</div>
        </Modal>
      </div>
    );
  }
}
