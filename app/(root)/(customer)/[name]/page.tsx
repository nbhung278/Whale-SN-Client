"use client";

import "@livekit/components-styles";
import {
	LiveKitRoom,
	VideoConference,
	GridLayout,
	ParticipantTile,
	RoomAudioRenderer,
	ControlBar,
	useTracks,
} from "@livekit/components-react";
import { useEffect, useState } from "react";
import { Track } from "livekit-client";

export default function Page() {
	// TODO: get user input for room and name
	const room = "quickstart-room";
	const name = "quickstart-user";
	const [token, setToken] = useState(
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDY2MDAyMDAsImlzcyI6IkFQSWFXcUZ0ZGlYdHJiTSIsIm5iZiI6MTcwNjU5OTMwMCwic3ViIjoibmJodW5nIiwidmlkZW8iOnsiY2FuUHVibGlzaCI6dHJ1ZSwiY2FuUHVibGlzaERhdGEiOnRydWUsImNhblN1YnNjcmliZSI6dHJ1ZSwicm9vbSI6IjEiLCJyb29tSm9pbiI6dHJ1ZX19.MR8DXbQynXV6rNu7ToUwjyAJe2cEFXIFv6f8chkbIm8"
	);

	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			const resp = await fetch(
	// 				`/api/get-participant-token?room=${room}&username=${name}`
	// 			);
	// 			const data = await resp.json();
	// 			setToken(data.token);
	// 		} catch (e) {
	// 			console.error(e);
	// 		}
	// 	})();
	// }, []);

	if (token === "") {
		return <div>Getting token...</div>;
	}

	return (
		<LiveKitRoom
			video={true}
			audio={true}
			token={token}
			serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_API_URL}
			// Use the default LiveKit theme for nice styles.
			data-lk-theme="default"
			style={{ height: "100dvh" }}
		>
			{/* Your custom component with basic video conferencing functionality. */}
			<MyVideoConference />
			{/* The RoomAudioRenderer takes care of room-wide audio for you. */}
			<RoomAudioRenderer />
			{/* Controls for the user to start/stop audio, video, and screen 
      share tracks and to leave the room. */}
			<ControlBar />
		</LiveKitRoom>
	);
}

function MyVideoConference() {
	// `useTracks` returns all camera and screen share tracks. If a user
	// joins without a published camera track, a placeholder track is returned.
	const tracks = useTracks(
		[
			{ source: Track.Source.Camera, withPlaceholder: true },
			{ source: Track.Source.ScreenShare, withPlaceholder: false },
		],
		{ onlySubscribed: false }
	);
	return (
		<GridLayout
			tracks={tracks}
			style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
		>
			{/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
			<ParticipantTile />
		</GridLayout>
	);
}
