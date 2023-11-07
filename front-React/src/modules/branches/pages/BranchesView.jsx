import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Input } from 'antd';
import { PlusCircleOutlined, FilterOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiSolidEditAlt } from 'react-icons/bi';
import { getBranches } from '../../../services/branches';
import { BranchesModal } from '../modals/BranchesModal';
//import 'antd/dist/antd.css';

const { Search } = Input;

export const BranchesView = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    // En este use State vamos a poner toda la data, para que setear los fields en el formulario para el caso de edicion.
    const [branchToEdit, setBranchToEdit] = useState(null);
    const [branchData, setBranchData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
    const [branchToDelete, setBranchToDelete] = useState(null);

    const refreshTable = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const fetchBranchData = async () => {
        try {
            const data = await getBranches();
            setBranchData(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBranchData();
    }, [refreshKey]);

    const handleAddBranchClick = (values) => {
        if (values) {
            setBranchToEdit(values)
        }
        console.log('se abre el modal de branches?')
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        // todo: logica para cerrar el modal
        console.log('se ejecuto el cancelar');
        setIsModalVisible(false);
        setBranchToEdit(null);
    };
    const handleOk = () => {
        // id = models.AutoField(primary_key=True)
        // name = models.CharField(max_length=200, null=False)
        // address = models.CharField(max_length=255, null=False)
        // contact_name = models.CharField(max_length=200, null=False)
        // phone = models.CharField(max_length=20, null=False)
        // email = models.CharField(max_length=255, null=False)
        // created_at = models.DateTimeField(auto_now_add=True)
        // updated_at = models.DateTimeField(auto_now=True)
        // todo: logica para crear una branch nueva
        console.log('se ejecuto el ok')
        setIsModalVisible(false);
        setBranchToEdit(null);
    };

    const columns = [
        {
            title: 'Nombre de Sucursal',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Direccion',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Persona encargada',
            dataIndex: 'contact_name',
            key: 'contact_name',
        },
        {
            title: 'Telefono de sucursal',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Correo electronico',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (values) => (
                <div>
                    <Button type="link" icon={<BiSolidEditAlt />} size={20} onClick={() => handleAddBranchClick(values)} />
                    <Button type="link" size={20} icon={<AiOutlineDelete />} onClick={() => { console.log('se abre el modal de delete') }} />
                </div>
            ),
        },
    ];

    return (

        <div className='card card-body'>
            <div className='card-header'>
                <h5 className='card-title'>
                    BranchesView
                </h5>
                <div className=' d-flex flex-column flex-sm-wrap  flex-lg-row justify-content-between align-items-center py-3 gap-3 gap-md-0'>
                    <div className='col-lg-4 col-md-12 py-2'>
                        <Search placeholder="Buscar usuarios" />
                    </div>
                    <div className='col-lg-6 col-md-12 py-2'>
                        <div className='d-flex flex-column flex-sm-wrap flex-lg-row justify-content-end align-items-lg-center align-items-sm-start flex-wrap py-3'>
                            <Button
                                className='m-1'
                                type="primary"
                                icon={<PlusCircleOutlined />}
                                onClick={() => { handleAddBranchClick() }}
                            >
                                Nuevo
                            </Button>
                            <Button
                                className='m-1'
                                type="default"
                                icon={<FilterOutlined />}>
                                Sucursal
                            </Button>
                            <Button
                                className='m-1'
                                type="default"
                                icon={<FilterOutlined />}>
                                tipo de usuario
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
            <div className='card-body'>
                <div className='row'>
                    <div className='mt-4 table-responsive'>
                        <Table
                            columns={columns}
                            dataSource={branchData}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>

            <BranchesModal
                isVisible={isModalVisible}
                onConfirm={handleOk}
                onCancel={handleCancel}
                branchData={branchToEdit}
                onBranchUpdate={refreshTable}
            />

        </div>
    );
};
