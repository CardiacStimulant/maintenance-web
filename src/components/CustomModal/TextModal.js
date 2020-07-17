import React from "react";
import {Row, Modal, Button } from 'tinper-bee';
import "./index.less";

// 文本附件modal展示
class TextModal extends React.Component {
    state = {
        txtWidth: 580,  //文本宽
        txtHeight:  300,    //文本高
        txtUrl: "", //文本路径
        showModal: false,    //是否显示modal
    };

    componentDidMount = () => {
        this.setState({
            txtWidth: this.props.txtWidth || 580,  //文本宽
            txtHeight:  this.props.txtHeight || 300,    //文本高
        });
    }

    render() {
        const {txtWidth, txtHeight, showModal} = this.state;

        return (
            <Modal
                show={this.props.showModal ? this.props.showModal : showModal}
                backdrop={false}
                onHide={this.props.textModalCancel}
            >
                <Modal.Header closeButton>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <iframe src= {this.props.txtUrl || ""}
                            style={{ width: txtWidth, height: txtHeight }}
                        />
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }
}

export default TextModal;