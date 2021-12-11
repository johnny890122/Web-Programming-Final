import { Typography, Input, Button, Tooltip, Form } from 'antd';
import { CopyOutlined, InfoCircleOutlined, UserAddOutlined } from '@ant-design/icons';


function Invite () {
	const { Title } = Typography;

	return (
		<Form>
	      	{/* 輸入電子郵件 */}
	      	<Form.Item
		        label="輸入郵件" tooltip={{ title: '提示文字', icon: <InfoCircleOutlined /> }}>
	        	<Input 
		        	defaultValue="Amy" 
		        	icon={< CopyOutlined />} 
		        	addonAfter={ <Tooltip title="Invite"> <UserAddOutlined /> </Tooltip> }
	        	/>
	      	</Form.Item>


	      	<Form.Item
		        label="複製連結" tooltip={{ title: '提示文字', icon: <InfoCircleOutlined /> }}>
	        	<Input 
		        	defaultValue="git@github.com:ant-design/ant-design.git"
		        	icon={< CopyOutlined />} 
		        	addonAfter={ <Tooltip title="copy url"> < CopyOutlined /> </Tooltip> }
	        	/>
	      	</Form.Item>
		</Form>
	)
}

export default Invite;