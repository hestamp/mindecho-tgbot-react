import React from 'react'
import styles from './MainPage.module.css'
import { MdDone } from 'react-icons/md'
import { useEffect, useMemo, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import MyCalendar from '../../components/Tools/MyCalendar/MyCalendar'
import MyModal from '../../components/Tools/MyModal/MyModal'
import EchoCreator from '../../components/EchoCreator/EchoCreator'
import { useMyLogic, useMyMainContext } from '../../storage/StorageContext'
import MenuDropdown from '../../components/Tools/MenuDropdown/MenuDropdown'
import EchoReader from '../../components/EchoReader/EchoReader'
import EchoEditor from '../../components/EchoEditor/EchoEditor'
import { renderContentWithLineBreaks } from '../../utils/textUtils'
import { telegramApp } from '../../hooks/useTelegram'

const MainPage = () => {
  const {
    taskArr,
    uTaskArr,

    activeEcho,
    uActiveEcho,
  } = useMyMainContext()

  const { crudMode, uCrudMode, echoModal, uEchoModal } = useMyLogic()

  useEffect(() => {
    uTaskArr([])
  }, [])

  const [activeTask, setActiveTask] = useState(null)

  const [todayMode, setTodayMode] = useState('all')

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeTaskDates, setActiveTaskDates] = useState([])

  const formatDate = (date) => {
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'long' })
    return `${day} ${month}`
  }

  const goActiveTask = (index) => {
    // const reversedIndex = filteredTasks.length - 1 - index
    const selectedTask = filteredTasks[index]

    setActiveTask(index)
    setActiveTaskDates(selectedTask.dates)
  }

  const toggleMode = (param) => {
    if (param) {
      setTodayMode(param)
    }
  }

  const filteredTasks = useMemo(() => {
    const todayString = new Date().toISOString().split('T')[0]

    let tasks = [...taskArr]

    // if (todayMode === 'today') {
    //   tasks = tasks.filter((task) => {
    //     console.log(task.dates)
    //     task.dates.some((dateString) => dateString.startsWith(todayString))
    //   })
    // }

    if (todayMode === 'all') {
      tasks.sort((a, b) => {
        if (a.lvl > b.level) return -1
        if (a.lvl < b.level) return 1
        return 0
      })
      tasks = tasks.filter((task) => !task.completed)
    } else if (todayMode === 'completed') {
      tasks = tasks.filter((task) => task.completed)
    }

    return tasks.reverse()
  }, [todayMode, taskArr])

  const closeFullModal = () => {
    uEchoModal(false)
    uCrudMode(null)
    uActiveEcho(null)
  }

  const createFunc = () => {
    uCrudMode('create')
    uEchoModal(true)
  }

  const readfunc = (obj) => {
    uActiveEcho(obj)
    uCrudMode('read')
    uEchoModal(true)
  }
  const updateFunc = (obj) => {
    uActiveEcho(obj)
    uCrudMode('update')
    uEchoModal(true)
  }

  const delfunc = (obj) => {
    const newArr = taskArr.filter((item) => item.id !== obj.id)

    uTaskArr(newArr)
  }

  const arrFunc = [
    { name: 'Open', func: readfunc },
    { name: 'Edit', func: updateFunc },
    { name: 'Remove', func: delfunc },
  ]

  const activeDateFunc = () => {}
  return (
    <div className={styles.mainPage}>
      <MyModal
        isOpen={echoModal}
        canClose
        setLocModal={closeFullModal}
        modalName=""
        myJustifyName="c"
      >
        <div className={styles.main}>
          <div className={styles.mainImgBlock}>
            {crudMode === 'read' ? (
              <EchoReader />
            ) : crudMode === 'update' ? (
              <EchoEditor />
            ) : crudMode == 'create' ? (
              <EchoCreator />
            ) : (
              <></>
            )}
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
              filteredTasks.map((item, index) => {
                const maxChar = 300
                let truncatedContent = item.content

                const isContentTooLong = item.content.length > maxChar

                if (item.content.length > maxChar) {
                  truncatedContent = item.content.substring(0, maxChar) + '...'
                }

                const paragraphs = truncatedContent.split('\n\n')

                return (
                  <div
                    onClick={() => goActiveTask(index)}
                    className={`${styles.fullitem} ${
                      activeTask == index ? styles.activetask : styles.notactive
                    } `}
                    key={index}
                  >
                    <div className={styles.taskItem}>
                      {' '}
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
                        <MenuDropdown
                          itemobj={item}
                          myalign="end"
                          array={arrFunc}
                          selected={<BsThreeDots className={styles.funcButt} />}
                        />
                      )}
                    </div>
                    {activeTask == index && (
                      <div className={styles.text}>
                        {renderContentWithLineBreaks(truncatedContent)}
                      </div>
                    )}
                    {activeTask == index && isContentTooLong && (
                      <button
                        className={styles.readmore}
                        onClick={() => readfunc(item)}
                      >
                        Read more
                      </button>
                    )}
                  </div>
                )
              })
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

      {console.log(telegramApp.MainButton)}

      {telegramApp.platform == 'unknown' && !echoModal ? (
        <div className={styles.createDiv}>
          <button onClick={createFunc} className={styles.addbutt}>
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
