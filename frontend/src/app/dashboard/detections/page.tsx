"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { motion, AnimatePresence } from "framer-motion"
import {
    Upload,
    File,
    X,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Image as ImageIcon,
    PlayCircle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useDetections } from "@/hooks/use-detections"
import { useCameras } from "@/hooks/use-cameras"
import { toast } from "react-hot-toast"
import { cn } from "@/lib/utils"

export default function DetectionsPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [selectedCamera, setSelectedCamera] = useState<string>("")
    const { uploadDetection, detections, isLoading: isDetectionsLoading } = useDetections()
    const { cameras } = useCameras()
    const [isUploading, setIsUploading] = useState(false)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setSelectedFile(acceptedFiles[0])
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png"],
            "video/*": [".mp4", ".mov", ".avi"]
        },
        maxFiles: 1
    })

    const handleUpload = async () => {
        if (!selectedFile || !selectedCamera) {
            toast.error("Please select a file and a camera context.")
            return
        }

        setIsUploading(true)
        try {
            await uploadDetection({ cameraId: selectedCamera, file: selectedFile })
            toast.success("File uploaded! AI processing started.")
            setSelectedFile(null)
        } catch (error) {
            toast.error("Failed to upload file.")
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="space-y-8 p-6 pb-24">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">AI Inspector</h1>
                <p className="text-muted-foreground mt-1">Upload on-demand images or videos for instant manhole hazard detection.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <Card className="border-white/5 bg-card/50 backdrop-blur-xl overflow-hidden">
                        <CardHeader>
                            <CardTitle>Manual Upload</CardTitle>
                            <CardDescription>Simulate a camera feed by uploading local media.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Select Deployment Source</label>
                                <select
                                    className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                                    value={selectedCamera}
                                    onChange={(e) => setSelectedCamera(e.target.value)}
                                >
                                    <option value="" disabled>Choose a camera...</option>
                                    {cameras.map((cam) => (
                                        <option key={cam.id} value={cam.id}>{cam.name} ({cam.location})</option>
                                    ))}
                                </select>
                            </div>

                            <div
                                {...getRootProps()}
                                className={cn(
                                    "border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer group",
                                    isDragActive ? "border-primary bg-primary/5" : "border-white/10 hover:border-primary/50 hover:bg-white/5",
                                    selectedFile ? "border-green-500/50 bg-green-500/5" : ""
                                )}
                            >
                                <input {...getInputProps()} />
                                <AnimatePresence mode="wait">
                                    {selectedFile ? (
                                        <motion.div
                                            key="selected"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="space-y-4"
                                        >
                                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                                                {selectedFile.type.startsWith("image") ? <ImageIcon className="text-green-500" /> : <PlayCircle className="text-green-500" />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground">{selectedFile.name}</p>
                                                <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setSelectedFile(null)
                                                }}
                                                className="text-destructive hover:bg-destructive/10"
                                            >
                                                <X className="w-4 h-4 mr-2" /> Remove
                                            </Button>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="empty" className="space-y-4">
                                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                                <Upload className="text-primary w-8 h-8" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-lg font-bold">Drop files here or click to browse</p>
                                                <p className="text-xs text-muted-foreground tracking-wide">Supports PNG, JPG, MP4 (Max 50MB)</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Button
                                className="w-full h-12 rounded-xl text-lg font-bold"
                                disabled={!selectedFile || !selectedCamera || isUploading}
                                onClick={handleUpload}
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    "Run AI Analysis"
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="border-white/5 bg-card/50 backdrop-blur-xl h-full">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Analysis History</CardTitle>
                                <CardDescription>Recent on-demand detections.</CardDescription>
                            </div>
                            {isDetectionsLoading && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
                        </CardHeader>
                        <CardContent className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {detections.length === 0 ? (
                                <div className="text-center py-24 opacity-20">
                                    <ImageIcon className="w-16 h-16 mx-auto mb-4" />
                                    <p>No detections yet</p>
                                </div>
                            ) : (
                                detections.map((det) => (
                                    <motion.div
                                        key={det.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center gap-4 group hover:bg-white/[0.05] transition-all"
                                    >
                                        <div className="w-16 h-16 bg-slate-900 rounded-xl overflow-hidden shrink-0 border border-white/10">
                                            {det.image_url ? (
                                                <img src={det.image_url} alt="Detection" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <ImageIcon className="w-6 h-6 text-muted-foreground" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-sm font-bold truncate capitalize">{det.object_class}</span>
                                                <span className={cn(
                                                    "text-[10px] font-bold px-2 py-0.5 rounded-full",
                                                    det.status === "CONFIRMED" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                                                )}>
                                                    {det.status}
                                                </span>
                                                {det.severity !== "NONE" && (
                                                    <span className={cn(
                                                        "text-[10px] font-bold px-2 py-0.5 rounded-full",
                                                        det.severity === "CRITICAL" ? "bg-red-500/20 text-red-500" :
                                                            det.severity === "HIGH" ? "bg-orange-500/20 text-orange-500" :
                                                                "bg-blue-500/20 text-blue-500"
                                                    )}>
                                                        {det.severity}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <CheckCircle2 className="w-3 h-3 text-primary" />
                                                    {(det.confidence * 100).toFixed(1)}% Confidence
                                                </span>
                                                <span>•</span>
                                                <span>{new Date(det.timestamp).toLocaleTimeString()}</span>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                            <AlertCircle className="w-4 h-4" />
                                        </Button>
                                    </motion.div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
