import { Modal, Form, Spin, Input, Button, notification, Select } from 'antd';
import { Table } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getWorkOrdersByUserDocumentOrCarPlate } from '../../services/work_orders';

export const UsersModal = ({ isVisible, onConfirm, onCancel, userData, onUserUpdate }) => {

    // console.log(userData ,"hola")
    const [loading, setLoading] = useState(false);
    const [workOrder, setWorkOrder] = useState([]);

    const fetchOrderWorkData = async () => {
        try {
            const data = await getWorkOrdersByUserDocumentOrCarPlate({ userDocument: null, carPlate: userData});
            setWorkOrder(data);
            
        } catch (error) {
            console.error('Error branch list:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderWorkData();
    }, [userData]);



    const onClose = () => {
        if (onCancel) {
            onCancel();
        }
    }


    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Comentarios',
          dataIndex: 'comments',
          key: 'comments',
        },
        {
          title: 'Descripción',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Fecha de inicio',
          dataIndex: 'start_date',
          key: 'start_date',
          render: (start_date) => dayjs(start_date).format('YYYY-MM-DD')
        },
        {
          title: 'Fecha de finalización',
          dataIndex: 'completion_date',
          key: 'completion_date',
          render: (completion_date) => dayjs(completion_date).format('YYYY-MM-DD')
        },
        {
            title: 'Disponible',
            dataIndex: 'is_available',
            key: 'is_available',
            render: isAvailable => (isAvailable ? 'Sí' : 'No'),
          },
        {
          title: 'Estado',
          dataIndex: ['status', 'name'],
          key: 'status',
        },
        {
          title: 'Cliente',
          dataIndex: ['customer', 'name'],
          key: 'customer',
          render: (name, record) => `${name} ${record.customer.lastname}`,
        },
        {
          title: 'Gerente del taller',
          dataIndex: ['workshop_manager', 'name'],
          key: 'workshop_manager',
          render: (name, record) => `${name} ${record.workshop_manager.lastname}`,
        },
      ];

    return (
        <Modal
            title={`Ordenes de trabajo ${userData}`}
            open={isVisible}
            onCancel={onClose}
            width={1400}
        >
            {/* Formulario para agregar/editar usuario */}
            <Spin
                spinning={loading}
            >
                <div className='card-body row'>
                    <Table dataSource={workOrder} columns={columns} />
                </div>
            </Spin>
        </Modal>
    )
}
