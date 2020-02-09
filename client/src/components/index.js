import React, { Component } from "react";
import Header from "./header";
import Firstform from "./firstForm";
import "./main.css";
import AddressForm from "./addressForm/address";
import BuildAndReno from "./buildAndrenovation/index";
import Moredatial from "./moreDetail/moreDetailSrc";
import EstimateBudget from "./estimatedBudget/esti_budget";
import HowWork from "./lastSecreen/howWork";
import RegisterPage from "./registeration/register";
import Thanku from "./thanku/thanuSec";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
export default class ComponentName extends Component {
  state = {
    currentScr: 4
  };
  changeSrec = decision => {
    const { currentScr } = this.state;
    if (decision === "pre") {
      this.setState({ currentScr: currentScr - 1 });
    } else this.setState({ currentScr: currentScr + 1 });
  };

  handleDom = () => {
    const { currentScr } = this.state;
    if (currentScr === 1) return <RegisterPage changeScr={this.changeSrec} />;
    if (currentScr === 2) return <Firstform changeScr={this.changeSrec} />;
    if (currentScr === 3) return <AddressForm changeScr={this.changeSrec} />;
    if (currentScr === 4) return <BuildAndReno changeScr={this.changeSrec} />;
    if (currentScr === 5) return <Moredatial changeScr={this.changeSrec} />;
    if (currentScr === 6) return <EstimateBudget changeScr={this.changeSrec} />;
    if (currentScr === 7) return <HowWork changeScr={this.changeSrec} />;
    if (currentScr === 8) return <Thanku changeScr={this.changeSrec} />;
  };
  render() {
    const { currentScr } = this.state;
    return (
      <div style={{ height: "100%",
      overflow: currentScr === 3 ? "auto" : "hidden"
    }}>
        <Header currentScr={currentScr} />
        <div
          style={{
            height: "90%",
          }}
          className={
            currentScr === 1
              ? "constainer_form "
              : currentScr >= 2 && currentScr <= 5
              ? "constainer_form2-5"
              : "constainer_formL"
          }
        >
          <div style={{ height: "100%" }}>
            <SimpleBar className="sameForHeight">
            <div className="innerScreeenItem">{this.handleDom()}</div>
            </SimpleBar>
          </div>
        </div>
      </div>
    );
  }
}
