import { Uploader } from "uploader";
import { UploadDropzone } from "react-uploader";
import { useState } from "react";
import { GenerateResponseData } from "../pages/api/generate";
import Image from "next/image";

const uploaderOptions = {
  maxFileCount: 1,
  mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
  editor: { images: { crop: false } },
  styles: {
    colors: {
      primary: "#2563EB", // Primary buttons & links
      error: "#d23f4d", // Error messages
      shade100: "#fff", // Standard text
      shade200: "#f3f3f3", // Secondary button text
      shade300: "#e2e2e2", // Secondary button text (hover)
      shade400: "#b4b4b4", // Welcome text
      shade500: "#979797", // Modal close button
      shade600: "#6f6f6f", // Border
      shade700: "#484848", // Progress indicator background
      shade800: "#1c1c1c", // File item background
      shade900: "#000", // Various (draggable crop buttons, etc.)
    },
  }
};

// Initialize once (at the start of your app).
const uploader = Uploader({ apiKey: "public_W142hmkApFLiHC2zmn3P5UKRHgJW" }); // Your real API key.

export const UploderButton = () => {

  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState("Modern");
  const [room, setRoom] = useState("Living Room");

  async function generatePhoto(fileUrl: string) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: fileUrl, theme, room }),
    });

    let response = (await res.json()) as GenerateResponseData;
    if (res.status !== 200) {
      setError(response as any);
    } else {
      const rooms =
        (JSON.parse(localStorage.getItem("rooms") || "[]") as string[]) || [];
      rooms.push(response.id);
      localStorage.setItem("rooms", JSON.stringify(rooms));
      setRestoredImage(response.generated);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <UploadDropzone uploader={uploader}
            options={uploaderOptions}
            onUpdate={(file) => {
              console.log("updatingg..........");
              if (file.length !== 0) {
                generatePhoto(file[0].fileUrl.replace("raw", "thumbnail"));
              }
            }}
            width="100%"
            height="375px" />
        </div>
        {restoredImage && (
          <div>
            <h2 className="mb-1 font-medium text-lg">Generated Room</h2>
            <a href={restoredImage} target="_blank" rel="noreferrer">
              <Image
                alt="restored photo"
                src={restoredImage}
                className="rounded-2xl relative sm:mt-0 mt-2 cursor-zoom-in w-full h-96"
                width={475}
                height={475}
                onLoadingComplete={() => setRestoredLoaded(true)}
              />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}