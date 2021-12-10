import Draggable from "react-draggable";
import { Card, Button} from 'antd';
import { DragOutlined } from '@ant-design/icons';


function Block(props) {
  const { Meta } = Card;
  
  return (
  <Draggable handle="Button">
    <Card
      // hoverable
      // style={{ height: 240  }}
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
    {/*<Meta title={props.title} description={props.description} />*/}

    {props.component}

    </Card>
  </Draggable>
  );
}

export default Block;