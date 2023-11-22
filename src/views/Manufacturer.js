import React, { useState } from "react";
import axios from "axios";
import { webAPIHost } from "../lib/services/api";

const Manufacturer = () => {
  const [manufacturerData, setManufacturerData] = useState({
    name: "",
    keywords: [],
    description: "",
    location: "",
    rating: null,
    userId: null,
    website: "",
    contactInfo: [],
    lat: null,
    lng: null,
    brand: "",
    photos: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "lat" || name === "lng") {
      const numberValue = parseFloat(value);
      if (!isNaN(numberValue)) {
        setManufacturerData({
          ...manufacturerData,
          [name]: numberValue,
        });
      } else {
        setManufacturerData({
          ...manufacturerData,
          [name]: null,
        });
      }
    } else if (name === "contactInfo") {
      const contactInfoArray = value.split(",").map((item) => item.trim());
      setManufacturerData({
        ...manufacturerData,
        [name]: contactInfoArray,
      });
    } else if (name === "photos") {
      const photosArray = value.split(",").map((photo) => photo.trim());
      setManufacturerData({
        ...manufacturerData,
        [name]: photosArray,
      });
    } else {
      setManufacturerData({
        ...manufacturerData,
        [name]: value,
      });
    }
  };

  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${webAPIHost}/public/addManufacturer`,
        manufacturerData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Manufacturer data submitted successfully!");
        // setManufacturerData({
        //   name: "",
        //   keywords: [],
        //   description: "",
        //   location: "",
        //   rating: null,
        //   userId: null,
        //   website: "",
        //   contactInfo: [],
        //   lat: null,
        //   lng: null,
        //   brand: "",
        //   photos: [],
        // });
      } else {
        console.error("Failed to submit manufacturer data.");
      }
    } catch (error) {
      console.error("Error submitting manufacturer data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ paddingLeft: "50px" }}>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={manufacturerData.name}
            onChange={handleChange}
            className="form-control search-input"
          />
        </label>
      </div>
      <div>
        <label>
          Keywords:
          <input
            type="text"
            name="keywords"
            value={manufacturerData.keywords}
            onChange={handleChange}
            className="form-control search-input"
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={manufacturerData.description}
            onChange={handleChange}
            className="form-control search-input"
          />
        </label>
      </div>{" "}
      <div>
        <label>
          brand:
          <input
            type="text"
            name="brand"
            value={manufacturerData.brand}
            onChange={handleChange}
            className="form-control search-input"
          />
        </label>
      </div>
      {/* Add input fields for the remaining properties */}
      {/* Example: */}
      {/* Location */}
      <div>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={manufacturerData.location}
            onChange={handleChange}
            className="form-control search-input"
          />
        </label>
      </div>
      {/* Rating */}
      <div>
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            value={manufacturerData.rating || ""}
            onChange={handleChange}
            className="form-control search-input"
          />
        </label>
      </div>{" "}
      {/* website */}
      <div>
        <label>
          website:
          <input
            type="text"
            name="website"
            value={manufacturerData.website || ""}
            onChange={handleChange}
            className="form-control search-input"
          />
        </label>
      </div>
      <div>
        <label>
          lat:
          <input
            type="text"
            name="lat"
            value={manufacturerData.lat || ""}
            onChange={handleChange}
            className="form-control search-input"
          />
        </label>
      </div>
      <div>
        <label>
          lng:
          <input
            type="text"
            name="lng"
            value={manufacturerData.lng || ""}
            onChange={handleChange}
            className="form-control search-input"
          />
        </label>
      </div>
      {/* User ID */}
      <div>
        <label>
          User ID:
          <input
            type="text"
            name="userId"
            value={manufacturerData.userId || ""}
            onChange={handleChange}
            className="form-control search-input"
          />
        </label>
      </div>
      {/* photos */}
      <div>
        <label>
          Photos (comma-separated URLs):
          <input
            type="text"
            name="photos"
            value={manufacturerData.photos}
            onChange={handleChange}
            className="form-control search-input"
          />
        </label>
      </div>
      {/*  */}
      <div>
        <label>
          Contact Info (comma-separated):
          <input
            type="text"
            name="contactInfo"
            value={manufacturerData.contactInfo}
            onChange={handleChange}
            className="form-control search-input"
          />
        </label>
      </div>
      <button type="submit" className="btn btn-primary action-button">Submit</button>
    </form>
  );
};

export default Manufacturer;
