import { Button, Modal } from 'antd';
import React, { useState } from 'react';

interface Props {
    ButtonOpen: React.ReactNode;
    Content: React.ReactNode;
}

const ModalCst = ({ ButtonOpen, Content }: Props) => {
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };
    return (
        <>
            <button type="button" onClick={showModal}>
                {ButtonOpen}
            </button>
            <Modal open={open} centered onCancel={hideModal} footer={[]} closeIcon={false}>
                {Content}
            </Modal>
        </>
    );
};

export default ModalCst;
