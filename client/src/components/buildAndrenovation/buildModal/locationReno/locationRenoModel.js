import React, { Component } from "react";
import { Icon, Popover, Select } from "antd";
import "./location.css";
const { Option } = Select;

export default class LocationRenoModel extends Component {
  state = {
    visible: false,
    showArea: false
  };
  hide = (mode, index, e) => {
    this.setState({
      visible: false
    });
    this.props.handleOkLocation(mode, index, e);
  };
  HandlerShow = () => {
    this.setState({ showArea: true });
  };
  hideAreaHandle = () => {
    this.setState({ showArea: false });
    this.props.onCancelEntireLocation();
  };
  render() {
    const {
      innerTitle,
      downText,
      locationArray,
      handleIncrease,
      handleDecrease,
      handleOkLocation,
      handleVisibleChange,
      entireLocationOption,
      onChangeEntireLocation,
      entire_location
    } = this.props;
    const { showArea } = this.state;
    return (
      <div className="locationScreen">
        <div className="locationHeader">
          <p className="headingbuild">{innerTitle}</p>
          <p class="small-msg location">{downText}</p>
        </div>
        <div className="locationBody">
          <div className="entirelocationdiv">
            {(entire_location != 0 || showArea) && (
              <Icon
                onClick={this.hideAreaHandle}
                type="cross"
                class="iconcross"
              />
            )}

            <p className="paralocation" onClick={this.HandlerShow}>
              entire location
            </p>
            
            {showArea && (
              <div className="slectionarea">
                {entire_location !== 0 && (
              <p className="sqarefoot" onClick={this.HandlerShow}>
                sq. ft
              </p>
            )}
                <Select
                  showSearch
                  labelInValue
                  className="entirelocationSelect"
                  placeholder="Approximate square footage"
                  optionFilterProp="children"
                  onChange={onChangeEntireLocation}
                  // defaultValue={entire_location===0?"Approximate square footage":`${entire_location} sq. ft`}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {entireLocationOption.map((item, index) => (
                    <Option key={index} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </div>
            )}
          </div>
          <div className="smallboxesContainer">
            {locationArray.map((value, index) => {
              return (
                <Popover
                  visible={value.visible}
                  onVisibleChange={e => handleVisibleChange(e, index)}
                  placement="bottom"
                  title={
                    <div className="titleContent">
                      <span>{value.title}</span>
                      <div className="plusMinuscon">
                        <Icon
                          type="minus"
                          class="iconcross"
                          onClick={() => {
                            handleDecrease(value, index);
                          }}
                        />

                        <p className="numbertext">{value.value}</p>
                        <Icon
                          type="plus"
                          class="iconcross"
                          onClick={() => {
                            handleIncrease(value, index);
                          }}
                        />
                      </div>
                    </div>
                  }
                  content={
                    <div className="btndivpop">
                      <button
                        onClick={e => handleOkLocation("cancle", index, e)}
                        className="btnpopover btncancleadd"
                      >
                        cancle
                      </button>
                      <button
                        onClick={e => handleOkLocation("set", index, e)}
                        className="btnpopover btnOkadd"
                      >
                        done
                      </button>
                    </div>
                  }
                  trigger="click"
                  key={index}
                >
                  <div className="smallboxes">
                    {value.set > 0 && (
                      <div
                        onClick={e => handleOkLocation("cross", index, e)}
                        className="icondiv"
                      >
                        <Icon type="cross" />
                      </div>
                    )}
                    <p className="boxesLocation">{value.title}</p>
                    {value.set > 0 && <p className="items">{value.set}</p>}
                  </div>
                </Popover>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
