import React, { useState, useRef, useEffect } from "react";
import { FaSpinner, FaSmile, FaImage, FaTimes } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import { useSelector } from "react-redux";

const NewPostComponent = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const token = useSelector((state) => state.auth.token);

  const [postText, setPostText] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [serverResponse, setServerResponse] = useState(null);
  const fileInputRef = useRef(null);

  const handleTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handleEmojiClick = (emojiObject) => {
    setPostText((prevText) => prevText + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + mediaFiles.length > 5) {
      setServerResponse({
        message: "You can only upload up to 5 files",
        type: "error",
      });
      return;
    }
    setMediaFiles((prevFiles) => [...prevFiles, ...files]);

    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
  };

  const removeFile = (index) => {
    setMediaFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviewUrls((prevUrls) => {
      const updatedUrls = prevUrls.filter((_, i) => i !== index);
      updatedUrls.forEach((url) => URL.revokeObjectURL(url));
      return updatedUrls;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postText && mediaFiles.length === 0) {
      setServerResponse({
        message: "Please add some text or media to your post",
        type: "error",
      });
      return;
    }
    setIsLoading(true);
    setServerResponse(null);

    const formData = new FormData();
    formData.append("text", postText);
    mediaFiles.forEach((file, index) => {
      formData.append(`media`, file);
    });

    try {
      const response = await axios.post(
        `${API_URL}/api/posts/create-post`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Reset form after successful submission
      setPostText("");
      setMediaFiles([]);
      setPreviewUrls((prevUrls) => {
        prevUrls.forEach((url) => URL.revokeObjectURL(url));
        return [];
      });

      setServerResponse({
        message: "Post created successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error creating post:", error);
      setServerResponse({
        message: "Failed to create post. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (serverResponse) {
      const timeout = setTimeout(() => {
        setServerResponse(null);
      }, 1000); // Hide after 1 second (1000ms)
      return () => clearTimeout(timeout);
    }
  }, [serverResponse]);

  return (
    <div className=" mx-auto bg-white rounded-lg shadow-md mb-8 p-4 w-full md:w-2/3">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none outline-none"
            rows="3"
            placeholder="What's on your mind?"
            value={postText}
            onChange={handleTextChange}
          ></textarea>
          <button
            type="button"
            className="absolute bottom-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <FaSmile className="text-xl" />
          </button>
          {showEmojiPicker && (
            <div className="absolute right-0 mt-1 z-10">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative">
              {mediaFiles[index].type.startsWith("image/") ? (
                <img
                  src={url}
                  alt={`Preview ${index}`}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              ) : (
                <video
                  src={url}
                  className="w-24 h-24 object-cover rounded-lg"
                  controls
                />
              )}
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                onClick={() => removeFile(index)}
              >
                <FaTimes className="text-xs" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            className="flex items-center text-blue-500 hover:text-blue-700"
            onClick={() => fileInputRef.current.click()}
          >
            <FaImage className="mr-2" />
            Add Photos/Videos
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <FaSpinner className="animate-spin mx-auto h-5 w-5" />
            ) : (
              "Post"
            )}
          </button>
        </div>
      </form>

      {serverResponse && (
        <div
          className={`mt-4 p-4 rounded-md ${
            serverResponse.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {serverResponse.message}
        </div>
      )}
    </div>
  );
};

export default NewPostComponent;
