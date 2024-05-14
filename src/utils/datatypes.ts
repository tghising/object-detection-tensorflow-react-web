export interface FilesProps {
    selectedFiles: File[];
}

export interface ProcessedInference {
    image?: any;
    merged?: any;
    ocr?: any;
    scanner?: any;
}

export interface FileData {
    frame: string;
    name: string;
    size: number;
    sizeText: string;
    type: string;
    base64: string;
    status: string;
    uploadedDate: Date;
    dimensions?: Array<number>;
    duration?: number;
    inference?: ProcessedInference;
}

export interface FileDataListProps {
    selectedFileDataList: FileData[];
    onDeleteAllFileData: () => void;
    runSingleFileData: (frame: string) => Promise<void>;
    deleteSingleFileData: (frame: string, index: number) => void;
}

export interface FileUploadFormProps {
    onUpdate: (inputFileData: FileData) => void;
    onSelectedFile: (inputFileData: FileData) => void;
    setFileDataList: (fileDataList: (prevSelectedFileData: FileData[]) => FileData[]) => void;
    selectedFileDataList: FileData[];
    handleUploadFileData: (event: any) => Promise<void>;
}

export interface EndpointProps {
    name: string;
    endPoint: string;
}
