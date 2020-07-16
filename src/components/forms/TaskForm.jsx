import React, { useEffect } from 'react'
import { Form, Input, Button, Switch, notification } from 'antd'
import firebaseApi from '../../api'

const { Item } = Form
const { TextArea } = Input

const TaskForm = ({
  item,
  // updateData,
  closeDrawer
}) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (item) {
      form.setFieldsValue(item)
    }
  }, [item])

  const handleSubmit = values => {
    if (item) {
      firebaseApi.editTask({ ...item, ...values })
      successAlert('tarea', true)
    } else {
      firebaseApi.addTask(values)
      successAlert('tarea', false)
      form.resetFields()
    }
    closeDrawer()
    // updateData()
  }

  const successAlert = (itemName, isEdit) => {
    notification.open({
      placement: 'bottomLeft',
      type: 'success',
      message: 'Hecho',
      description: `El/la ${itemName} se ha ${
        isEdit ? 'actualizado' : 'registrado'
      } correctamente`
    })
  }

  return (
    <Form
      form={form}
      layout='vertical'
      // initialValues={item}
      onFinish={handleSubmit}
    >
      <Item name='name' label='Nombre'>
        <Input />
      </Item>
      <Item name='description' label='Descripción'>
        <TextArea />
      </Item>
      <Item
        name='isCompleted'
        label='Hecho'
        valuePropName='checked'
        initialValue={false}
      >
        <Switch />
      </Item>
      <Item>
        <Button type='primary' htmlType='submit' block>
          {item ? 'Editar' : 'Crear'}
        </Button>
      </Item>
    </Form>
  )
}

export default TaskForm
