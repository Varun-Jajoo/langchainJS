import React, { useState } from 'react';
import axios from 'axios';

const ChatbotApp = () => {
  const [inputValue, setInputValue] = useState(''); 
  const [outputValue, setOutputValue] = useState('');
  const [file, setFile] = useState(null); 

  const handleInputChange = (e) => {
    setInputValue(e.target.value); 
  };

  const handleFileChange = (e) => {
   
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('input', inputValue);
      formData.append('file', file); 
      const res = await axios.post('http://localhost:3020/api/process-input', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      setOutputValue(res.data);
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };

  return (
    <div className="bg-[#1a1a1a] min-h-screen p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 p-6 bg-[#333] rounded-lg">
          <h1 className="text-3xl font-bold mb-4">Made by Varun Jajoo</h1>
          <p className="mb-4">
            This is an open source AI chatbot app template built by Varun Jajoo. It uses React.js, LANGCHAIN, and Gemini.
            React Server Components are utilized to combine text with generative UI as output of the LLM. The UI state is synced
            through the SDK so the model is aware of your interactions as they happen.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-[#333] rounded-lg">
              <p className="font-semibold">What are the trending memecoins today?</p>
            </div>
            <div className="p-4 bg-[#333] rounded-lg">
              <p className="font-semibold">I would like to buy 42 $DOGE</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-[#333] rounded-lg">
              <p className="font-semibold">What is the price of $DOGE right now?</p>
            </div>
            <div className="p-4 bg-[#333] rounded-lg">
              <p className="font-semibold">What are some recent events about $DOGE?</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center p-4 bg-[#333] rounded-lg">
          <input
            type="text"
            placeholder="Send a message"
            value={inputValue}
            onChange={handleInputChange}
            className="flex-grow p-2 mr-2 rounded-md border border-gray-300 focus:outline-none  text-black"
          />
        <div style={{ position: 'relative', display: 'inline-block' }}>
  <input
    type="file"
    id="fileInput" 
    onChange={handleFileChange}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
      cursor: 'pointer',
    }}
  />
  <label htmlFor="fileInput" className="inline-block  text-gray-800 font-semibold py-2 px-4 rounded-lg cursor-pointer">
  <svg
    fill="white"
    height="45px"
    width="45px"
    viewBox="0 0 231.306 231.306"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <g>
        {/* <path
          d="M229.548,67.743L163.563,1.757C162.438,0.632,160.912,0,159.32,0H40.747C18.279,0,0,18.279,0,40.747v149.813 c0,22.468,18.279,40.747,40.747,40.747h149.813c22.468,0,40.747-18.279,40.747-40.747V71.985 C231.306,70.394,230.673,68.868,229.548,67.743z M164.32,19.485l47.5,47.5h-47.5V19.485z M190.559,219.306H40.747 C24.896,219.306,12,206.41,12,190.559V40.747C12,24.896,24.896,12,40.747,12H152.32v60.985c0,3.313,2.687,6,6,6h60.985v111.574 C219.306,206.41,206.41,219.306,190.559,219.306z"
        ></path> */}
        <path
          d="m103.826,52.399c-5.867-5.867-13.667-9.098-21.964-9.098s-16.097,3.231-21.964,9.098c-5.867,5.867-9.098,13.667-9.098,21.964 0,8.297 3.231,16.097 9.098,21.964l61.536,61.536c7.957,7.956 20.9,7.954 28.855,0 7.955-7.956 7.955-20.899 0-28.855l-60.928-60.926c-2.343-2.343-6.143-2.343-8.485,0-2.343,2.343-2.343,6.142 0,8.485l60.927,60.927c3.276,3.276 3.276,8.608 0,11.884s-8.607,3.276-11.884,0l-61.536-61.535c-3.601-3.601-5.583-8.388-5.583-13.479 0-5.092 1.983-9.879 5.583-13.479 7.433-7.433 19.525-7.433 26.958,0l64.476,64.476c11.567,11.567 11.567,30.388 0,41.955-5.603,5.603-13.053,8.689-20.977,8.689s-15.374-3.086-20.977-8.689l-49.573-49.574c-2.343-2.343-6.143-2.343-8.485,0-2.343,2.343-2.343,6.142 0,8.485l49.573,49.573c7.87,7.87 18.333,12.204 29.462,12.204s21.593-4.334 29.462-12.204 12.204-18.333 12.204-29.463c0-11.129-4.334-21.593-12.204-29.462l-64.476-64.476z"
        ></path>
      </g>
    </g>
  </svg>
</label>

</div>



          <button
            onClick={handleSubmit}
            className="p-2 bg-black text-white rounded-md hover:bg-black focus:outline-none focus:ring "
          >
            Send
          </button>
        </div>

        {outputValue && (
          <div className="mt-4 p-4 bg-[#333] rounded-lg">
            <h3 className="text-lg font-semibold">Response:</h3>
            <p>{outputValue}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotApp;
