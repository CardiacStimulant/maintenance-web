import React from "react";
import {Row, Modal, Button } from 'tinper-bee';
import "./index.less";

// 错误提示modal展示
class ErrorModal extends React.Component {
    state = {};

    componentDidMount = () => {}

    render() {
        const {showModal, errorTitle, errorText,} = this.props;

        return (
            <Modal
                show={showModal || false}
                backdrop = "static"
            >
                <Modal.Header>
                    <Modal.Title>{errorTitle}</Modal.Title>
                </Modal.Header>
                {
                    errorText
                    ?    <Modal.Body>
                            <Row>
                                {errorText}
                            </Row>
                        </Modal.Body>
                    : ""
                }
                <Modal.Footer>
                    <Button onClick={this.props.errorConfirm || this.props.errorConfirm.bind(this)} colors="primary">确认</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ErrorModal;