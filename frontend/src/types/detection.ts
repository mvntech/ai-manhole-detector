export interface Detection {
    id: string;
    camera_id: string;
    object_class: string;
    confidence: number;
    image_url: string;
    status: string;
    severity: string;
    timestamp: string;
}