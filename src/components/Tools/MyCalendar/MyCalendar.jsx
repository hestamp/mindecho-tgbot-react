import React from 'react'
import Calendar from 'react-calendar'
import './MyCalendar.css'

import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'
import { LuWaves } from 'react-icons/lu'
import { useMyMainContext } from '../../../storage/StorageContext'
const MyCalendar = ({
  sunOrMon,
  setDate,
  maxPlus,
  valueDate,
  startDate,
  activeTask,
  activeStartDate,
  highlightDates,
}) => {
  const { taskArr, uTaskArr } = useMyMainContext()

  const renderTileClass = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = formatDate(date)
      if (
        highlightDates &&
        highlightDates.some((d) => formatDate(new Date(d)) === formattedDate)
      ) {
        return 'highlighted-date' // Using CSS module style
      }
    }
  }

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }

  // Function to check if a date has tasks
  const dateHasTasks = (date) => {
    const formattedDate = formatDate(date)
    return taskArr.some((task) =>
      task.dates.some(
        (taskDate) => formatDate(new Date(taskDate)) === formattedDate
      )
    )
  }

  const handleDateChange = (date) => {
    activeTask()
    setDate(date)
  }

  const renderTileContent = ({ date, view }) => {
    if (view === 'month' && dateHasTasks(date)) {
      return (
        <span className="waves">
          <LuWaves />
        </span>
      )
    }
  }

  return (
    <Calendar
      nextLabel={<MdKeyboardArrowRight />}
      next2Label={null}
      prevLabel={<MdKeyboardArrowLeft />}
      prev2Label={null}
      minDetail="year"
      defaultView="month"
      maxDetail="month"
      defaultValue={valueDate}
      defaultActiveStartDate={activeStartDate}
      tileContent={renderTileContent}
      minDate={null}
      maxDate={maxPlus || null}
      onChange={handleDateChange}
      value={valueDate}
      calendarType={sunOrMon}
      tileClassName={renderTileClass}
      navigationLabel={({ date, label }) => `${label.split(' ')[0]}`}
    />
  )
}

export default MyCalendar
