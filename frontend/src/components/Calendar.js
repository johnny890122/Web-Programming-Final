import React, { useCallback, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {EventData} from "./ListData";

function Calendar(props) {
  return (
    <div  className = 'calendar'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView={props.initialView}
        locale="zh-tw" // 中文化
        events={EventData}
        selectable="true"
        select={props.selectDateByDragAndDrop}
      />
    </div>
  );
};
export default Calendar;