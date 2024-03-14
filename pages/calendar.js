"use client"
import React from 'react';
import 'react-calendar/dist/Calendar.css';
import activitiesData from '@/lib/db';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

const Calendar = dynamic(() => import('react-calendar'), { ssr: false });

const CalendarPage = () => {
  const activitiesDates = activitiesData.map((activity) => activity.date);
  const isActivityDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return activitiesDates.includes(dateString);
  };
  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      return isActivityDate(date)? <StyledRenderTileContent>X</StyledRenderTileContent> : null;
    }
  };

  return (   
    <>
    <h1>Calendar</h1>

    <button onClick={() => window.open('/')}>Home</button>

    <Calendar tileContent={renderTileContent}></Calendar>
    
    </>
  );
};
 
export default CalendarPage;

const StyledRenderTileContent = styled.div`
color: red;
  `;
