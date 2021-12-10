import {useState} from 'react';
import NotificationItem from './NotificationItem';
import {List} from 'antd';

function Notification () {
	const data = [
		{
			"time": "2021-11-22", 
			"task": [{"type": "Personal", "content": "記得帶球褲"}]
		},{
			"time": "2021-11-23",
			"task": [{"type": "Personal", "content": "寫作業"}, {"type": "Team1", "content": "團拍"}]
		},{
			"time": "2021-11-24",
			"task": []
		}
	]

	return (
		<List
			itemLayout="horizontal"
			dataSource={data}
			renderItem={e => (
				< NotificationItem  time={e.time} task={e.task} / > 
			)}
		/ >
	)
}

export default Notification;