import "./css/components.css";
import { UserOutlined, TeamOutlined, NotificationOutlined } from '@ant-design/icons';

import { Typography, Divider, List, Avatar, Tag, Space } from 'antd';
function NotificationItem (props){
	const { Title, Text } = Typography;
	return (
		<>
			<Title level={4} > {props.time} </Title>
			{
				props.task != [] ?
				<List
					bordered
				    itemLayout="horizontal"
				    dataSource={props.task}
				    renderItem={item => (
						<List.Item>
							<Tag 
								color={item.type === "Personal" ? "blue" : "red"}
								icon={item.type === "Personal" ? <UserOutlined /> : <TeamOutlined/>}>
								<Text strong>{item.type}</Text>
							</Tag>
							{item.content}
						</List.Item>
			    	)}
			  	/> : []
		  	}
		</>
	)
}

export default NotificationItem;