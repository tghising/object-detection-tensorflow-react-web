import React, { useEffect, useRef, useState } from 'react';
import * as cocossd from "@tensorflow-models/coco-ssd";
import * as tf from '@tensorflow/tfjs';
import {drawVideoCanvasImage} from "../Utilities";

const VideoObjectDetection = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [model, setModel] = useState<cocossd.ObjectDetection | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const loadModel = async () => {
        await tf.setBackend('webgl');
        const loadedModel = await cocossd.load();
        setModel(loadedModel);
        await detect(loadedModel);
    };

    const detect = async (model: cocossd.ObjectDetection) => {
        const video:HTMLVideoElement = videoRef.current as HTMLVideoElement;
        // Check if video is ready
        if (video && video.readyState === 4 && !video.ended) {
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            video.width = videoWidth;
            video.height = videoHeight;

            const canvas: HTMLCanvasElement | null = canvasRef.current;

            if (canvas) {
                canvas.width = videoWidth;
                canvas.height = videoHeight;
                const detectedObjects:cocossd.DetectedObject[] = await model.detect(video);


                const ctx = canvas?.getContext('2d');
                if (ctx) {
                    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
                    drawVideoCanvasImage(video, ctx, detectedObjects);
                }
            }
        }

        if (video && !video.paused) {
            requestAnimationFrame(() => {
                detect(model);
            });
        }
    };

    useEffect(() => {
        if (!videoFile) return;

        loadModel().then(response => console.log("Model loaded ....."))
            .catch(error => {
                console.log("Unable to load the Model :: ", error)
                loadModel().then(response => console.log("Model loaded ....."));
            });

        return () => {
            // Cleanup model when component unmounts
            if (model) {
                model.dispose();
            }
        };

    }, [videoFile]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setVideoFile(file);
        loadModel().then(r => console.log("-------------"));
    };

    return (
        <div className="container">
            <h1>Video Object Detection</h1>
            <input type="file" accept="video/*" onChange={handleFileChange} />

            {videoFile && (
                <>
                    <video
                        ref={videoRef}
                        autoPlay
                        muted={true}
                        style={{
                            marginTop:'15px',
                            display: 'block',
                            position: "absolute",
                            marginLeft: "auto",
                            marginRight: "auto",
                            left: 0,
                            right: 0,
                            width: "auto",
                            height: "auto",
                        }}

                    >
                        <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
                    </video>

                    <canvas
                        ref={canvasRef}
                        style={{
                            marginTop:'15px',
                            display: 'block',
                            position: "absolute",
                            marginLeft: "auto",
                            marginRight: "auto",
                            left: 0,
                            right: 0,
                            width: "auto",
                            height: "auto"
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default VideoObjectDetection;
