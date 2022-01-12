import Draggable from "react-draggable";
import { Card } from 'antd';
import { Button } from "@mui/material";

import { DragOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';

function Block(props) {
  const { Meta } = Card;
            
  return (
    <Card
      // hoverable
      style={{ width: 500  }}
      // extra={
      //         <Button 
      //             className="handle"
      //             type="danger" 
      //             shape="circle"
      //             size={5}
      //             style={{ color: 'white'}}
      //         > <DragOutlined /> </Button>
      //       }
    >
    {/*<Meta title={props.title} description={props.description} />*/}

    {props.component}
    <Button size="large" type="primary" onClick={props.enlarge}> More </Button>
    {/*<Button onClick={props.enlarge} 
            type="primary" 
            icon={ button } 
    / >*/}

    </Card>
  // </Draggable>
  );
}

export default Block;