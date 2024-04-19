import { Button, Modal } from 'antd';
import React, { useState } from 'react';

interface Props {
    ButtonOpen?: React.ReactNode;
    Content: React.ReactNode;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalCst = ({ ButtonOpen, Content, open, setOpen }: Props) => {
    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    return (
        <>
            {ButtonOpen && (
                <button type="button" onClick={showModal}>
                    {ButtonOpen}
                </button>
            )}
            <Modal destroyOnClose open={open} centered onCancel={hideModal} footer={null} closeIcon={false}>
                {Content}
            </Modal>
        </>
    );
};

export default ModalCst;
