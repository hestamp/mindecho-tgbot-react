import React from 'react'
import styles from './MainPage.module.css'

import { useEffect, useMemo, useState } from 'react'

import MyCalendar from '../../components/Tools/MyCalendar/MyCalendar'

const taskArr1 = [
  {
    name: 'Instruction to my brain',
    content: '',
    active: true,
    lvl: 1,
    completed: false,
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
    content: '',
    active: true,
    completed: true,
    dates: [
      '2024-01-11T15:46:58.602Z',
      '2024-01-12T15:46:58.602Z',
      '2024-01-14T15:46:58.602Z',
      '2024-02-15T15:46:58.602Z',
      '2024-02-16T15:46:58.602Z',
      '2024-03-17T15:46:58.602Z',
    ],
  },
  {
    name: 'Object in JS',
    lvl: 5,
    content: '',
    active: true,
    completed: false,
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

const MainPage = () => {
  const [taskArr, setTaskArr] = useState(taskArr1)

  const [newTaskAdded, setNewTaskAdded] = useState(false)

  // New states for modal visibility and input value
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTaskName, setNewTaskName] = useState('')
  const [activeTask, setActiveTask] = useState(null)

  const [modeNow, setModeNow] = useState(null)

  const [maxDate, setMaxDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeTaskDates, setActiveTaskDates] = useState([])

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
    </div>
  )

  const handleAddTask = () => {
    const currentDate = new Date()
    const intervals = [0, 1, 5, 15, 30, 60] // Intervals in days

    // setTaskArr((prevTaskArr) => [...prevTaskArr, newTask])

    setNewTaskAdded(true)

    // Map intervals to date objects
    const dates = intervals.map((interval) => {
      const date = new Date(currentDate)
      date.setDate(currentDate.getDate() + interval)
      return date // Storing as Date objects
    })

    // Add the new task with the dates array
    const newTask = {
      name: newTaskName,
      lvl: 1,
      dates: dates,
      content: '',
      active: true,
      completed: false,
    }

    // Update taskArr and then select the new task
    setTaskArr((prevTaskArr) => {
      const updatedTaskArr = [...prevTaskArr, newTask]

      return updatedTaskArr
    })

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

  const goActiveTask = (index) => {
    const reversedIndex = taskArr.length - 1 - index
    const selectedTask = taskArr[reversedIndex]

    if (reversedIndex === activeTask) {
      setActiveTask(null)
      setActiveTaskDates([])
    } else {
      setActiveTask(selectedTask) // Store the entire task object
      setModeNow('object')
      setActiveTaskDates(selectedTask.dates) // Store dates of the selected task
    }
  }

  useEffect(() => {
    if (newTaskAdded) {
      // Call goActiveTask for the last task in the array
      goActiveTask(0)
      console.log('run')
      // Reset the newTaskAdded flag
      setNewTaskAdded(false)
    }
  }, [newTaskAdded, taskArr])

  const activeDateFunc = () => {
    setModeNow('date')
  }

  const renderDatesBlock = () => {
    if (activeTask) {
      return (
        <div className={styles.miniblock}>
          <div className={styles.paddingblock}>
            <h3>Echo Levels for {activeTask.name}</h3>
            <div className={styles.taskblock}>
              {activeTask.dates.map((date, index) => (
                <div
                  key={index}
                  className={`${styles.minitask} ${
                    index + 1 < activeTask.lvl ? styles.completedtask : ''
                  }`}
                >
                  <h4>{index + 1}</h4>
                  <h4>{new Date(date).toLocaleDateString()}</h4>
                </div>
              ))}
            </div>
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

  const [todayMode, setTodayMode] = useState('all')

  const toggleMode = (param) => {
    if (param) {
      setTodayMode(param)
    }
  }

  const filteredTasks = useMemo(() => {
    const todayString = new Date().toISOString().split('T')[0]

    let tasks = [...taskArr]

    if (todayMode === 'today') {
      tasks = tasks.filter((task) =>
        task.dates.some((dateString) => dateString.startsWith(todayString))
      )
    } else if (todayMode === 'completed') {
      tasks = tasks.filter((task) => task.completed)
    }

    if (todayMode === 'all') {
      // Sort so that completed tasks are at the beginning (they will be at the bottom after reverse)
      tasks.sort((a, b) => {
        if (a.completed && !b.completed) return -1
        if (!a.completed && b.completed) return 1
        return 0
      })
    }

    return tasks.reverse()
  }, [todayMode, taskArr])
  return (
    <div className={styles.mainPage}>
      <div className={styles.miniblock}>
        {/* <h3 className={styles.miniH}>Echoes Calendar</h3> */}
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
        <div className={styles.paddingblock}>
          <div className={styles.echotype}>
            <button
              onClick={() => toggleMode('all')}
              className={`${styles.typebutt} ${
                todayMode == 'all' && styles.activetype
              }`}
            >
              All Echoes
            </button>

            <h4>|</h4>
            <button
              onClick={() => toggleMode('today')}
              className={`${styles.typebutt} ${
                todayMode == 'today' && styles.activetype
              }`}
            >
              Today{' '}
            </button>
            <h4>|</h4>
            <button
              onClick={() => toggleMode('completed')}
              className={`${styles.typebutt} ${
                todayMode == 'completed' && styles.activetype
              }`}
            >
              Completed{' '}
            </button>
          </div>

          {isModalOpen && renderModal()}
          <div className={styles.taskblock}>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((item, index) => (
                <div
                  onClick={() => goActiveTask(index)}
                  className={`${styles.minitask} ${
                    activeTask == index && styles.activetask
                  } ${item.completed && styles.completedtask}`}
                  key={index}
                >
                  <h4 className={styles.textecho}>{item.name}</h4>
                  <h4>{item.lvl.toString()}</h4>
                </div>
              ))
            ) : (
              <h4>
                {todayMode === 'all' &&
                  'You don’t have echos now, click "Create echo" to start.'}
                {todayMode === 'today' && 'You don’t have echos for today.'}
                {todayMode === 'completed' &&
                  'You don’t have completed echos yet.'}
              </h4>
            )}
          </div>
        </div>
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
          <div className={styles.paddingblock}>
            <h3>Echos for {formatDate(selectedDate)}</h3>
            {tasksForSelectedDate.map((task, index) => (
              <div key={index} className={styles.taskItem}>
                <h4>{task.name}</h4>
                <p>Level: {task.lvl}</p>
              </div>
            ))}
          </div>
        ) : tasksForSelectedDate.length == 0 && modeNow == 'date' ? (
          <div className={styles.paddingblock}>
            <h3>Tasks for {formatDate(selectedDate)}</h3>
            <p>There is no echos for this day</p>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.createDiv}>
        {!isModalOpen ? (
          <button
            onClick={() => setIsModalOpen(true)}
            className={styles.addbutt}
          >
            <span> Create echo</span>
          </button>
        ) : (
          <button onClick={handleAddTask} className={styles.addbutt}>
            <span> Add</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default MainPage
