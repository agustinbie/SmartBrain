import React from "react";

const FaceRecognition = ({ imageUrl }) => {
	return (
	<div className= "center ">
		<div className= " mt2 ">
		<img alt="imagen" src={imageUrl} width="500px" heigh="auto"/>
		</div>
	</div>

	)
		
}

export default FaceRecognition;