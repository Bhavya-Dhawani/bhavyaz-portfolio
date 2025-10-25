"use client";
import React, { useState } from "react";
import styles from "@/css/components/admin/AddProjects.module.css";
import Toast from "@/ui/Toast";
import axios from "axios";
import sleep from "@/utils/sleep";

const AddProject = () => {
  // Separate state for each input
  const [title, setTitle] = useState("");
  const [shortDes, setShortDes] = useState("");
  const [description, setDescription] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // For toast 
  const [display, setDisplay] = useState(false);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("shortDes", shortDes);
    formData.append("description", description);
    formData.append("demoLink", demoLink);
    if (imageFile) formData.append("imageFile", imageFile);

    axios.post('/api/data/projects', formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(async (res) => {
        setDisplay(true);
        setType("Success");
        setMessage("Project added successfully");
        await sleep(1000);
        setDisplay(false);
        setType("");
        setMessage("");
      })
      .catch(async (err) => {
        setDisplay(true);
        setType("Error");
        setMessage(err.response.data.message);
        await sleep(1000);
        setDisplay(false);
        setType("");
        setMessage("");
      });

  };

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>Add New Project</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.group}>
            <label htmlFor="title">Project Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="shortDes">Short Description</label>
            <input
              type="text"
              id="shortDes"
              name="shortDes"
              placeholder="Enter short description"
              value={shortDes}
              onChange={(e) => setShortDes(e.target.value)}
              required
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="description">Detailed Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your project"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              required
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="demoLink">Demo Link</label>
            <input
              type="url"
              id="demoLink"
              name="demoLink"
              placeholder="https://example.com"
              value={demoLink}
              onChange={(e) => setDemoLink(e.target.value)}
              required
            />
          </div>

          {/* 🖼️ Themed Upload Box */}
          <div className={styles.group}>
            <label>Project Image</label>
            <div className={styles.uploadBoxWrapper}>
              <input
                type="file"
                id="imageFile"
                name="imageFile"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              <label htmlFor="imageFile" className={styles.uploadBox}>
                <span>{fileName || "Upload Image"}</span>
              </label>
            </div>

            {preview && (
              <div className={styles.preview}>
                <img src={preview} alt="Preview" />
              </div>
            )}
          </div>

          <button type="submit" className={styles.button}>
            <span>Add Project</span>
          </button>
        </form>
      </div>
      <Toast type={type} Message={message} display={display} />
    </section>
  );
};

export default AddProject;
