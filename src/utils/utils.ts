const readUploadedFileAsDataURLAsync = (inputFile: File): Promise<string> => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
            temporaryFileReader.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        temporaryFileReader.onload = () => {
            resolve(temporaryFileReader.result as string);
        };
        temporaryFileReader.readAsDataURL(inputFile);
    });
};

export const convertToBase64 = async (file: File) => {
    try {
        return await readUploadedFileAsDataURLAsync(file);
    } catch (e) {
        console.warn((e as Error).message);
    }
};

export const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export const getFileTypeFromBase64 = (base64String: string) => {
    // Extract the data URI prefix (e.g., "data:image/png;base64,")
    const prefix = base64String.substring(0, base64String.indexOf(';base64,'));

    // Extract the file extension from the prefix (e.g., "image/png")
    const fileType = prefix.substring(prefix.indexOf('/') + 1);

    return fileType;
}

export const getMIMETypeFromBase64 = (base64String: string) => {
    // Extract the data URI prefix (e.g., "data:image/png;base64,")
    const prefix = base64String.substring(0, base64String.indexOf(';base64,'));

    // Extract the MIME type from the prefix (e.g., "image/png")
    const mimeType = prefix.substring(prefix.indexOf(':') + 1);

    return mimeType;
}
