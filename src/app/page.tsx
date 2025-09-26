"use client";
import axios from "axios";
import { useRef, useState } from "react";

interface MetaData {
  size: number;
  fileType: string;
}

export default function Home() {
  const [metaData, setMetaData] = useState<MetaData>({ size: 0, fileType: "" });
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  //no more required
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = async (e: any) => {
    try {
      setMetaData({
        ...metaData,
        size: e.target.files[0].size,
        fileType: e.target.files[0].type,
      });
      console.log(metaData, e.target.files);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (
        !hiddenFileInput.current ||
        !hiddenFileInput.current.files ||
        hiddenFileInput.current.files.length === 0
      ) {
        throw new Error("No file selected");
      }
      const response = await axios.get("/api/presignedPutUrl");
      const { presignedUrl, fileName } = response.data;
      if (!presignedUrl) {
        throw new Error("No presigned url");
      }

      console.log("Response from backend :: ", presignedUrl);
      const uploadResponse = await axios.put(
        presignedUrl,
        hiddenFileInput.current.files[0],
        {
          headers: {
            "Content-Type": metaData.fileType,
          },
        }
      );
      console.log("Upload response :: ", uploadResponse);
      if (uploadResponse.status !== 200) {
        throw new Error("Upload failed");
      } else {
        alert("File uploaded successfully");
        axios.post("/api/notifyUpload", { fileName });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form>
        <input
          type="file"
          name="file"
          accept=".mp4"
          ref={hiddenFileInput}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            handleFileChange(e);
          }}
        />
        <button
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            await handleSubmit();
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
