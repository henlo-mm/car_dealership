import { Button, Flex, Form, Input, InputNumber, Modal, Spin, Upload, message, notification } from 'antd'
import { useEffect, useState } from 'react'
import { createPart, updatePart } from '../../../services/parts';
import { UploadOutlined } from '@ant-design/icons';
import { CiImageOn } from 'react-icons/ci';


export const PartsModal = ({ isVisible, onConfirm, onCancel, partData, onPartUpdate }) => {

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imgData, setimgData] = useState([])

  useEffect(() => {
    if (partData && isVisible) {
      form.setFieldsValue({ ...partData, image: [] });
    }
  }, [partData])

  const onClose = () => {
    if (onCancel) {
      onCancel();
    }
    form.resetFields();
  }

  const onSubmit = async (values) => {

    try {

      setLoading(true);

      if (partData) {

        const formData = new FormData();
        formData.append("code", values.code);
        formData.append("name", values.name);
        formData.append("quantity", values.quantity);
        formData.append("description", values.description);
        formData.append("price", values.price);
        if (imgData[0] == undefined) {
          formData.append("image", partData.image);
        } else {
          formData.append("image", imgData[0]);
        }

        // Imprimir los datos en la consola
        for (const pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }

        await updatePart(partData.id, formData);

        onPartUpdate();

        if (onConfirm) {
          onConfirm();
        }

        notification.success({
          message: 'Operacion exitosa',
          description: 'El repuesto ha sido Actualizado',
        });

        form.resetFields();

      } else {

        const formData = new FormData();
        formData.append("code", values.code);
        formData.append("name", values.name);
        formData.append("quantity", values.quantity);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("image", imgData[0]);

        // Imprimir los datos en la consola
        for (const pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }

        await createPart(formData);

        onPartUpdate();

        if (onConfirm) {
          onConfirm();
        }

        notification.success({
          message: 'Operacion exitosa',
          description: 'El repuesto ha sido creado',
        });
        
        form.resetFields();
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
      title={partData ? "Editar repuesto" : "Crear repuesto"}
      open={isVisible}
      onCancel={onClose}
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
                  label={<label className="form-label"> Nombre de pieza </label>}
                  rules={[{ required: true, message: 'campo obligatorio' }]}
                >
                  <Input
                    maxLength={200}
                    className='form-control'
                    placeholder='Nombre'
                  />
                </Form.Item>
              </div>
              <div className='col-12 col-md-6'>
                <Form.Item
                  name="code"
                  label={<label className="form-label"> Codigo de pieza </label>}
                  rules={[{ required: true, message: 'campo obligatorio' }]}
                >
                  <Input
                    maxLength={20}
                    className='form-control'
                    placeholder='Codigo'
                  />
                </Form.Item>
              </div>
              <div className='col-12 col-md-6'>
                <Form.Item
                  name="quantity"
                  label={<label className="form-label"> Cantidad </label>}
                  rules={[{ required: true, message: 'campo obligatorio' }]}
                >
                  <Input
                    type='number'
                    className='form-control'
                    placeholder='Cantidad'
                  />
                </Form.Item>
              </div>
              <div className='col-12 col-md-6'>
                <Form.Item
                  name="price"
                  label={<label className="form-label"> Precio </label>}
                  rules={[{ required: true, message: 'campo obligatorio' }]}
                >
                  <Input
                    maxLength={200}
                    className='form-control'
                    placeholder='Precio'
                  />
                </Form.Item>
              </div>
              <div className='col-12'>
                <Form.Item
                  name="description"
                  label={<label className="form-label"> Descripción </label>}
                  rules={[{ required: true, message: 'campo obligatorio' }]}
                >
                  <Input.TextArea
                    className='form-control'
                    placeholder='Descripción'
                  />
                </Form.Item>
              </div>
              <div className='col-12'>
                <Form.Item
                  name="image"
                  label={<label className="form-label"> Foto </label>}
                  rules={[
                    {
                      required: false,
                      message: 'campo obligatorio',
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
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e && e.fileList}
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
                        if (file && file.size > 500000) {
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
                    <Button icon={<UploadOutlined />}>Cargar Foto</Button>
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
