import React, { useState, useEffect, Fragment } from 'react';
import '@assets/css/style.css';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { format } from 'date-fns';
import { startOfMonth, endOfMonth } from 'date-fns';
import { getDaysInMonth, getDay, getDate } from 'date-fns';
import { isWeekend, isToday, addMonths, addDays } from 'date-fns';

import Chip from '@material-ui/core/Chip';

const CalendarComponent = props => {
  const { workoutList, children } = props
  const weekTitles = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

  const [calendar, setCalendar] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const getCalendarConfig = (date) => {

    const startDay = startOfMonth(date);
    const endDay = endOfMonth(date);
    const startDayOfWeek = getDay(startDay);
    const endDayOfWeek = getDay(endDay);
    const daysInMonth = getDaysInMonth(date);

    let weekData = [];
    let monthData = [];

    let _startDayOfWeek = startDayOfWeek === 0 ? 7 : startDayOfWeek;
    for (let w = _startDayOfWeek; w > 1; w--) {
      weekData.push(null)
    }

    for (let i = 0; i < daysInMonth; i++) {
      const eachDate = addDays(startDay, i);
      const eachDateOfWeek = getDay(eachDate);

      const workoutData = workoutList.filter(wItem => wItem.date == format(eachDate, 'yyyyMMdd'));
      const records = workoutData.length > 0 ? workoutData[0].records : []

      weekData.push({ date: eachDate, isToday: isToday(eachDate), isWeekend: isWeekend(eachDate), records: records });

      if (eachDateOfWeek === 0) {
        monthData.push(weekData);
        weekData = [];
      }
    }
    monthData.push(weekData);

    if (endDayOfWeek !== 0) {
      for (let w = endDayOfWeek; w < 7; w++) {
        weekData.push(null)
      }
    }
    setCalendar(monthData);
    setCurrentDate(date);
    return monthData
  };
  const clickPrevMonth = (date) => {
    getCalendarConfig(addMonths(date, -1));
  }
  const clickNextMonth = (date) => {
    getCalendarConfig(addMonths(date, 1));
  }

  useEffect(() => {
    getCalendarConfig(new Date());
  }, []);

  return (
    <Fragment>
      <div className="calendar-header">
        {children}
        <div className="header-month">
          <a onClick={() => clickPrevMonth(currentDate)}><NavigateBeforeIcon style={{ fontSize: 30 }} /></a>
          <span className="header-month">{format(new Date(currentDate), 'yyyy / LLL').toUpperCase()}</span>
          <a onClick={() => clickNextMonth(currentDate)}><NavigateNextIcon style={{ fontSize: 30 }} /></a>
        </div>
      </div>
      <div className="calendar-board">
        <div className="row">
          {weekTitles.map((w, index) => (
            <div key={index} className="col" >{w}</div>
          ))}

        </div>
        {calendar.map((week, weekIndex) => (
          <div className="row" key={weekIndex}>
            {week.map((day, dayIndex) => (
              <div tabIndex={day !== null ? "0" : ""}
                key={dayIndex}
                onClick={day !== null ? () => props.clickParentDate(day.date) : () => { }}
                className={`col ${day === null ? 'col-none' : ''}${day !== null && day.isToday ? 'is-today' : ''}`}>

                <div className={`${day !== null && day.isWeekend ? 'is-weekend' : ''}`}>
                  {day === null ? "" : getDate(day.date)}
                </div>

                {day !== null ? day.records.map((r, rIndex) => (
                  r.name === 'weight' ?
                    <Chip key={rIndex}
                      color="primary"
                      size="small"
                      label={r.name}
                      clickable
                      onClick={() => props.clickParentDateEvent(r)} />
                    :
                    <Chip key={rIndex}
                      color="secondary"
                      size="small"
                      label={r.name}
                      clickable
                      onClick={() => props.clickParentDateEvent(r)} />)) : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Fragment>
  )
}
export default CalendarComponent