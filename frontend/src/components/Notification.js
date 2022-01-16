import { useState } from "react";
import NotificationItem from "./NotificationItem";
import { List } from "antd";
import { useQuery } from "@apollo/client";
import { USER_NOTIFICATION_INIT } from "../graphql";

function Notification(props) {
  const input = [];
  const { data, error, loading, subscribeToMore } = useQuery(
    USER_NOTIFICATION_INIT,
    {
      variables: { userID: props.me },
      fetchPolicy: "cache-and-network"
    }
  );

  if (!loading) {
    const tmp = {};
    if (data) {
      for (var i of data.initUserNotification) {
        const dateString = new Date(i.taskTime).toDateString();

        if (!tmp[dateString]) {
          tmp[dateString] = [];
        }
        tmp[dateString].push({ type: i.taskType, title: i.taskTitle, content: i.taskContent });
      }

      for (var i of Object.keys(tmp)) {
        input.push({ time: i, task: tmp[i] });
      }
    }
  }

  return (
    <div style={{ height: "250px", overflow: "auto" }}>
      <h2 style={{ display: "inline-block" }}>Recent Notification</h2>
      <List
        itemLayout="horizontal"
        dataSource={input}
        renderItem={(e) => <NotificationItem time={e.time} task={e.task} />}
      />
    </div>
  );
}

export default Notification;
