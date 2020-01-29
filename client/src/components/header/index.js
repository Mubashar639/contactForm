import React, { Component } from "react";
import "./index.css";
import { Progress } from "antd";
class Header extends Component {
  render() {
    const { currentScr } = this.props;
    return (
      <div className="c_header">
        <div className="m_header">
          <div className="topSection_h">
            <div>
            {currentScr === 1 && (
                <span className="left_Headtop">WELCOME</span>
              )}
              {currentScr === 2 && (
                <span className="left_Headtop">CREATE A PROJECT </span>
              )}
              {currentScr === 7 && (
                <span className="left_Headtop">THANK YOU </span>
              )}
              {currentScr === 3 && (
                <div>
                  <p class="address2screensub">CREATE A PROJECT </p>
                  <p class="address2titleas">LOCATION DETAILS </p>
                </div>
              )}
              {currentScr >= 4 && currentScr <= 6 && (
                <div>
                  <p class="address2screensub">CREATE A PROJECT </p>
                  <p class="address2titleas">SCOPE OF THE WORK</p>
                </div>
              )}
            </div>
            <span className="right_Headtop">Homepolish</span>
          </div>
          <Progress strokeColor="rgb(23, 126, 121)" percent={(currentScr / 7) * 100} status="active" />
          {/* <div className="bar">
            <div
              style={{ width: `${(currentScr / 6) * 100}%` }}
              className="bar-thumb"
            ></div>
          </div> */}
        </div>
      </div>
    );
  }
}
export default Header;
