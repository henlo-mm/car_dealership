import { Button, DatePicker, Form, Input, Modal, Radio, Select, Spin, Switch, Upload, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { getBranches } from '../../../services/branches';
import { carBrands } from '../.config/carbrands'
import { colorList } from '../.config/colorsList'
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import dayjs from 'dayjs';
import { createVehicle, updateVehicle } from '../../../services/vehicles';
import { CiImageOn } from 'react-icons/ci';

export const VehiclesModal = ({ isVisible, onConfirm, onCancel, vehicleData, onVehicleUpdate }) => {

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [selectedYear, setSelectedYear] = useState(false);
    const [branchList, setBranchList] = useState([]);
    const [carsList, setCarsList] = useState(carBrands);
    const [colorsList, setColorsList] = useState(colorList);
    const [imgData, setimgData] = useState([]);

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

    useEffect(() => {
        if (vehicleData && isVisible) {
            form.setFieldsValue({
                ...vehicleData,
                year: dayjs().set('year', vehicleData.year),
                image: []
            });
        }
    }, [vehicleData])

    const onClose = () => {
        if (onCancel) {
            onCancel();
        }
        form.resetFields();
        console.log('se ejecuto el cancelar')
    }




    const onSubmit = async (values) => {

        try {

            setLoading(true);
            console.log("vehicleData", vehicleData);

            if (vehicleData) {

                console.log("actualización de vehiculo")
                const year = parseInt(values.year.format('YYYY'));
                const formData = new FormData();
                formData.append("make", values.make);
                formData.append("year", year);
                formData.append("model", values.model);
                formData.append("branch", values.branch);
                formData.append("color", values.color);
                formData.append("is_for_sale", values.is_for_sale);

                if (imgData[0] == undefined) {
                    formData.append("image", vehicleData.image);
                } else {
                    formData.append("image", imgData[0]);
                }
                console.log({ values });


                // console.log('Año enviado al backend:', year);
                // console.log(formData);
                // console.log(values);

                // Imprimir los datos en la consola
                for (const pair of formData.entries()) {
                    console.log(pair[0], pair[1]);
                }

                await updateVehicle(vehicleData.id,formData);

                onVehicleUpdate();

                form.resetFields();

                if (onConfirm) {
                    onConfirm();
                }
                notification.success({
                    message: 'Operacion exitosa',
                    description: 'El vehiculo ha sido actualizado',
                });

            } else {

                console.log("creacion de vehiculo",)
                const year = parseInt(values.year.format('YYYY'));
                const formData = new FormData();
                formData.append("make", values.make);
                formData.append("year", year);
                formData.append("model", values.model);
                formData.append("branch", values.branch);
                formData.append("color", values.color);
                formData.append("is_for_sale", values.is_for_sale);

                if (imgData[0] == undefined) {
                    formData.append("image", vehicleData.image);
                } else {
                    formData.append("image", imgData[0]);
                }

                console.log({ values });

                // Imprimir los datos en la consola
                for (const pair of formData.entries()) {
                    console.log(pair[0], pair[1]);
                }

                await createVehicle(formData);

                onVehicleUpdate();

                if (onConfirm) {
                    onConfirm();
                }

                form.resetFields();

                notification.success({
                    message: 'Operacion exitosa',
                    description: 'El vehiculo ha sido creado',
                });

            }

        } catch (error) {
            notification.error({
                message: 'Error',
                description: error.message,
            });
        }

        setLoading(false);
    }

    return (
        <Modal
            title={"creacion de vehiculo"}
            open={isVisible}
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
                        initialValues={{ is_for_sale: false }}
                    >
                        <div className='row'>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="model"
                                    label={<label className="form-label"> Nombre  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Nombre'
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
                                    //onChange={(date, dateString) => setSelectedYear(dateString)}
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
                                    valuePropName="checked"
                                >
                                    <Switch
                                        defaultChecked={false}
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
                                                return new Promise((resolve, reject) => {
                                                    if (fileList[0] && fileList[0].size > 500000) {
                                                        reject('imagen demasiado pesada');
                                                        message.error('imagen demasiado pesada');
                                                    } else {
                                                        resolve(fileList[0]);
                                                    }
                                                });
                                            }
                                        }
                                    ]}
                                >

                                    <Upload
                                        listType="picture"
                                        iconRender={() => {
                                            return <CiImageOn size={25} />
                                        }}
                                        accept='.png, .jpg, .jpge'
                                        maxCount={1}
                                        beforeUpload={(file) => {
                                            return new Promise((resolve, reject) => {
                                                if (file && file.size > 700000) {
                                                    reject(['imagen demasiado pesada']);
                                                    message.error('imagen demasiado pesada');
                                                } else {
                                                    resolve(file);
                                                }
                                            });
                                        }}
                                        customRequest={(info) => {
                                            setimgData([info.file]);

                                        }}
                                        onChange={(event) => {
                                            if (event) {
                                                setimgData([event]);
                                                console.log(imgData);
                                            }
                                        }}
                                        onRemove={(event) => {
                                            if (event) {
                                                // console.log('ejecutamos el on remove', event);
                                                setimgData([]);
                                                // console.log(imgData)
                                            }
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
