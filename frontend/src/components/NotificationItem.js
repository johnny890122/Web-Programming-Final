import { Typography, Divider, List, Avatar } from 'antd';
function NotificationItem (props){
	const { Title } = Typography;
	return (
		<>
			<Title level={3} > {props.time} </Title>
			{
				props.task != [] ? 
				<List
				    itemLayout="horizontal"
				    dataSource={props.task}
				    renderItem={item => (
						<List.Item>
							<List.Item.Meta
							  title={item.type}
							  description={item.content}
							/>
						</List.Item>
			    	)}
			  	/> : []
		  	}
			< Divider / >
		</>
	)
}

export default NotificationItem;