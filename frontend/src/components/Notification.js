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
    }
  );

  if (!loading) {
    const tmp = {};
    for (var i of data.initUserNotification) {
      if (!tmp[i.taskTime]) {
        tmp[i.taskTime] = [];
      }
      tmp[i.taskTime].push({ type: i.taskType, content: i.taskContent });
    }

    for (var i of Object.keys(tmp)) {
      input.push({ time: i, task: tmp[i] });
    }
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={input}
      renderItem={(e) => <NotificationItem time={e.time} task={e.task} />}
    />
  );
}

export default Notification;
