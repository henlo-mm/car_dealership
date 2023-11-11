import { Button, DatePicker, Form, Input, Modal, Radio, Select, Spin, Switch, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { getBranches } from '../../../services/branches';
import { carBrands } from '../.config/carbrands'
import { colorList } from '../.config/colorsList'
import { UploadOutlined } from '@ant-design/icons';

export const VehiclesModal = ({ isvisible, onCancel }) => {

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [selectedYear, setSelectedYear] = useState(false);
    const [branchList, setBranchList] = useState([]);
    const [carsList, setCarsList] = useState(carBrands);
    const [colorsList, setColorsList] = useState(colorList);
    const [imgData, setImgData] = useState([]);

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

    useEffect(() => {
        fetchBranchData();
    }, []);

    const onClose = () => {
        if (onCancel) {
            onCancel();
        }
        form.resetFields();
        console.log('se ejecuto el cancelar')
    }




    const onSubmit = async (values) => {
        try {

            const year = moment(values.date).year();
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("year", year);
            console.log('Año enviado al backend:', year);
            console.log(formData);
            console.log(values)

            // Imprimir los datos en la consola
            for (const pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal
            title={"creacion de vehiculo"}
            open={isvisible}
            onCancel={onClose}
            width={800}
            footer={[
                <Button
                    key="cancel"
                    onClick={onClose}
                >
                    Cancelar
                </Button>,
                <Button
                    key="edit"
                    type='primary'
                    onClick={form.submit}
                >
                    aceptar
                </Button>
            ]}
        >
            <Spin
                spinning={loading}
            >
                <div className='card-body row'>
                    <Form
                        form={form}
                        layout='vertical'
                        onFinish={onSubmit}
                    >
                        <div className='row'>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="name"
                                    label={<label className="form-label"> Nombre  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='nombre'
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="year"
                                    label={<label className="form-label"> Modelo  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <DatePicker
                                        picker="year"
                                        onChange={(date, dateString) => setSelectedYear(dateString)}
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="make"
                                    label={<label className="form-label"> Marca  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Select
                                        style={{
                                            width: '100%',
                                        }}
                                        options={
                                            carsList &&
                                            carsList?.map((v) => ({
                                                value: v.name,
                                                label: `${v.name}`,
                                            })
                                            )
                                        }
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="branch"
                                    label={<label className="form-label"> Sucursal  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Select
                                        style={{
                                            width: '100%',
                                        }}
                                        options={
                                            branchList &&
                                            branchList?.map((v) => ({
                                                value: v.id,
                                                label: `${v.name}`,
                                            })
                                            )
                                        }
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="color"
                                    label={<label className="form-label"> Color  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Select

                                        style={{
                                            width: '100%',
                                        }}
                                        options={
                                            colorsList &&
                                            colorsList?.map((v) => ({
                                                value: v.name,
                                                label: `${v.name}`,
                                            })
                                            )
                                        }
                                    />
                                </Form.Item>
                            </div>

                            <div className='col-12 col-md-6 d-flex'>
                                <Form.Item
                                    name="is_for_sale"
                                    label={<label className="form-label"> Habilitado para vender  </label>}
                                    rules={[{ required: false, message: 'campo obligatorio' }]}
                                >
                                    <Switch

                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12'>
                                <Form.Item
                                    name="image"
                                    label={<label className="form-label"> Foto </label>}
                                    valuePropName='fileList'
                                    getValueFromEvent={(event) => {
                                        return event?.fileList
                                    }}
                                    rules={[
                                        {
                                            required: false,
                                            message: 'campo obligatorio'
                                        },
                                        {
                                            validator(_, fileList) {
                                                return new Promise((resolve, rejected) => {
                                                    if (fileList[0].size > 500000) {
                                                        rejected('imagen demasiado pesada');
                                                    } else {
                                                        resolve('carga exitosa');
                                                    }
                                                })
                                            }
                                        }
                                    ]}
                                >

                                    <Upload
                                        maxCount={1}
                                        beforeUpload={(file) => {
                                            return new Promise((resolve, rejected) => {
                                                if (file.size > 500000) {
                                                    rejected('imagen demasiado pesada');
                                                    message.error('imagen demasiado pesada')
                                                } else {
                                                    resolve('carga exitosa');
                                                    file.status = "done";
                                                }
                                            })
                                        }}

                                        listType='picture'
                                       
                                        // action to custom request
                                        customRequest={(info) => {
                                            setImgData([info])
                                        }}

                                    >
                                        <Button
                                            icon={<UploadOutlined />}
                                        >Cargar Foto
                                        </Button>
                                        
                                    </Upload>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>

                </div>

            </Spin>
        </Modal>
    )
}
