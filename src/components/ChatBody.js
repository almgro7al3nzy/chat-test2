import React, {useState} from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import Amplify from 'aws-amplify'
import { Predictions, AmazonAIPredictionsProvider } from 'aws-amplify'
import awsconfing from '../aws-exports.js'
import mic from 'microphone-stream'
function ChatBody() {
    function SpeechToText(props) {
        const [response, setResponse] = useState("Press 'start recording' to begin your transcription. Press STOP recording once you finish speaking.")
        
        function AudioRecorder(props) {
          const [recording, setRecording] = useState(false);
          const [micStream, setMicStream] = useState();
          const [audioBuffer] = useState(
            (function() {
              let buffer = [];
              function add(raw) {
                buffer = buffer.concat(...raw);
                return buffer;
              }
              function newBuffer() {
                console.log("resetting buffer");
                buffer = [];
              }
       
              return {
                reset: function() {
                  newBuffer();
                },
                addData: function(raw) {
                  return add(raw);
                },
                getData: function() {
                  return buffer;
                }
              };
            })()
          );
      
          async function startRecording() {
            console.log('start recording');
            audioBuffer.reset();
      
            window.navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
              const startMic = new mic();
      
              startMic.setStream(stream);
              startMic.on('data', (chunk) => {
                var raw = mic.toRaw(chunk);
                if (raw == null) {
                  return;
                }
                audioBuffer.addData(raw);
      
              });
      
              setRecording(true);
              setMicStream(startMic);
            });
          }
      
          async function stopRecording() {
            console.log('stop recording');
            const { finishRecording } = props;
      
            micStream.stop();
            setMicStream(null);
            setRecording(false);
      
            const resultBuffer = audioBuffer.getData();
      
            if (typeof finishRecording === "function") {
              finishRecording(resultBuffer);
            }
      
          }
      
          return (
            <div className="audioRecorder">
              <div>
                {recording && <button onClick={stopRecording}>Stop recording</button>}
                {!recording && <button onClick={startRecording}>Start recording</button>}
              </div>
            </div>
          );
        }
      
        function convertFromBuffer(bytes) {
          setResponse('Converting text...');
          
          Predictions.convert({
            transcription: {
              source: {
                bytes
              },
              // language: "en-US", // other options are "en-GB", "fr-FR", "fr-CA", "es-US"
            },
          }).then(({ transcription: { fullText } }) => setResponse(fullText))
            .catch(err => setResponse(JSON.stringify(err, null, 2)))
        }
      
        return (
          <div className="Text">
            <div>
              <h3>Speech to text</h3>
              <AudioRecorder finishRecording={convertFromBuffer} />
              <p>{response}</p>
            </div>
          </div>
        );
      }
  return (
    <Container>
        <Chat>
            <SpeechToText/>
        </Chat>
        <Button>
            <Icon icon="bi:mic-fill" color="white" width="30" height="30" />
        </Button>
    </Container>
  )
}






export default ChatBody

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 60px);
    width: 500px;

`
const Chat = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 170px);
    width: 400px;
    gap: 10px;
    border-radius: 2%;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    border: 3px solid rgba(249, 249, 249, 0.1);
    background: #e3e1e1;
    
`
const Button = styled.button
`
    margin-top: 20px;
    margin-bottom: 10px;
    width: 65px;
    height: 65px;
    border-radius: 50%;
    border-color: transparent;
    background: #083474;
    cursor: pointer;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;

    &:hover{
        background:#041f47;
        transform: scale(1.05);
        box-shadow: rgb(0 0 0 / 69%) 0px 40px 58px -16px,
        rgb(0 0 0 / 73%) 0px 30px 22px -10px;       
    }

`