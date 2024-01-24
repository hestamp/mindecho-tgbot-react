import React from 'react'
import styles from './MainPage.module.css'
import { MdDone } from 'react-icons/md'
import { useEffect, useMemo, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import MyCalendar from '../../components/Tools/MyCalendar/MyCalendar'
import MyModal from '../../components/Tools/MyModal/MyModal'
import EchoCreator from '../../components/EchoCreator/EchoCreator'
import { useMyMainContext } from '../../storage/StorageContext'

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
  const { newEchoModal, uNewEchoModal, taskArr, uTaskArr } = useMyMainContext()

  useEffect(() => {
    uTaskArr(taskArr1)
  }, [])

  const [activeTask, setActiveTask] = useState(null)
  const [activeTaskObj, setActiveTaskObj] = useState(null)

  const [modeNow, setModeNow] = useState(null)
  const [todayMode, setTodayMode] = useState('all')

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeTaskDates, setActiveTaskDates] = useState([])

  const formatDate = (date) => {
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'long' })
    return `${day} ${month}`
  }

  const goActiveTask = (index) => {
    const reversedIndex = taskArr.length - 1 - index
    const selectedTask = taskArr[reversedIndex]

    if (reversedIndex === activeTask) {
      setActiveTask(null)
      setActiveTaskObj(null)
      setActiveTaskDates([])
    } else {
      setActiveTask(index)
      setModeNow('object')
      console.log(selectedTask)
      setActiveTaskObj(selectedTask)
      setActiveTaskDates(selectedTask.dates)
    }
  }

  const activeDateFunc = () => {
    setModeNow('date')
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

  const toggleMode = (param) => {
    if (param) {
      setTodayMode(param)
    }
  }

  const filteredTasks = useMemo(() => {
    const todayString = new Date().toISOString().split('T')[0]

    let tasks = [...taskArr]

    if (todayMode === 'today') {
      tasks = tasks.filter((task) => {
        console.log(task.dates)
        task.dates.some((dateString) => dateString.startsWith(todayString))
      })
    } else if (todayMode === 'completed') {
      tasks = tasks.filter((task) => task.completed)
    }

    if (todayMode === 'all') {
      tasks.sort((a, b) => {
        if (a.completed && !b.completed) return -1
        if (!a.completed && b.completed) return 1
        return 0
      })
    }

    return tasks.reverse()
  }, [todayMode, taskArr])

  const closeFullModal = () => {
    uNewEchoModal(false)
  }
  return (
    <div className={styles.mainPage}>
      <MyModal
        isOpen={newEchoModal}
        canClose
        setLocModal={closeFullModal}
        modalName=""
        myJustifyName="c"
      >
        <div className={styles.main}>
          <div className={styles.mainImgBlock}>
            <EchoCreator />
          </div>
        </div>
      </MyModal>
      <div className={styles.miniblock}>
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
              Active
            </button>

            <h4>|</h4>
            {/* <button
              onClick={() => toggleMode('today')}
              className={`${styles.typebutt} ${
                todayMode == 'today' && styles.activetype
              }`}
            >
              Today{' '}
            </button>
            <h4>|</h4> */}
            <button
              onClick={() => toggleMode('completed')}
              className={`${styles.typebutt} ${
                todayMode == 'completed' && styles.activetype
              }`}
            >
              Completed{' '}
            </button>
          </div>

          <div className={styles.taskblock}>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((item, index) => (
                <div
                  onClick={() => goActiveTask(index)}
                  className={`${styles.taskItem} ${
                    activeTask == index && styles.activetask
                  } `}
                  key={index}
                >
                  <div className={styles.repeat}>
                    <h4 className={`${styles.waves} `}>
                      {'|'.repeat(item.lvl)}
                    </h4>
                    <h4>{item.name}</h4>
                  </div>
                  {item.completed ? (
                    <button className={` ${styles.funcButtActive}`}>
                      <MdDone />
                    </button>
                  ) : (
                    <button className={styles.funcButt}>
                      <BsThreeDots />
                    </button>
                  )}
                </div>
              ))
            ) : (
              <h4>
                {todayMode === 'all' &&
                  'You don’t have echos now. \n Click "Create echo" to start.'}
                {todayMode === 'today' && 'You don’t have echos for today.'}
                {todayMode === 'completed' &&
                  'You don’t have completed echos yet.'}
              </h4>
            )}
          </div>
        </div>
      </div>

      <div className={styles.miniblock}>
        {modeNow == 'object' && activeTaskObj ? (
          <div className={styles.miniblock}>
            <div className={styles.paddingblock}>
              <h3>Echo Levels for {activeTaskObj.name}</h3>
              <div className={styles.taskblock}>
                {activeTaskObj.dates.map((date, index) => (
                  <div
                    key={index}
                    className={`${styles.minitask} ${
                      index + 1 < activeTaskObj.lvl ? styles.activetask : ''
                    }`}
                  >
                    <h4 className={`${styles.waves}`}>
                      {'|'.repeat(index + 1)}
                    </h4>

                    <h4>{new Date(date).toLocaleDateString()}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
            <h3>Echos for {formatDate(selectedDate)}</h3>
            <p>There is no echos for this day</p>
          </div>
        ) : (
          <></>
        )}
      </div>

      {!newEchoModal ? (
        <div className={styles.createDiv}>
          <button
            onClick={() => uNewEchoModal(true)}
            className={styles.addbutt}
          >
            <span> Create echo</span>
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default MainPage
