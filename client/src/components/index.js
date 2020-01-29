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

export default class ComponentName extends Component {
  state = {
    currentScr: 1
  }
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
  };
  render() {
    const {currentScr} = this.state
    return (
      <div className={currentScr ===1 ? "constainer_form": currentScr>=2 && currentScr<=5 ? "constainer_form2-5":"constainer_formL" }>
        <Header currentScr={currentScr} />
        {this.handleDom()}
      </div>
    );
  }
}
