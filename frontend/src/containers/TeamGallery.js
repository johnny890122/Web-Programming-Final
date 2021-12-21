import React from "react";
import Gallery from "../components/Gallery";
import Template from "../components/Template";
import {useState} from 'react';
import styled from "styled-components";

const TeamGallery = () => {

	const [galleryDispaly, setGalleryDispaly] = useState("noDisplay");
	const viewGallery = () => {
		setGalleryDispaly("display");
	}
	const galleryDiv = styled.div`width: 400;`;

	const images = [
	  {
	    original: 'https://picsum.photos/id/1018/1000/600/',
	    thumbnail: 'https://picsum.photos/id/1018/250/150/',
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

	const cover = <div onClick={viewGallery}>Click me ! test 中</div>
	const gallery = <Gallery images={images} />;
	return (
	    <div className="Wrapper" style={{"width":700}}>
	    	{ 
	    		galleryDispaly == "display" ? <Template  content={gallery} /> 
	    		: <Template content={cover} />
	    	}
	    </div>
	);
}

export default TeamGallery;