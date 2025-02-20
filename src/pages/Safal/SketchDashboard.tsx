import React, { useState } from "react";
import { useAuth } from "../../context/useAuth";
import axios from "axios";
import { toast } from "react-toastify";

const SketchDashboard: React.FC = () => {
  const { accessToken } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quality: "1", // Default = 
    category: "",
    specialId: "",
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const files = (e.target as HTMLInputElement).files;
    if (type === "file" && files) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description, quality, category, specialId, image } = formData;

    // Input validation
    if (
      !name ||
      !description ||
      !quality ||
      !category ||
      !specialId ||
      !image
    ) {
      toast.error("All fields are required.");
      return;
    }

    const newFormData = new FormData();
    newFormData.append("name", name);
    newFormData.append("description", description);
    newFormData.append("quality", quality);
    newFormData.append("category", category);
    newFormData.append("special_id", specialId);
    newFormData.append("image", image);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/sketches/add`,
        newFormData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Sketch uploaded successfully!");
      setFormData({
        name: "",
        description: "",
        quality: "1",
        category: "",
        specialId: "",
        image: null,
      });
      setImagePreview(null); 
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Error uploading sketch";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-semibold text-[#ba1f2a] mb-6">
        Upload a New Sketch
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-8 border-4 border-[#ba1f2a] rounded-lg max-w-4xl w-full"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {["name", "category", "specialId"].map((field) => (
            <input
              key={field}
              name={field}
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field as keyof typeof formData] as string}
              onChange={handleInputChange}
              className="input p-4 border rounded-md w-full"
            />
          ))}
          {/* Quality Dropdown */}
          <div className="w-full">
            <label
              htmlFor="quality"
              className="block mb-2 text-lg text-gray-700"
            >
              Quality (1-5)
            </label>
            <select
              name="quality"
              value={formData.quality}
              onChange={handleInputChange}
              className="input p-4 border rounded-md w-full"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>

        {/* Larger description field */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          rows={6}
          className="input p-4 border rounded-md w-full"
        />

        {/* Image upload with preview */}
        <div className="w-full">
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="input p-4 border rounded-md w-full"
          />
          {imagePreview && (
            <div className="mt-4 w-full flex justify-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-full h-72 object-contain border rounded-md"
              />
            </div>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="px-6 py-3 bg-[#ba1f2a] text-white rounded-md text-lg font-semibold hover:opacity-80 w-full"
        >
          Upload Sketch
        </button>
      </form>
    </div>
  );
};

export default SketchDashboard;
