import React, { Component } from "react";
import "../lastSecreen/howWork.css";
class Tanku extends Component {
  render() {
    return (
      <div className="how_work">
        <div className="detail_c detail-w">
          <p className="title-c"> Successfully submitted </p>

          <p className="detail-pt Slider-p" style={{ marginTop: "20px", fontSize:"15px" }}>
            Your form is submited successfull. We will contact you soon. Here
            will come any message that you want to show to your customers
          </p>
        </div>
      </div>
    );
  }
}

export default Tanku;
