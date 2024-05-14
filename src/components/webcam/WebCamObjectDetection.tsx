import React, {useEffect, useRef} from 'react';
import * as cocossd from "@tensorflow-models/coco-ssd";
import * as tf from '@tensorflow/tfjs';
import Webcam from "react-webcam";
import {drawRect} from "../Utilities";
export const WebCamObjectDetection=()=> {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const originalSize = useRef<number[]>([0, 0]);

    // Main function
    const runCoco = async () => {
        console.log("Hand pose model loaded.");
        await tf.setBackend('webgl');
        const net = await cocossd.load();
        //  Loop and detect hands
        setInterval(() => {
            detect(net);
        }, 10);
    };


    const detect = async (net: any) => {
        if (webcamRef.current && webcamRef.current.video) {
            // Get Video Properties
            const video = webcamRef.current.video as HTMLVideoElement;

            // Check if video is ready
            if (video.readyState === 4) {
                const videoWidth = video.videoWidth;
                const videoHeight = video.videoHeight;

                // Set video width
                video.width = videoWidth;
                video.height = videoHeight;

                // Set canvas height and width
                if (canvasRef.current) {
                    canvasRef.current.width = videoWidth;
                    canvasRef.current.height = videoHeight;
                }

                // Make Detections
                const obj = await net.detect(video);

                // Draw mesh
                const canvas = canvasRef.current;
                if (canvas) {
                    const ctx = canvas.getContext('2d');
                    if(ctx) {
                        await resetCanvas();
                        drawRect(obj, ctx);
                    }
                }
            }
        }
    };

    const resetCanvas = async () => {
        const context = canvasRef.current!.getContext("2d")!;
        context.clearRect(0, 0, originalSize.current[0], originalSize.current[1]);
    };




    useEffect(() => {
        runCoco().then(r => console.log("Model loaded ....."));
    });

    return (
        <div className="container">
            <h1>Webcam Real-time Object Detection</h1>
            <br/>

            <Webcam
                ref={webcamRef}
                muted={true}
                style={{
                    display: 'block',
                    marginTop: '20px',
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    width: "auto",
                    height: "auto",
                }}
                onLoadedMetadata={() => {
                    originalSize.current = [webcamRef.current!.video!.offsetWidth, webcamRef.current!.video!.offsetHeight,] as number[];
                }}
            />

            <canvas
                ref={canvasRef}
                style={{
                    display: 'block',
                    position: "absolute",
                    marginTop: '20px',
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    width: "auto",
                    height: "auto",
                }}
            />
        </div>
    );
}