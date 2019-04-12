
import React, {Component} from 'react';
import './modal.scss';

class Modal extends Component {
    render() {
        const {
            isOpen,
            children,
            defaultAction,
            defaultActionText = 'Okey Dokey',
            secondaryAction = null,
            secondaryActionText = 'Cancel'
        } = this.props;

        if (isOpen) {
            return (
                <div className="ws-modal">
                    <div className="ws-modal-content">
                        {children}
                        <div className="ws-modal-actions center">
                            <button className="btn btn-large orange" onClick={defaultAction}>{defaultActionText}</button>
                            {
                                secondaryAction
                                    ? <button className="btn btn-large cyan" onClick={secondaryAction}>{secondaryActionText}</button>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    }
}

export default Modal;
