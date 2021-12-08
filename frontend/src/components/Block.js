import Draggable from "react-draggable";
import { Card, Button} from 'antd';
import { DragOutlined } from '@ant-design/icons';
import { useState } from 'react';

function Block(props) {
  const { Meta } = Card;
  
  return (
  <Draggable handle="Button">
    <Card
      // hoverable
      style={{ width: 240 }}
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
    <Meta title={props.title} description={props.description} />
    </Card>
  </Draggable>
  );
}

export default Block;