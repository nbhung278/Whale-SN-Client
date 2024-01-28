import React from "react";

const KeysPage = () => {
	return (
		<div className="p-6 bg-white">
			<div className="flex flex-row gap-2">
				<div>Keys & URLs</div>
				<button>Generate</button>
			</div>
			<div className="flex flex-row">
				<div>Server URL</div>
				<div className="border border-[black]">
					<input type="text" />
				</div>
			</div>
			<div className="flex flex-row">
				<div>Stream key</div>
				<div className="border border-[black]">
					<input type="text" />
				</div>
			</div>
		</div>
	);
};

export default KeysPage;
