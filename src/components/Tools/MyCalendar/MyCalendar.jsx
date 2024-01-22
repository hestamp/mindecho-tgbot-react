import React from 'react'
import Calendar from 'react-calendar'
import './MyCalendar.css'

import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'

const MyCalendar = ({
  sunOrMon,
  setDate,
  maxPlus,
  valueDate,
  startDate,
  activeStartDate,
}) => {
  const handleDateChange = (date) => {
    setDate(date)
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
      minDate={startDate}
      maxDate={maxPlus || null}
      onChange={handleDateChange}
      value={valueDate}
      calendarType={sunOrMon}
      navigationLabel={({ date, label }) => `${label.split(' ')[0]}`}
    />
  )
}

export default MyCalendar
