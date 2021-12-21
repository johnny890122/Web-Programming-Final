import ImageGallery from "react-image-gallery";
import Template from '../components/Template';
import CreateTeam from "../components/CreateTeam";

import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import "react-image-gallery/styles/css/image-gallery.css";

function gallery () {
	const images = [
	  {
	    original: 'https://picsum.photos/id/1018/1000/600/',
	    
	    : 'https://picsum.photos/id/1018/250/150/',
	  },
	  {
	    original: 'https://picsum.photos/id/1015/1000/600/',
	    thumbnail: 'https://picsum.photos/id/1015/250/150/',
	  },
	  {
	    original: 'https://picsum.photos/id/1019/1000/600/',
	    thumbnail: 'https://picsum.photos/id/1019/250/150/',
	  },
	];

	function renderLeftNav(onClick, disabled) {
	    return (
	    	<Button label="sjjs" icon={<CaretLeftOutlined />} size="large" onClick={onClick} disabled={disabled} >
	    		Back
	    	</Button>

	    );
	}

	function renderRightNav(onClick, disabled) {
	  return (
	    <Button icon={<CaretRightOutlined />} size="large" onClick={onClick} disabled={disabled} >
	    	Next
	    </Button>
	  );
	}

	const gallery = (
    	< ImageGallery 
        	items={images}
          	renderLeftNav={renderLeftNav}
          	renderRightNav={renderRightNav} 
        />
	)

  	return (
        <div className="Wrapper" style={{"width": 700}}>
			<Template content={ gallery } />
    	</div>
  	)
};

export default gallery;