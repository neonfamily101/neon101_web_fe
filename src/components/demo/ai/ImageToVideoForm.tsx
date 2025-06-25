// "use client";

// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/demo/ui/button";
// import { Label } from "@/components/demo/ui/label";
// import { Input } from "@/components/demo/ui/input";
// import { Textarea } from "@/components/demo/ui/textarea";
// import { AIFormLayout } from "@/components/demo/AIFormLayout";
// import { ResultBox } from "@/components/demo/ResultBox";
// import { Play, Download } from "lucide-react";

// export function ImageToVideoForm() {
//   const [imageUrl, setImageUrl] = useState("");
//   const [prompt, setPrompt] = useState("");
//   const [isLoading, setLoading] = useState(false);
//   const [error, setError] = useState<string>("");
//   const [videoUrl, setVideoUrl] = useState<string>("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!imageUrl.trim()) return;

//     setLoading(true);
//     setError("");
//     setVideoUrl("");

//     try {
//       // 1) Create task
//       const payload: any = {
//         image: imageUrl,
//         model_name: "kling-v2-1",
//         mode: "std",
//         duration: "5",
//         cfg_scale: 0.5,
//       };
//       if (prompt.trim()) payload.prompt = prompt;

//       const createRes = await fetch("http://127.0.0.1:8000/image-to-video/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (!createRes.ok) {
//         const text = await createRes.text();
//         throw new Error(`Create error: ${createRes.status} ${text}`);
//       }
//       const { task_id } = await createRes.json();

//       // 2) Poll for completion
//       let attempts = 0;
//       const interval = setInterval(async () => {
//         attempts++;
//         if (attempts > 20) {
//           clearInterval(interval);
//           setError("Generation timeout.");
//           setLoading(false);
//           return;
//         }
//         const statusRes = await fetch(`http://127.0.0.1:8000/image-to-video/${task_id}`);
//         const data = await statusRes.json();
//         if (data.task_status === "succeed") {
//           clearInterval(interval);
//           const url = data.task_result.videos?.[0]?.url;
//           setVideoUrl(url);
//           setLoading(false);
//         } else if (data.task_status === "failed") {
//           clearInterval(interval);
//           // setError("Video generation failed.");
// +      // 서버가 보내준 실패 사유를 그대로 표시
// +      setError(data.task_status_msg || "Video generation failed.");          
//           setLoading(false);
//         }
//       }, 3000);
//     } catch (err: any) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const handleDownload = () => {
//     if (!videoUrl) return;
//     const link = document.createElement("a");
//     link.href = videoUrl;
//     link.download = "generated-video.mp4";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <AIFormLayout
//       title="Image → Video"
//       description="KlingAI API로 이미지 기반 5초 영상 생성"
//       icon={<Play className="h-5 w-5 text-matrix" />}
//     >
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="space-y-2">
//           <Label htmlFor="imageUrl" className="text-gray-300 font-mono text-sm">
//             Image URL:
//           </Label>
//           <Input
//             id="imageUrl"
//             type="text"
//             placeholder="https://example.com/my-image.jpg"
//             value={imageUrl}
//             onChange={(e) => setImageUrl(e.target.value)}
//             className="bg-black border-gray-700 text-white placeholder-gray-500 font-mono text-sm focus:border-matrix transition-all duration-300"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="prompt" className="text-gray-300 font-mono text-sm">
//             Prompt (Optional):
//           </Label>
//           <Textarea
//             id="prompt"
//             placeholder="Describe the motion…"
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             rows={3}
//             className="bg-black border-gray-700 text-white placeholder-gray-500 font-mono text-sm focus:border-matrix transition-all duration-300"
//           />
//         </div>

//         <Button
//           type="submit"
//           disabled={isLoading || !imageUrl.trim()}
//           className="w-full bg-black border border-matrix text-matrix hover:bg-white hover:text-black font-mono transition-all duration-300"
//         >
//           <Play className="mr-2 h-4 w-4" />
//           {isLoading ? "Processing…" : "Generate Video"}
//         </Button>
//       </form>

//       {(videoUrl || error) && (
//         <div className="mt-6">
//           <ResultBox title="Result" status={error ? "error" : "success"}>
//             {error ? (
//               <p className="text-red-400">ERROR: {error}</p>
//             ) : (
//               <div className="space-y-4">
//                 <video
//                   src={videoUrl}
//                   controls
//                   className="max-w-full rounded border border-gray-700"
//                 />
//                 <Button
//                   onClick={handleDownload}
//                   className="mt-2 w-full bg-black border border-matrix text-matrix hover:bg-matrix hover:text-black font-mono transition-all duration-300"
//                 >
//                   <Download className="mr-2 h-4 w-4" />
//                   Download Video
//                 </Button>
//               </div>
//             )}
//           </ResultBox>
//         </div>
//       )}
//     </AIFormLayout>
//   );
// }
"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/demo/ui/button";
import { Label } from "@/components/demo/ui/label";
import { Input } from "@/components/demo/ui/input";
import { Textarea } from "@/components/demo/ui/textarea";
import { AIFormLayout } from "@/components/demo/AIFormLayout";
import { ResultBox } from "@/components/demo/ResultBox";
import { Play, Download } from "lucide-react";

export function ImageToVideoForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 40;
  const [error, setError] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) setImageUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim() && !file) return;

    setLoading(true);
    setError("");
    setVideoUrl("");
    setAttempts(0);

    try {
      const form = new FormData();
      if (file) form.append("image_file", file);
      else form.append("image_url", imageUrl.trim());
      form.append("model_name", "kling-v2-1");
      form.append("mode", "std");
      form.append("duration", "5");
      form.append("cfg_scale", "0.5");
      if (prompt.trim()) form.append("prompt", prompt.trim());

      const createRes = await fetch(
        "http://127.0.0.1:8000/image-to-video/create",
        { method: "POST", body: form }
      );
      if (!createRes.ok) {
        const text = await createRes.text();
        throw new Error(`Create error: ${createRes.status} ${text}`);
      }
      const { task_id } = await createRes.json();

      // 2) Poll for completion
      const iv = setInterval(async () => {
        setAttempts((a) => a + 1);
        if (attempts + 1 > maxAttempts) {
          clearInterval(iv);
          setError("Generation timeout.");
          setLoading(false);
          return;
        }
        const statusRes = await fetch(
          `http://127.0.0.1:8000/image-to-video/${task_id}`
        );
        const data = await statusRes.json();
        if (data.task_status === "succeed") {
          clearInterval(iv);
          setVideoUrl(data.task_result.videos?.[0]?.url || "");
          setLoading(false);
        } else if (data.task_status === "failed") {
          clearInterval(iv);
          setError(data.task_status_msg || "Video generation failed.");
          setLoading(false);
        }
      }, 5000);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!videoUrl) return;
    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = "generated-video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // 진행도 계산 (percent)
  const progress = Math.min(100, Math.floor((attempts / maxAttempts) * 100));

  return (
    <AIFormLayout
      title="Image → Video"
      description="이미지 URL 또는 파일 업로드로 5초 영상 생성"
      icon={<Play className="h-5 w-5 text-matrix" />}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* URL 입력 */}
        <div className="space-y-2">
          <Label htmlFor="imageUrl" className="text-gray-300 font-mono text-sm">
            Image URL
          </Label>
          <Input
            id="imageUrl"
            type="text"
            placeholder="https://example.com/my-image.jpg"
            value={imageUrl}
            disabled={!!file}
            onChange={(e) => setImageUrl(e.target.value)}
            className="bg-black border-gray-700 text-white placeholder-gray-500 font-mono text-sm"
          />
        </div>

        {/* 파일 업로드 */}
        <div className="space-y-2">
          <Label htmlFor="imageFile" className="text-gray-300 font-mono text-sm">
            Image File
          </Label>
          <Input
            id="imageFile"
            type="file"
            accept="image/*"
            disabled={!!imageUrl.trim()}
            onChange={handleFileSelect}
            className="bg-black border-gray-700 text-white font-mono text-sm"
          />
        </div>

        {/* Prompt */}
        <div className="space-y-2">
          <Label htmlFor="prompt" className="text-gray-300 font-mono text-sm">
            Prompt (Optional)
          </Label>
          <Textarea
            id="prompt"
            placeholder="Describe the motion…"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="bg-black border-gray-700 text-white placeholder-gray-500 font-mono text-sm"
          />
        </div>

        {/* 진행도 표시 */}
        {isLoading && (
          <div className="space-y-1">
            <progress
              value={progress}
              max={100}
              className="w-full h-2 bg-gray-700"
            />
            <p className="text-xs text-gray-400">
              Generating… {progress}%
            </p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading || (!imageUrl.trim() && !file)}
          className="w-full bg-black border border-matrix text-matrix hover:bg-white hover:text-black font-mono text-sm"
        >
          <Play className="mr-2 h-4 w-4" />
          {isLoading ? "Processing…" : "Generate Video"}
        </Button>
      </form>

      {(videoUrl || error) && (
        <div className="mt-6">
          <ResultBox title="Result" status={error ? "error" : "success"}>
            {error ? (
              <p className="text-red-400">ERROR: {error}</p>
            ) : (
              <div className="space-y-4">
                <video
                  src={videoUrl}
                  controls
                  className="max-w-full rounded border border-gray-700"
                />
                <Button
                  onClick={handleDownload}
                  className="mt-2 w-full bg-black border border-matrix text-matrix font-mono text-sm"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Video
                </Button>
              </div>
            )}
          </ResultBox>
        </div>
      )}
    </AIFormLayout>
  );
}
