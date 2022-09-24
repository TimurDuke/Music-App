import * as React from 'react';
import Modal from '@mui/material/Modal';
import {useState} from "react";

const ModalComponent = ({children, openButton}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <div onClick={handleOpen}>
                {openButton}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {children}
            </Modal>
        </div>
    );
}

export default ModalComponent;