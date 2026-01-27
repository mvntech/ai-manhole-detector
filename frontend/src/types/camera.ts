export interface Camera {
    id: string;
    name: string;
    location: string;
    status: string;
    is_active: boolean;
    stream_url?: string;
    rtsp_url?: string;
}
