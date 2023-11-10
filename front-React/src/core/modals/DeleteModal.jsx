import { Modal } from 'antd'
import React from 'react'

export const DeleteModal = ({ isVisible, onConfirm, onCancel, title, message }) => {
    return (
        <Modal
            title={title}
            open={isVisible}
            onOk={onConfirm}
            onCancel={onCancel}
        >
            {message}
        </Modal>
    )
}
