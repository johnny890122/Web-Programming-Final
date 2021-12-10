import Draggable from "react-draggable";
import { Card, Button} from 'antd';
import { DragOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';

function Block(props) {
  const { Meta } = Card;
  
  return (
  <Draggable handle="Button">
    
    <Card
      extra={
              <Button 
                  className="handle"
                  type="danger" 
                  shape="circle"
                  size={5}
                  style={{ color: 'white'}}
              > <DragOutlined /> </Button>
            }
    >
    {props.component}
    <Button onClick={props.enlarge} 
            type="primary" 
            icon={ props.fullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />} 
    / >

    </Card>
  </Draggable>
  );
}

export default Block;