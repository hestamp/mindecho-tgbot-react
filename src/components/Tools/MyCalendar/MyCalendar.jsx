import React from 'react'
import Calendar from 'react-calendar'
import './MyCalendar.css'

import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'
import { LuWaves } from 'react-icons/lu'
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
  // const handleDateChange = (date) => {
  //   setDate(date)
  //   console.log(date)
  //   console.log(typeof date)
  // }

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

  const taskArr = [
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

  // Custom tile content
  const renderTileContent = ({ date, view }) => {
    if (view === 'month' && dateHasTasks(date)) {
      return (
        <div style={{ color: 'skyblue' }}>
          <LuWaves />
        </div>
      ) // Red dot
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
      minDate={startDate}
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
