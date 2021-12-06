import Draggable from "react-draggable";
import { Card, Button} from 'antd';
import { DragOutlined } from '@ant-design/icons';


function App() {
  const { Meta } = Card;

  return (
  <>
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
      <Meta title="Block1" description="This is the first testing block." />
      </Card>
    </Draggable>

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
      <Meta title="Block2" description="This is the second testing block." />
      </Card>
    </Draggable>
  </>
  );
}

export default App;
