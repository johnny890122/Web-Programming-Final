import ImageGallery from "react-image-gallery";
import Template from '../components/Template';
import CreateTeam from "../components/CreateTeam";

import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styled from "styled-components";

import "react-image-gallery/styles/css/image-gallery.css";

function gallery (props) {
	const images = props.images;
	const galleryDiv = styled.div`width: 400;`;

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

  	return gallery
};

export default gallery;