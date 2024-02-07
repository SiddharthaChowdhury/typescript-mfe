import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Editor } from "./components/Editor";

const rootElem = document.getElementById("_dev_editor_root");
const root = createRoot(rootElem!);
root.render(
	<StrictMode>
		<h1>From Editor!</h1>
		<Editor name="MFE editor" />
	</StrictMode>
);
