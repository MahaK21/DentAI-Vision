import React from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter, Routes, Route} from "react-router-dom"

import './index.css';

// Different pages for routing
import Homepage from './pages/Homepage';
import NewChat from './pages/NewChat';
import Chatroom from './pages/Chatroom';
import About from './pages/About';

/*
Bug: For some reason, this imports and applies each stylesheet to the entire document.
It applies downward (waterfall). Fix!
*/

import Page404 from './pages/PageNotFound';

import reportWebVitals from './reportWebVitals';

export default function App() {
  return (
    /*
    Used helpful info from https://www.w3schools.com/react/react_router.asp
    */

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/new-chat" element={<NewChat/>}></Route>
      <Route path="/chat" element={<Chatroom/>}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="*" element={<Page404 />}></Route>
    </Routes>
    </BrowserRouter>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
