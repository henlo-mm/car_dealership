import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Input, Select, notification, Image, Tag } from 'antd';
import { PlusCircleOutlined, FilterOutlined, EditOutlined, EyeOutlined, ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { VehiclesModal } from '../modals/VehiclesModal';
import { deleteVehicle, getvehicles } from '../../../services/vehicles';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiSolidEditAlt } from 'react-icons/bi';
import { IoMdRefresh } from 'react-icons/io';
import { getBranches } from '../../../services/branches';
import { DeleteModal } from '../../../core/modals/DeleteModal';
import dayjs from 'dayjs';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { FileExcelOutlined } from '@ant-design/icons';

export const VehiclesView = () => {
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [vehiclesData, setVehiclesData] = useState([]);
    const [vehicleToEdit, setVehicleToEdit] = useState(null);
    const [vehicleToDelete, setVehicleToDelete] = useState(null);
    const [branchList, setBranchList] = useState([]);
    const [searchText, setSearchText] = useState("");




    const fetchBranchData = async () => {
        try {
            const data = await getBranches();
            setBranchList(data);
        } catch (error) {
            console.error('Error branch list:', error);
        } finally {
            setLoading(false);
        }
    };



    const refreshTable = () => {
        setSearchText("")
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const fetchVehiclesData = async () => {
        try {
            const data = await getvehicles();
            setVehiclesData(data);

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehiclesData();
        fetchBranchData();
    }, [refreshKey]);

    const handleAddVehicleClick = (values) => {

        if (values) {
            setVehicleToEdit(values)
        }

        setIsModalVisible(true);
    };

    const filterBranchData = async (id) => {

        setLoading(true);

        try {
            let vehiclesList = await getvehicles();
            setVehiclesData(vehiclesList.filter((vehicles) => vehicles.branch == id))
            setLoading(false);

        } catch (error) {
            notification.error({
                message: 'Error',
                description: error.message,
            });
        }
    }

    const handleCancel = () => {
        // todo: logica para cerrar el modal
        setIsModalVisible(false);
    };
    const handleOk = () => {
        // todo: logica para crear un usuario nuevo
        setIsModalVisible(false);
    };

    const findNameById = (idToFind, data) => {
        const foundItem = data.find(item => item.id === idToFind);

        return foundItem ? foundItem.name : null;
    };


    const showDeleteConfirmationModal = (vehicle) => {
        setVehicleToDelete(vehicle.id);
        setIsDeleteModalVisible(true);
    };

    const handleDeleteVehicle = async () => {
        try {
            await deleteVehicle(vehicleToDelete);
            refreshTable();
            setIsDeleteModalVisible(false);
            notification.success({
                message: 'Operacion exitosa',
                description: 'El vehiculo ha sido eliminado',
            });
        } catch (error) {
            console.error('Error:', error);
            setIsDeleteModalVisible(false);
            notification.error({
                message: 'Error',
                description: error.message,
            });

        }
    };

    const handleCancelVehicle = () => {
        setIsDeleteModalVisible(false);
    };


    const exportToExcel = () => {
        const data = vehiclesData.map(vehicle => ({
            ID: vehicle.id,
            Model: vehicle.model,
            Make: vehicle.make,
            Car_plate: vehicle.car_plate || 'N/A',
            Color: vehicle.color,
            Year: vehicle.year,
            Make: vehicle.make,
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Vehiculos');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'vehiculos.xlsx');
    };

    const columns = [
        {
            title: '',
            // dataIndex: 'image',
            key: 'image',
            with: 150,
            render: (values) => (
                <Image
                    width={100}
                    src={values.image}
                    placeholder={
                        <Image
                            preview={false}
                            src={values.image}
                            width={100}
                        />
                    }
                />
            ),
        },
        {
            title: 'Modelo',
            dataIndex: 'model',
            key: 'model',
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return String(record.model).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.make).toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title: 'Marca',
            dataIndex: 'make',
            key: 'make',
        },
        {
            title: 'Año',
            dataIndex: 'year',
            key: 'year',
            sorter: (a, b) => a.year - b.year,
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
        },
        {
            title: 'Placa',
            dataIndex: 'car_plate',
            key: 'car_plate',
        },
        {
            title: 'Sucursal',
            dataIndex: 'branch',
            key: 'branch',
            render: (branch) => {
                return <p> {findNameById(branch, branchList)} </p>
            }
        },
        {
            title: 'Estado',
            dataIndex: 'is_for_sale',
            key: 'is_for_sale',
            render: (is_for_sale) => {
                return <Tag
                    icon={is_for_sale ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />}
                    color={is_for_sale ? 'success' : 'processing'}
                >
                    {is_for_sale ? 'para la venta' : 'no se vende'}
                </Tag>
            },

        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (values) => (
                <div>
                    <Button
                        type="link"
                        icon={<BiSolidEditAlt size={20} />}
                        onClick={() => handleAddVehicleClick(values)}
                    />
                    <Button
                        type="link"
                        icon={<AiOutlineDelete size={20} />}
                        onClick={() => showDeleteConfirmationModal(values)}
                    />
                </div>
            ),
        },
    ];


    return (

        <div className='card card-body'>
            <div className='card-header'>
                <h5 className='card-title h3'>
                    Vehículos
                </h5>
                <div className=' d-flex flex-column flex-sm-wrap  flex-lg-row justify-content-between align-items-center py-3 gap-3 gap-md-0'>
                    <div className='col-lg-4 col-md-12 py-2'>
                        <Input.Search
                            placeholder="Buscar Vehículos"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onSearch={(value) => {
                                setSearchText(value)
                            }}
                        />
                    </div>
                    <div className='col-lg-6 col-md-12 py-2'>
                        <div className='d-flex flex-column flex-sm-wrap flex-lg-row justify-content-end align-items-lg-center align-items-sm-start flex-wrap py-3'>
                            <Button
                                className='m-1'
                                type="primary"
                                icon={<PlusCircleOutlined />}
                                onClick={() => { handleAddVehicleClick(); }}
                            >
                                Nuevo
                            </Button>
                            <Button
                                className='m-1'
                                type="default"
                                icon={<IoMdRefresh />}
                                onClick={refreshTable}
                            >
                            </Button>
                            <Button
                                className='m-1'
                                type="primary"
                                icon={<FileExcelOutlined />}
                                onClick={exportToExcel}
                            >
                                Descargar Excel
                            </Button>

                            <Select
                                placeholder="Sucursal"
                                style={{
                                    width: '25%',
                                }}
                                suffixIcon={<FilterOutlined />}
                                onChange={
                                    (id) => filterBranchData(id)
                                }
                                autoClearSearchValue={true}
                                options={
                                    branchList &&
                                    branchList?.map((v) => ({
                                        value: v.id,
                                        label: `${v.name}`,
                                    })
                                    )
                                }
                            />
                        </div>

                    </div>
                </div>
            </div>
            <div className='card-body'>
                <div className='row'>
                    <div className='mt-4 table-responsive'>
                        <Table
                            columns={columns}
                            dataSource={vehiclesData}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>

            <DeleteModal
                isVisible={isDeleteModalVisible}
                onConfirm={handleDeleteVehicle}
                onCancel={handleCancelVehicle}
                title={"Eliminar Vehiculo"}
                message={"¿Está seguro(a) de eliminar este vehiculo?"}
            />

            <VehiclesModal
                isVisible={isModalVisible}
                onConfirm={handleOk}
                onCancel={handleCancel}
                vehicleData={vehicleToEdit}
                onVehicleUpdate={refreshTable}
            />

        </div>
    );
};
