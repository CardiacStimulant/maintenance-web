import React from "react";
import {Select, Icon, Modal, Button } from 'tinper-bee';
import "./index.less";

const Option = Select.Option;

class EditableCellSelectRender extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
    warningModal: false,
    propertyId: 0,
  };

  componentDidMount = async() => {
    if(this.props.editable) {
      this.setState({
        editable: true
      });
    }
  }

  handleChange = e => {
    if(e) {
      let valueArr = e.split(",");
      if(valueArr && valueArr.length>2) {
        const value = valueArr[2];
        this.setState({ value: value, propertyId: valueArr[0], });
        this.props.setNullFlag(valueArr[1]);
      } else {
        const value = e;
        this.setState({ value });
      }
    }
  };

  check = () => {
    //根据父级属性判断是否可空
    if(!this.props.isEmpty && this.state.value) {
      this.setState({ editable: false });
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
        this.props.setPropertyId(this.state.propertyId);
      }
    } else {
      this.setState({
        warningModal: true,
      });
    }
  };

  edit = () => {
    this.setState({ editable: true });
  };

  /**
   * 关闭modal
   */
  closeModal = () => {
    this.setState({
      warningModal: false,
    });
  }

  render() {
    const { value, editable } = this.state;
    const { customProperties, tableList, tableIndex } = this.props;
    let newCustomProperties = [], tablePropertyIds = "", tablePropertyTitles = "";
    
    //将列表中已存在的PropertyId和PropertyTitle转换成字符串
    if(tableList && tableList.length>0) {
      tableList.map((tableListItem, index) => {
        if(tableListItem.propertyId) {
          tablePropertyIds += tableListItem.propertyId + ",";

          if(tableListItem.propertyTitle) {
            tablePropertyTitles += tableListItem.propertyTitle + ",";
          }
        }
      });
    }

    //过滤掉已经选择的自定义属性字段
    if(tablePropertyIds && tablePropertyIds.length>0 && customProperties && customProperties.length>0) {
      customProperties.map((item, index) => {
        if(tablePropertyIds.indexOf(item.id)==-1) {
          newCustomProperties.push(item);
        }
      });
    } else {
      newCustomProperties = customProperties;
    }

    //容错机制：防止删除之后，该组件的state.value没有修改，这时，直观页面会有问题
    //        通过props.value来解决
    let newValue = value;
    const propsValue = this.props.value;
    if(propsValue && tablePropertyTitles.indexOf(propsValue)>-1) {
      newValue = propsValue;
    }

    //可选项
    let customePropertySelect;
    //遍历客户属性列表，自定义展示客户信息
    if(newCustomProperties && newCustomProperties.length>0) {
      customePropertySelect = (
        <Select
            style={{ width: "100%" }}
            isclickTrigger={true}
            value={newValue}
            onChange={this.handleChange}
            size="sm"
            autofocus
        >
            {
              newCustomProperties.map((propertiesItem, index) => {
                return <Option key={propertiesItem.id} value={propertiesItem.id + "," + propertiesItem.nullFlag + "," + propertiesItem.propertyTitle}>
                          {propertiesItem.propertyTitle}
                        </Option>;
              })
            }

        </Select>
      );
    } else {
      customePropertySelect = (
        <Select
            style={{ width: "100%" }}
            isclickTrigger={true}
            value={newValue}
            onChange={this.handleChange}
            size="sm"
            autofocus
        >
        </Select>
      )
    }

    return (
      <div className="editable-cell">
        {editable ? (
          <div className="editable-cell-input-wrapper">
            { customePropertySelect }
            <Icon
              type="uf-correct"
              className="editable-cell-icon-check"
              onClick={this.check}
            />
          </div>
        ) : (
          <div className="editable-cell-text-wrapper">
            {newValue || " "}
            <Icon
              type="uf-pencil"
              className="editable-cell-icon"
              onClick={this.edit}
            />
          </div>
        )}

        <Modal
            className="cell-select-render-warning-modal"
            show={this.state.warningModal}
            onHide={this.closeModal}
        >
            <Modal.Header>
                <Modal.Title>提示</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Icon className="uf-exc-c-o"></Icon>
                <span className="text-span">该字段必填</span>
            </Modal.Body>

            <Modal.Footer>
                <Button colors="primary" onClick={this.closeModal}>
                    确认
                </Button>
            </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EditableCellSelectRender;