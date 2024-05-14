import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from "./common/Navbar";
import Home from "./components/home/Home";
import VideoObjectDetection from "./components/video/VideoObjectDetection";
import {WebCamObjectDetection} from "./components/webcam/WebCamObjectDetection";
import Footer from "./common/Footer";

function App() {

    return (
        <Router>
            <div>
                <Navbar/>
                <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/video" element={<VideoObjectDetection/>} />
                        <Route path="/webcam" element={<WebCamObjectDetection/>} />
                    </Routes>
                </div>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
