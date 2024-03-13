"use client";
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import activitiesData from '@/lib/db';
import styled from 'styled-components';

const CalendarPage = () => {
  const activitiesDates = activitiesData.map((activity) => activity.date);
  const istActivityDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return activitiesDates.includes(dateString);
  };
  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      return istActivityDate(date)? <div style={{ color: 'red' }}>X</div> : null;
    }
  };

  return (   
    <>
    <h1>Calendar</h1>

    <button onClick={() => window.open('/','_self')}>Home</button>

    <Calendar tileContent={renderTileContent}></Calendar>
    
    </>
  );
};

export default CalendarPage;


