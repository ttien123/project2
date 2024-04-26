import { Modal } from 'antd';
import React from 'react';
import './Modal.module.scss';
interface Props {
    ButtonOpen?: React.ReactNode;
    Content: React.ReactNode;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    width?: number;
    className?: string;
}

const ModalCst = ({ ButtonOpen, Content, open, setOpen, width, className }: Props) => {
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
            <Modal
                width={width}
                destroyOnClose
                open={open}
                centered
                onCancel={hideModal}
                footer={null}
                closeIcon={false}
                className={className}
            >
                {Content}
            </Modal>
        </>
    );
};

export default ModalCst;
