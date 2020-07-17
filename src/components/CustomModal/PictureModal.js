import React from "react";
import {Row, Modal, Button } from 'tinper-bee';
import "./index.less";

// 图片附件modal展示
class PictureModal extends React.Component {
    state = {
        imgWidth: 580,  //图片宽
        imgHeight:  300,    //图片高
        imgUrl: "", //图片路径
        showModal: false,    //是否显示modal
    };

    componentDidMount = () => {
        this.setState({
            imgWidth: this.props.imgWidth || 580,  //图片宽
            imgHeight:  this.props.imgHeight || 300,    //图片高
        });
    }

    render() {
        const {imgWidth, imgHeight, showModal} = this.state;

        return (
            <Modal
                show={this.props.showModal ? this.props.showModal : showModal}
                backdrop={false}
                onHide={this.props.pictureModalCancel}
            >
                <Modal.Header closeButton>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <img alt="" 
                            src= {this.props.imgUrl || ""}
                            id="img" 
                            style={{ width: imgWidth, height: imgHeight }}
                        />
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }
}

export default PictureModal;