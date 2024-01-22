import { useEffect, useMemo, useState } from 'react'

import styles from './App.module.css'

import { Routes, Route, useNavigate } from 'react-router-dom'
import MyCalendar from './components/Tools/MyCalendar/MyCalendar'
import { MdAdd } from 'react-icons/md'
import UserComponent from './components/UserComponent/UserComponent'

const taskArr1 = [
  {
    name: 'Insruction to my brain',
    lvl: 1,
    dates: [
      '2024-01-22T15:46:58.602Z',
      '2024-01-23T15:46:58.602Z',
      '2024-01-27T15:46:58.602Z',
      '2024-02-06T15:46:58.602Z',
      '2024-02-21T15:46:58.602Z',
      '2024-03-22T15:46:58.602Z',
    ],
  },
  {
    name: 'How to cook muffin',
    lvl: 3,
    dates: [
      '2024-01-22T15:46:58.602Z',
      '2024-01-23T15:46:58.602Z',
      '2024-01-27T15:46:58.602Z',
      '2024-02-06T15:46:58.602Z',
      '2024-02-21T15:46:58.602Z',
      '2024-03-22T15:46:58.602Z',
    ],
  },
  {
    name: 'Object in JS',
    lvl: 5,
    dates: [
      '2024-01-22T15:46:58.602Z',
      '2024-01-23T15:46:58.602Z',
      '2024-01-27T15:46:58.602Z',
      '2024-02-06T15:46:58.602Z',
      '2024-02-21T15:46:58.602Z',
      '2024-03-22T15:46:58.602Z',
    ],
  },
]

function App() {
  const [taskArr, setTaskArr] = useState(taskArr1)

  // New states for modal visibility and input value
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTaskName, setNewTaskName] = useState('')
  const [activeTask, setActiveTask] = useState(null)

  const [modeNow, setModeNow] = useState(null)

  const [maxDate, setMaxDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const formatDate = (date) => {
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'long' })
    return `${day} ${month}`
  }

  const renderModal = () => (
    <div className={styles.modal}>
      <input
        autoFocus
        className={styles.input}
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        placeholder="Enter your echo"
      />
      <button onClick={handleAddTask} className={styles.addbutt}>
        <span> Add</span>
      </button>
    </div>
  )

  const handleAddTask = () => {
    const currentDate = new Date()
    const intervals = [0, 1, 5, 15, 30, 60] // Intervals in days

    // Map intervals to date objects
    const dates = intervals.map((interval) => {
      const date = new Date(currentDate)
      date.setDate(currentDate.getDate() + interval)
      return date // Storing as Date objects
    })

    // Add the new task with the dates array
    const newTask = { name: newTaskName, lvl: 1, dates }
    console.log(newTask)
    setTaskArr([...taskArr, newTask])

    // Resetting input field and modal state
    setNewTaskName('')
    setIsModalOpen(false)
  }

  useEffect(() => {
    const today = new Date()
    const maxDate = new Date(today)
    maxDate.setDate(today.getDate() + 6)
    setMaxDate(maxDate)
  }, [])

  const [activeTaskDates, setActiveTaskDates] = useState([])

  const goActiveTask = (index) => {
    if (index === activeTask) {
      setActiveTask(null)
      // setModeNow(null)
      setActiveTaskDates([]) // Clear dates when deselecting
    } else {
      setActiveTask(index)
      setModeNow('object')
      setActiveTaskDates(taskArr[taskArr.length - 1 - index].dates) // Store dates of the selected task
    }
  }

  const activeDateFunc = () => {
    setModeNow('date')
  }

  const renderDatesBlock = () => {
    if (activeTask != null) {
      return (
        <div className={styles.miniblock}>
          <h3>Echo Plan for {taskArr[taskArr.length - 1 - activeTask].name}</h3>
          <div className={styles.taskblock}>
            {taskArr[taskArr.length - 1 - activeTask].dates.map(
              (date, index) => (
                <div key={index} className={styles.minitask}>
                  <h4>{index + 1}</h4>
                  <h4> {new Date(date).toLocaleDateString()} </h4>
                  {/* Adjust date format as needed */}
                </div>
              )
            )}
          </div>
        </div>
      )
    }
    return null
  }

  const tasksForSelectedDate = useMemo(() => {
    const selectedDateString = selectedDate.toISOString().split('T')[0]
    return taskArr.filter((task) =>
      task.dates.some((dateString) => {
        const date = new Date(dateString)
        return date.toISOString().split('T')[0] === selectedDateString
      })
    )
  }, [selectedDate, taskArr])
  return (
    <div className={styles.App}>
      <div className={styles.appBlock}>
        <div className={styles.mainpage}>
          <UserComponent />

          <div className={styles.miniblock}>
            <h3>My Echoes</h3>
            <div className={styles.paddingblock}>
              {!isModalOpen && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className={styles.addbutt}
                >
                  <span> Create echo</span>
                </button>
              )}
              {isModalOpen && renderModal()}
              <div className={styles.taskblock}>
                {[...taskArr].reverse().map((item, index) => (
                  <div
                    onClick={() => goActiveTask(index)}
                    className={`${styles.minitask} ${
                      activeTask == index && styles.activetask
                    }`}
                    key={index}
                  >
                    <h4 className={styles.textecho}>{item.name}</h4>
                    <h4>{item.lvl.toString()}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.miniblock}>
            <h3>Echoes Calendar</h3>
            <MyCalendar
              // maxPlus={maxDate}
              valueDate={selectedDate}
              setDate={setSelectedDate}
              format="dd-MM-yyyy"
              sunOrMon="iso8601"
              activeTask={activeDateFunc}
              startDate={new Date()}
              highlightDates={activeTask != null ? activeTaskDates : null}
            />
          </div>
          <div className={styles.miniblock}>
            {modeNow == 'object' ? (
              <>
                {renderDatesBlock()} {/* Render the dates block */}
              </>
            ) : (
              <></>
            )}

            {tasksForSelectedDate.length && modeNow == 'date' ? (
              <div className={styles.taskListForDate}>
                <h3>Tasks for {formatDate(selectedDate)}</h3>
                {tasksForSelectedDate.map((task, index) => (
                  <div key={index} className={styles.taskItem}>
                    <h4>{task.name}</h4>
                    <p>Level: {task.lvl}</p>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
