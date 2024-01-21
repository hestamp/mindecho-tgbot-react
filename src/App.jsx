import { useEffect, useState } from 'react'

import styles from './App.module.css'

import { Routes, Route, useNavigate } from 'react-router-dom'
import MyCalendar from './components/Tools/MyCalendar/MyCalendar'
import { MdAdd } from 'react-icons/md'
import UserComponent from './components/UserComponent/UserComponent'

const taskArr1 = [
  { name: 'PC instruction', lvl: 1 },
  { name: 'How to read right', lvl: 3 },
  { name: 'Unleash your brain', lvl: 4 },
]

function App() {
  const [taskArr, setTaskArr] = useState(taskArr1)

  // New states for modal visibility and input value
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTaskName, setNewTaskName] = useState('')

  const [maxDate, setMaxDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const renderModal = () => (
    <div className={styles.modal}>
      <input
        autoFocus
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        placeholder="Enter task name"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  )

  const handleAddTask = () => {
    setTaskArr([...taskArr, { name: newTaskName, lvl: 1 }])
    setNewTaskName('') // Reset the input field
    setIsModalOpen(false) // Close the modal
  }

  useEffect(() => {
    const today = new Date()
    const maxDate = new Date(today)
    maxDate.setDate(today.getDate() + 6)
    setMaxDate(maxDate)
  }, [])

  return (
    <div className={styles.App}>
      <div className={styles.appBlock}>
        <div className={styles.mainpage}>
          <UserComponent />
          <div className={styles.miniblock}>
            <h2>MindCalendar</h2>
            <MyCalendar
              maxPlus={maxDate}
              valueDate={selectedDate}
              setDate={setSelectedDate}
              format="dd-MM-yyyy"
              sunOrMon="iso8601"
              startDate={new Date()}
            />
          </div>
          <div className={styles.miniblock}>
            <h2>MindTask</h2>
            <div className={styles.taskblock}>
              {taskArr.map((item, index) => (
                <div className={styles.minitask} key={index}>
                  <h3>{item.name}</h3>
                  <h4>{item.lvl.toString()}</h4>
                </div>
              ))}
            </div>
            <div
              onClick={() => setIsModalOpen(true)}
              className={styles.addbutt}
            >
              <MdAdd />
            </div>
          </div>
          {isModalOpen && renderModal()}
        </div>
      </div>
    </div>
  )
}

export default App
