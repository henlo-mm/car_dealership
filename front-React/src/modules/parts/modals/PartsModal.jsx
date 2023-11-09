import { Button, Form, Input, InputNumber, Modal, Spin, Upload, message } from 'antd'
import { useEffect, useState } from 'react'
import { createPart, updatePart } from '../../../services/parts';
import { UploadOutlined } from '@ant-design/icons';

export const PartsModal = ({ isVisible, onConfirm, onCancel, partData, onPartUpdate }) => {

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imgData, setimgData] = useState([])

  useEffect(() => {
    if (partData && isVisible) {
      form.setFieldsValue(partData);
    }
  }, [partData])

  const onClose = () => {
    if (onCancel) {
      onCancel();
    }
    form.resetFields();
  }

  const onSubmit = async (values) => {

    console.log(values);

    // try {
    //   setLoading(true);

    //   if (partData) {
    //     await updatePart(partData.id, values);
    //   } else {
    //     await createPart(values);
    //   }

    //   onPartUpdate();

    //   if (onConfirm) {
    //     onConfirm();
    //   }

    //   notification.success({
    //     message: 'Operacion exitosa',
    //     description: 'El repuesto ha sido creado',
    //   });

    // } catch (error) {
    //   notification.error({
    //     message: 'Error',
    //     description: error.message,
    //   });
    // }
    setLoading(false);
  }

  return (
    <Modal
      title={partData ? "Editar repuesto" : "Crear repuesto"}
      open={isVisible}
      onCancel={onclose}
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
                  name="code"
                  label={<label className="form-label"> Código </label>}
                  rules={[{ required: false, message: 'campo obligatorio' }]}
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
                  rules={[{ required: false, message: 'campo obligatorio' }]}
                >
                  <Input
                    type="number"
                    className='form-control'
                    placeholder='Cantidad'
                  />
                </Form.Item>
              </div>
              <div className='col-12 col-md-6'>
                <Form.Item
                  name="price"
                  label={<label className="form-label"> Precio </label>}
                  rules={[{ required: false, message: 'campo obligatorio' }]}
                >
                  <Input
                    type="text"
                    className='form-control'
                    placeholder='Precio'
                  />
                </Form.Item>
              </div>
              <div className='col-12'>
                <Form.Item
                  name="description"
                  label={<label className="form-label"> Descripción </label>}
                  rules={[{ required: false, message: 'campo obligatorio' }]}
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
          

                    // action to custom request
                    customRequest={(info) => { 
                      setimgData(['info'])
                    }}
                    
                  >
                    <Button
                      icon={<UploadOutlined />}
                    >Cargar Foto
                    </Button>
                    <br/>
                    
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
