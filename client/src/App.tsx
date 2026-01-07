import { useState, type ChangeEvent, type FormEvent } from "react";
import "./App.css";

const App = () => {
  // 1. Change type to File | null. A file is an object, not a string.
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error uploading:", error);
    } finally {
      setFile(null);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="file">File:</label>
        <input id="file" type="file" onChange={handleFileChange} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default App;
