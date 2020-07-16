import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.dark.css'
import './assets/css/general.css'

import { List, Typography, Popconfirm, Button } from 'antd'
import {
  EditOutlined,
  QuestionOutlined,
  CheckOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons'
import DrawerForm from './components/interface/DrawerForm'
import TaskForm from './components/forms/TaskForm'
import firebaseApi from './api'
import firebase from './firebase'

const { Title } = Typography

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const db = firebase.firestore()
    const unsuscribe = db.collection('tasks').onSnapshot(snapshot => {
      const tasksData = []
      snapshot.forEach(doc => tasksData.push({ ...doc.data(), id: doc.id }))
      setTasks(tasksData)
    })
    return unsuscribe
    // fetchTasks()
  }, [])

  // const fetchTasks = async () => {
  //   setTasks(await firebaseApi.fetchTasks())
  // }

  const handleDelete = async id => {
    firebaseApi.deleteTask(id)
    // fetchTasks()
  }

  return (
    <>
      <div className='container py-5'>
        <div className='d-flex justify-content-between align-items-center'>
          <Title>Lista de tareas</Title>
          <DrawerForm
            type='primary'
            icon={<PlusOutlined />}
            drawerTitle='Agregar tarea'
            buttonTitile='Agregar'
          >
            <TaskForm
            // updateData={fetchTasks}
            />
          </DrawerForm>
        </div>
        <List itemLayout='horizontal' bordered>
          {tasks.map(task => (
            <List.Item
              key={task.id}
              actions={[
                <DrawerForm
                  type='link'
                  icon={<EditOutlined />}
                  drawerTitle='Editar tarea'
                >
                  <TaskForm
                    // updateData={fetchTasks}
                    item={task}
                  />
                </DrawerForm>,
                <Popconfirm
                  title='Quieres borrar esta tarea?'
                  onConfirm={() => handleDelete(task.id)}
                >
                  <Button icon={<DeleteOutlined />} type='link' />
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                avatar={
                  task.isCompleted ? <CheckOutlined /> : <QuestionOutlined />
                }
                title={task.name}
                description={task.description}
              />
            </List.Item>
          ))}
        </List>
      </div>
    </>
  )
}

export default App
