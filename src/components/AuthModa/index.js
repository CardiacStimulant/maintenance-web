import React, { Component } from 'react';
import { Modal } from 'tinper-bee';
export default class AuthModa extends Component {
    render() {
        let { authResult, authMsg } = this.props;
        return (
            <Modal className='func-auth-modal' show={!authResult}>
                <Modal.Body>{authMsg}</Modal.Body>
            </Modal>
        );
    }
}