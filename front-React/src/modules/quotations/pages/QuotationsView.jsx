import { Button, Input, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { QuotationsModal } from '../modals/QuotationsModal';
import { PlusCircleOutlined, FilterOutlined } from '@ant-design/icons';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiSolidEditAlt } from 'react-icons/bi';


const { Search } = Input;

export const QuotationsView = () => {

    const [quotationsData, setQuotationsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(true)

    const handleCancel = () => {
        setOpenModal(false);
    }

    const columns = [
        {
            title: 'Codigo cotizacion',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Vendedor',
            dataIndex: 'seller',
            key: 'seller',
        },
        {
            title: 'Vehiculo',
            dataIndex: 'vehicle',
            key: 'vehicle',
        },
        {
            title: 'Valor ',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Fecha cotizacion',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (values) => (
                <div>
                    <Button
                        type="link"
                        icon={<BiSolidEditAlt />}
                        size={20}
                    />
                    <Button
                        type="link"
                        size={20}
                        icon={<AiOutlineDelete />}
                    />
                </div>
            ),
        },
    ]

    return (

        <div className='card card-body'>
            <div className='card-header'>
                <h5 className='card-title'>
                    QuotationsView
                </h5>
                <div className=' d-flex flex-column flex-sm-wrap  flex-lg-row justify-content-between align-items-center py-3 gap-3 gap-md-0'>
                    <div className='col-lg-4 col-md-12 py-2'>
                        <Search placeholder="Buscar ventas" />
                    </div>
                    <div className='col-lg-6 col-md-12 py-2'>
                        <div className='d-flex flex-column flex-sm-wrap flex-lg-row justify-content-end align-items-lg-center align-items-sm-start flex-wrap py-3'>
                            <Button
                                className='m-1'
                                type="primary"
                                icon={<PlusCircleOutlined />}
                                onClick={() => setOpenModal(true)}
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
                            dataSource={quotationsData}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>


            <QuotationsModal
            isVisible={openModal}
            // onConfirm={handleOk}
            onCancel={handleCancel}
            // branchData={branchToEdit}
            // onBranchUpdate={refreshTable}
           />

            {/* <DeleteModal
            isVisible={isDeleteModalVisible}
            onConfirm={handleDeleteBranch}
            onCancel={handleCancelDeleteBranch}
            title={"Eliminar Sucursal"}
            message={"¿Está seguro(a) de eliminar esta sucursal?"}
          /> */}
        </div>
    );
}
