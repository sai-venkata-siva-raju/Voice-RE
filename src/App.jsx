import React from 'react'
import './App.css'
import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import 'regenerator-runtime/runtime';



const App = () => {
  cconst [transcript, setTranscript] = useState("");

  // Use the hook provided by react-speech-recognition
  const {
    transcript: speechTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Update the transcript when speech is recognized
  const handleTranscriptChange = () => {
    setTranscript(speechTranscript);
  };

  // Start listening to speech
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
  };

  // Stop listening to speech
  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  // Restart listening
  const restartListening = () => {
    resetTranscript();
    startListening();
  };

  // Handle the case when the browser does not support speech recognition
  if (!browserSupportsSpeechRecognition) {
    return <div>Sorry, your browser does not support speech recognition.</div>;
  }
  return (
    <div>
      <div className='container'>
        <h1>Speech to text converter</h1>
        <div className='main-content'>
        <h2>Transcript:</h2>
      <p>{transcript || speechTranscript}</p>

      {/* Display current listening state */}
      {listening ? <p>Listening...</p> : <p>Not Listening</p>}
        </div>
        <div className='btn-style'>
        <button onClick={startListening} disabled={listening}>
          copy to clipboard
        </button>
        <button onClick={stopListening} disabled={!listening}>
          Start Listening
        </button>
        <button onClick={restartListening}>stopListening</button>
        </div>

      </div>
    </div>
  )
}

export default App
