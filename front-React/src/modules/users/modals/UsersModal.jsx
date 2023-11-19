import { Modal, Form, Spin, Input, Button, notification, Select, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { createUser, updateUser } from '../../../services/user';
import { getBranches } from '../../../services/branches';
import { UploadOutlined } from '@ant-design/icons';
import { CiImageOn } from 'react-icons/ci';

export const UsersModal = ({ isVisible, onConfirm, onCancel, userData, onUserUpdate }) => {

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [branchList, setBranchList] = useState([]);
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
        if (userData && isVisible) {
            //Si hay data entonces configure la data
            form.setFieldsValue({
                ...userData,
                avatar: []
            })
        }
    }, [userData])


    const onClose = () => {
        if (onCancel) {
            onCancel();
        }
        form.resetFields();
    }

    // funcioinalidad, que al ejecutar un submit, nos permite enviar los datos en una peticion http y ejecutarlo. 

    const onSubmit = async (values) => {
        try {
            console.log(values)
            //todo
            // los values del form
            setLoading(true);
            //Hacer validaciones nezar peticiones httpcesarias

            if (userData) {

                const formData = new FormData();

                formData.append("address", values.address);
                formData.append("branch", values.branch);
                formData.append("document", values.document);
                formData.append("email", values.email);
                formData.append("lastName", values.lastName);
                formData.append("name", values.name);
                formData.append("phone", values.phone);
                formData.append("role", values.role);
                formData.append("secondPhone", values.secondPhone);
                if (imgData[0] == undefined) {
                    formData.append("avatar", userData.avatar);
                } else {
                    formData.append("avatar", imgData[0]);
                }

                await updateUser(userData.id, formData);

                onUserUpdate();
                setimgData([]);
                form.resetFields();


                if (onConfirm) {
                    onConfirm();
                }
                notification.success({
                    message: 'Operacion exitosa',
                    description: 'El usuario ha sido actualizado',
                });

            } else {

                // await createUser( {...values, avatar: imgData});

                console.log("form enviado", { ...values, avatar: imgData[0] })

                onUserUpdate();

                form.resetFields();


                if (onConfirm) {
                    onConfirm();
                }
                notification.success({
                    message: 'Operacion exitosa',
                    description: 'El usuario ha sido creado',
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
            title={userData ? "Editar usuario" : "Crear usuario"}
            open={isVisible}
            onCancel={onClose}
            // onOk={() => {validateForm}}
            width={800}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancelar
                </Button>,
                <Button key="edit" type='primary' onClick={form.submit}>
                    aceptar
                </Button>
            ]}
        >
            {/* Formulario para agregar/editar usuario */}
            <Spin
                spinning={loading}
            >
                <div className='card-body row'>
                    <Form
                        form={form}
                        layout='vertical'
                        onFinish={onSubmit}
                    >
                        <div className="row">
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
                                    name="lastName"
                                    label={<label className="form-label"> Apellido </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Apellidos'
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="phone"
                                    label={<label className="form-label"> Teléfono 1  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Telefono 1'
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="secondPhone"
                                    label={<label className="form-label"> Teléfono 2  </label>}
                                    rules={[{ required: false, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Telefono 2'
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="address"
                                    label={<label className="form-label"> Dirección  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Dirección'
                                    />
                                </Form.Item>
                            </div>

                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="email"
                                    label={<label className="form-label"> Correo </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Correo Electronico'
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="document"
                                    label={<label className="form-label"> Documento  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Documento de identidad'
                                    />
                                </Form.Item>
                            </div>
                            {/* nuevos campos */}
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="role"
                                    label={<label className="form-label"> Rol </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Select
                                        style={{
                                            width: '100%',
                                        }}
                                        options={
                                            optionsRoles &&
                                            optionsRoles?.map((v) => ({
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
                                    name="avatar"
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
