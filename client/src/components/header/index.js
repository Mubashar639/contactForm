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
              {(currentScr === 7 || currentScr === 8) && (
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
            <div>
              <center>
                <p class="right_Headtop"> Metro Flooring </p>
                <p class="right_Headtop">& Interior Design</p>
              </center>
            </div>
          </div>
          <Progress
            strokeColor={currentScr < 8 ? "rgb(23, 126, 121)" : "green"}
            percent={(currentScr / 8) * 100}
            status="active"
          />
        </div>
      </div>
    );
  }
}
export default Header;
