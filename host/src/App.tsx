import React, { useEffect, useRef } from "react";
import { Editor } from "editorMFE/Editor";

export default () => {
	return (
		<>
			<div>Test HOST HMR: 12334432 </div>
			<h1>Container!</h1>
			<Editor name={"Panther"} />
		</>
	);
};
