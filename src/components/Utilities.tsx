interface DetectedObject {
    bbox: [number, number, number, number]; // [x, y, width, height]
    class: string;
    score: number;
}

export const drawRect = (detectedObjects: any[], ctx: CanvasRenderingContext2D) => {
    // Loop through each prediction

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const colors: { [key: string]: string } = {
        'person': 'red',
        'car': 'green',
        // Add more classes and colors as needed
    };

    detectedObjects.forEach(prediction => {
        const [x, y, width, height] = prediction.bbox;
        const label = `${prediction.class} (${Math.round(prediction.score * 100)}%)`;
        const color = colors[prediction.class] || 'yellow'; // Default color

        // Draw bounding box
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.stroke();

        // Draw label
        ctx.fillStyle = color;
        ctx.font = '16px Arial';
        ctx.fillText(label, x, y - 5);
    });
};

export const drawVideoCanvasImage = (video: HTMLVideoElement, ctx: CanvasRenderingContext2D, detectedObjects: DetectedObject[]) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(video, 0, 0);

    const colors: { [key: string]: string } = {
        'person': 'red',
        'car': 'green',
        // Add more classes and colors as needed
    };

    detectedObjects.forEach(prediction => {
        const [x, y, width, height] = prediction.bbox;
        const label = `${prediction.class} (${Math.round(prediction.score * 100)}%)`;
        const color = colors[prediction.class] || 'yellow'; // Default color

        // Draw bounding box
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.stroke();

        // Draw label
        ctx.fillStyle = color;
        ctx.font = '16px Arial';
        ctx.fillText(label, x, y - 5);
    });
};

