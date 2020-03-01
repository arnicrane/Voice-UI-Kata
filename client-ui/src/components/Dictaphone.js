import React from "react";
import SpeechRecognition from "react-speech-recognition";

const Dictaphone = ({
  /* SpeechRecognition-specific props */
  transcript,
  resetTranscript,
  browserSupportsSpeechRecognition,

  /* custom props */
  onValidNumberCaptured,
  onResetPhraseCaptured
}) => {

  if (!browserSupportsSpeechRecognition) {
    return <h2>Your browser doesn't support Speech recognition - Please use Chrome or disable your mic & refresh</h2>;
  } else {
    if (transcript === "start again") {
      onResetPhraseCaptured();
      resetTranscript();
    } else if (transcript.match(/^\d+$/)) {
      onValidNumberCaptured(transcript);
      resetTranscript();
    }
  }

  return (
    <div>
      <button onClick={resetTranscript}>Reset Transcript</button>
    </div>
  );
};

export default SpeechRecognition(Dictaphone);
