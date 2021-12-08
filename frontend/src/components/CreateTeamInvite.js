import { Typography, Input, Button, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';


function Invite () {
	const { Title } = Typography;

	return (
		<Input.Group compact>
			{/* 輸入電子郵件 */}
			<Title level = {3}> 輸入電子郵件 </Title>
			<br/>
	  		<Input 
	  			disabled
		        style={{ width: 'calc(100% - 200px)' }}
		        defaultValue="Amy"
		    />
		    <Tooltip title="copy git url">
			<Button icon={<CopyOutlined />} />
			</Tooltip>
			<br/>
			
			{/* 輸入電子郵件 */}
		    <Title level = {3}> 複製連結 </Title>
		    <br/>
	  		<Input 
	  			disabled
		        style={{ width: 'calc(100% - 200px)' }}
		        defaultValue="git@github.com:ant-design/ant-design.git"
		    />
			<Tooltip title="copy git url">
				<Button icon={<CopyOutlined />} />
			</Tooltip>
		</Input.Group >
	)
}


export default Invite;