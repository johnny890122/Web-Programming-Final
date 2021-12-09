import { InfoCircleOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Button, Tooltip, Form, Radio, DatePicker, Menu, Dropdown} from 'antd';
import {useState} from 'react';
import styled from 'styled-components';
import moment from 'moment';

function TeamFrom () {
	const { TextArea } = Input;

	const teamType = ["a", "b", "c", "d", "e"];
	const [selectedTeamType, setSelectedTeamType] = useState("---");
	const handleMenuClick = (e) => {
		setSelectedTeamType(e.key);
	}
	const menu = (
	  <Menu > {
  		teamType.map( e => 
  			<Menu.Item key={e} icon={<UserOutlined />} onClick={handleMenuClick}>
		    	{e}
		    </Menu.Item>
  		)}
	  </Menu>
	);

	return (
      	<Form>
      		{/*隊名*/}
	      	<Form.Item label="Team Name" required tooltip="This is a required field">
	        	<Input placeholder="placeholder" />
	      	</Form.Item>

	      	{/*球隊描述*/}
	      	<Form.Item
		        label="Description" 
		        tooltip={{ title: '提示文字', icon: <InfoCircleOutlined /> }}
		    	>
	        	<TextArea rows={4} />
	      	</Form.Item>

	      	{/*球隊類型*/}
	      	<Form.Item
		        label="Team Type" 
		        tooltip={{ title: '提示文字', icon: <InfoCircleOutlined /> }}
		    	>

	        	<Dropdown.Button overlay={menu} placement="bottomCenter" icon={ <UserOutlined />}>
			      {selectedTeamType}
			    </Dropdown.Button>
	      	</Form.Item>

	      	{/*成立日期*/}
	      	<Form.Item label="成立日期" tooltip={{ title: '提示文字', icon: <InfoCircleOutlined /> }} >
	        	<Input.Group compact>
			      <DatePicker />
			    </Input.Group>
	      	</Form.Item>
    	</Form>
	)
}

export default TeamFrom;