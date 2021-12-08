import { InfoCircleOutlined } from '@ant-design/icons';
import { Input, Button, Tooltip, Form, Radio } from 'antd';

function TeamFrom () {
	return (
      	<Form>
      		{/*隊名*/}
	      	<Form.Item label="Team Name" required tooltip="This is a required field">
	        	<Input placeholder="input placeholder" />
	      	</Form.Item>

	      	{/*球隊描述*/}
	      	<Form.Item
		        label="Description" 
		        tooltip={{ title: '提示文字', icon: <InfoCircleOutlined /> }}
		    	>
	        	<Input placeholder="input placeholder" />
	      	</Form.Item>

	      	{/*球隊類型*/}
	      	<Form.Item
		        label="Team Type" 
		        tooltip={{ title: '提示文字', icon: <InfoCircleOutlined /> }}
		    	>
	        	<Input placeholder="input placeholder" />
	      	</Form.Item>

	      	{/*成立日期*/}
	      	<Form.Item
		        label="成立日期" 
		        tooltip={{ title: '提示文字', icon: <InfoCircleOutlined /> }}
		    	>
	        	<Input placeholder="input placeholder" />
	      	</Form.Item>
    	</Form>
	)
}

export default TeamFrom;