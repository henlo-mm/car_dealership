import { Modal, Form, Spin, Input, Button, notification, Select } from 'antd';
import { useEffect, useState } from 'react';
import { getWorkOrdersByUserDocumentOrCarPlate } from '../../services/work_orders';

export const UsersModal = ({ isVisible, onConfirm, onCancel, userData, onUserUpdate }) => {


    const [loading, setLoading] = useState(false);
    const [workOrder, setWorkOrder] = useState([]);

    const fetchOrderWorkData = async () => {
        try {
            const data = await getWorkOrdersByUserDocumentOrCarPlate(userData);
            setWorkOrder(data);
            console.log(data)
        } catch (error) {
            console.error('Error branch list:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderWorkData();
    }, []);



    const onClose = () => {
        if (onCancel) {
            onCancel();
        }
    }

    


    // funcioinalidad, que al ejecutar un submit, nos permite enviar los datos en una peticion http y ejecutarlo. 

    

    // Objetos representativos que se deben de obtener de las peticiones http de Django

    const optionsRoles = [
        {
            id: 1,
            name: 'Gerente',
        },
        {
            id: 2,
            name: 'Vendedor',
        },
        {
            id: 3,
            name: 'Jefe de Taller',
        },
        {
            id: 4,
            name: 'Cliente',
        },
    ]

    return (
        <Modal
            title={`Orden de trabajo ${userData}`}
            open={isVisible}
            onCancel={onClose}
            // onOk={() => {validateForm}}
            width={800}
        >
            {/* Formulario para agregar/editar usuario */}
            <Spin
                spinning={loading}
            >
                <div className='card-body row'>
                    <p>{userData}</p>
                </div>
            </Spin>
        </Modal>
    )
}
