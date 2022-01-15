import "./css/components.css";
import { UserOutlined, TeamOutlined, NotificationOutlined } from '@ant-design/icons';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button"
import { styled } from '@mui/material/styles';
import {
  DashboardCustomizeOutlined,
  GroupsOutlined,
  TodayOutlined,
  EmojiEventsOutlined,
  Cottage,
  EventNote,
  PostAdd,
  PeopleAlt,
  SportsScore,
  HowToVote,
  Collections,
  StackedLineChart,
  Edit,
  NavigateNext,
  TipsAndUpdatesOutlined,
} from "@mui/icons-material";


import { Typography, Divider, List, Avatar, Tag, Space } from 'antd';
function NotificationItem (props){
	const { Title, Text } = Typography;

	const Item = styled(Paper)(({ theme }) => ({
	  ...theme.typography.body2,
	  padding: theme.spacing(1),
	  textAlign: 'bottom',
	  color: theme.palette.text.secondary,
	}));
	// console.log(props.task)

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
					<List.Item style={{display: "flex", alignItems: "start", justifyContent: "flex-start"}}>
						<Button
							style={{ color: 
								(item.type === "Event" ? "green": 
								(item.type === "Post" ? "blue" : "black"))
							 }}
							startIcon= { 
								item.type === "Event" ?<EventNote/> : 
								(item.type === "Post" ? <PostAdd /> : <HowToVote  /> )
							} 
						>
							{ 
								item.type === "Event" ? "New Event" : 
								(item.type === "Post" ? "New Post" : "New Vote" )
							}	
						</Button>


						  <Item> From: {item.title}</Item>
						  <Item> Title: {item.content} </Item>
					</List.Item>
			    	)}
			  	/> : []
		  	}
		</>
	)
}

export default NotificationItem;