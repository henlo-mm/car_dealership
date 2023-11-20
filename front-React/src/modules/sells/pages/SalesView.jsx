import { Button, Input, Table } from 'antd';
import React, { useState , useEffect } from 'react'
import { SalesModal } from '../modals/SalesModal';
import { DeleteModal } from '../../../core/modals/DeleteModal';
import { getSales, deleteSale } from '../../../services/sales';
import { PlusCircleOutlined, FilterOutlined } from '@ant-design/icons';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiSolidEditAlt } from 'react-icons/bi';
import dayjs from 'dayjs';
import { IoMdRefresh } from 'react-icons/io';


const { Search } = Input;


export const SalesView = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sellToEdit, setSellToEdit] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState(null);
  const [searchText, setSearchText] = useState("");

  const refreshTable = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };


  const fetchData = async () => {
    try {
        const dataSales = await getSales();
        setSalesData(dataSales);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    fetchData();
}, [refreshKey]);


  const columns = [
    {
      title: 'Codigo Venta',
      dataIndex: 'id',
      key: 'id',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return String(record.vehicle.make).toLowerCase().includes(value.toLowerCase()) ||
            String(record.vehicle.model).toLowerCase().includes(value.toLowerCase()) ||
            String(record.seller.name).toLowerCase().includes(value.toLowerCase()) ||
            String(record.seller.lastname).toLowerCase().includes(value.toLowerCase()) ||
            String(record.client.name).toLowerCase().includes(value.toLowerCase()) ||
            String(record.client.lastname).toLowerCase().includes(value.toLowerCase()) ||
            String(record.id).toLowerCase().includes(value.toLowerCase())
    }
    },
    {
      title: 'Vehiculo',
      dataIndex: 'vehicle',
      key: 'vehicle',
      render: (vehicle) => {
        return <p>  {`${vehicle.make} ${vehicle.model}`} </p>
      }
    },
    {
      title: 'Vendedor',
      dataIndex: 'seller',
      key: 'seller',
      render: (seller) => {
        return <p>  {`${seller.name} ${seller.lastname}`} </p>
      }
    },
    {
      title: 'Valor venta',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Fecha venta',
      dataIndex: 'sale_date',
      key: 'sale_date',
      render: (sale_date) => dayjs(sale_date).format('YYYY-MM-DD')
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (values) => (
        <div>          
          <Button type="link" icon={<AiOutlineDelete size={20} onClick={() => showDeleteConfirmationModal(values)} />} />
        </div>
      ),
    },
  ]

  const handleCancelDelete = () => {
    setIsModalDeleteVisible(false);
  };

  const showDeleteConfirmationModal = (data) => {
    setSaleToDelete(data.id);
    setIsModalDeleteVisible(true);
  };

  const handleDeleteSale = async () => {
    try {
        await deleteSale(saleToDelete);
        refreshTable();
        setIsModalDeleteVisible(false);
    } catch (error) {
        console.error('Error:', error);
        setIsModalDeleteVisible(false);
    }
  };

  const handleAddSaleClick = (values) => {
    console.log('se abre el modal?')
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    // todo: logica para cerrar el modal
    console.log('se ejecuto el cancelar')
    setIsModalVisible(false);
    setWorkOrderToEdit(null)
};

  const handleOk = () => {
    console.log('se ejecuto el ok')
    setIsModalVisible(false);
    setWorkOrderToEdit(null);
};

  return (

    <div className='card card-body'>
      <div className='card-header'>
        <h5 className='card-title h3'>
          Ventas
        </h5>
        <div className=' d-flex flex-column flex-sm-wrap  flex-lg-row justify-content-between align-items-center py-3 gap-3 gap-md-0'>
          <div className='col-lg-4 col-md-12 py-2'>
            <Input.Search
                placeholder="Buscar"
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
                onClick={() => { handleAddSaleClick(); }}
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
            </div>

          </div>
        </div>
      </div>
      <div className='card-body'>
        <div className='row'>
          <div className='mt-4 table-responsive'>
            <Table
              columns={columns}
              dataSource={salesData}
              loading={loading}
            />
          </div>
        </div>
      </div>


       <SalesModal
        isVisible={isModalVisible}
        onConfirm={handleOk}
        onCancel={handleCancel}
        onSaleUpdate={refreshTable}
      />

      <DeleteModal
          isVisible={isModalDeleteVisible}
          onConfirm={handleDeleteSale}
          onCancel={handleCancelDelete}
          title={"Eliminar Orden de trabajo"}
          message={"¿Está seguro(a) de eliminar esta orden de trabajo"}
      />
    </div>
  );
}
