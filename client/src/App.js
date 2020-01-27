import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import Index from "./components/index";
import { connect } from 'react-redux'
import { clearData } from "./redux/actions/actionFiles/form_Action";

import { BrowserRouter as Router } from "react-router-dom";
class App extends React.Component {

  componentDidMount(){
    this.props.clearData()
  }
  render() {
    return (
      <Router>
        <Index />
      </Router>
    );
  }
}
export default connect(null ,{ clearData})(App);
