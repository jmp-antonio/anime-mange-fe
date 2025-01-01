import React from "react";
import "./Form.css";

function TextError(props) {
	return (
		<div className="error">
			<i className="fas fa-exclamation-circle mr-1"></i>
			{props.children}
		</div>
	);
}

export default TextError;
