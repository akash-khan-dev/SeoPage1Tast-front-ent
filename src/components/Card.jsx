/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BsStack } from "react-icons/bs";
import { FaClipboardList, FaPaperclip } from "react-icons/fa";
import { IoChatbubblesOutline, IoCalendar } from "react-icons/io5";
import Profile from "./Profile";
import pic from "../assets/images/playBussBoost.jpg";
import axios from "axios";
import Modal from "./Modal";
const Card = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState();
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [countAttachment, setCountAttachment] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        let { data } = await axios.get("http://localhost:3000/api/upload");
        setCountAttachment(data.length);
      } catch (e) {
        console.log(e.message);
      }
    };
    getData();
  }, [previewSource]);

  // input file getting
  const handleFileInputChange = async (e) => {
    const files = e.target.files;
    if (files.length === 1) {
      previewFile(files[0]);
      return;
    }

    const convertArray = Array.from(files);
    let multiple = [];
    for (let i = 0; i < convertArray.length; i++) {
      setPreviewSource(convertArray[i]);
      multiple.push(convertArray[i]);
    }
    setMultipleFiles(multiple);
  };
  // for data source
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!previewSource) return;
    try {
      if (multipleFiles.length > 0) {
        for (let i = 0; i < multipleFiles.length; i++) {
          const element = multipleFiles[i];
          const reader = new FileReader();
          reader.readAsDataURL(element);
          reader.onload = async () => {
            await axios.post("http://localhost:3000/api/upload", {
              data: reader.result,
            });
          };
        }
        setMultipleFiles([]);
        setIsModalOpen(false);
      } else {
        uploadImage(previewSource);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  // for single file upload
  const uploadImage = async (base64EncodedImage) => {
    try {
      await axios.post("http://localhost:3000/api/upload", {
        data: base64EncodedImage,
      });
      setPreviewSource("");

      setIsModalOpen(false);
    } catch (e) {
      console.log(e.message);
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="card_margin">
      <div className="card">
        <div className="profile_container">
          <Profile pic={pic} profileTitle={"Client Name"} />
          <Profile pic={pic} profileTitle={"Client 2"} />
        </div>
        <div className="notes">
          <div className="notes_description">
            <BsStack />
            <p>Lconsectetur adiptatenim nobis...</p>
          </div>
          <div className="note_count">
            <FaClipboardList />
            <span>1/2</span>
          </div>
        </div>
        <div className="card_bottom">
          <div className="total_client">
            <div className="clients">
              <Profile pic={pic} />
              <Profile pic={pic} />
              <div className="client_count">
                <span>12+</span>
              </div>
            </div>
            <div className="client_message">
              <IoChatbubblesOutline />
              <span>12+</span>
            </div>
            <div className="client_attachment">
              <div onClick={openModal} className="attachment-icon ">
                <FaPaperclip />
              </div>
              <span>{countAttachment}</span>
            </div>
            <div className="date">
              <IoCalendar />
              <input type="date" />
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="modal-container">
          <div className="modal-header">
            <h1>Upload File</h1>
          </div>
          <div className="upload-form">
            <form onSubmit={handleSubmit}>
              <input
                onChange={handleFileInputChange}
                type="file"
                name=""
                id=""
                multiple
                accept=".doc,.pdf,.txt,.rtl,.png,.jpg,.jpeg,"
                value={fileInputState}
              />

              <button className="upload-button" type="submit">
                Submit
              </button>
            </form>
            {previewSource && (
              <div className="preview-file">
                <img src={previewSource} alt="" />
              </div>
            )}
            <div className="multiple-preview-container">
              {multipleFiles.map((file, index) => (
                <div className=" show-multiple" key={index}>
                  {console.log("file", URL.createObjectURL(file))}
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                  />
                  <p>{file.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Card;
