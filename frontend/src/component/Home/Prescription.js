import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPrescription,
  getAllPrescriptions,
} from "../../actions/prescriptionAction";

const CreatePrescription = () => {
  const [contact, setContact] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPrescriptions());
  }, [dispatch]);

  const { prescriptions, loading, error, success } = useSelector(
    (state) => state.prescription
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("contact", contact);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(createPrescription(formData));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <h2>Upload Prescription</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Contact</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div>
          <label>Images</label>
          <input
            type="file"
            name="prescription"
            accept="image/*"
            onChange={createProductImagesChange}
            multiple
          />
        </div>
        <div id="createProductFormImage">
          {imagesPreview.map((image, index) => (
            <img key={index} src={image} alt="Prescription Preview" />
          ))}
        </div>
        <button type="submit">Create</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {success && <p>Prescription created successfully!</p>}

      {/* see all uploaded prescriptions */}
      <div>
        {prescriptions.length === 0 ? (
          <div>No prescriptions found</div>
        ) : (
          prescriptions.map((prescription) => (
            <div key={prescription._id}>
              <h3>{prescription.contact}</h3>
              <div>
                {prescription.images.map((image, i) => (
                  <img key={i} src={image.url} alt="Prescription Image" />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CreatePrescription;
