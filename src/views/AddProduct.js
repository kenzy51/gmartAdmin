import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure to have axios installed for HTTP requests
import { webAPIHost } from "../lib/services/api";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    photos: [],
    manufacturerId: "",
  });
  const [manufacturers, setManufacturers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(manufacturers);
  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const response = await axios.get(
          `${webAPIHost}/public/getManufacturers`
        );
        setManufacturers(response.data.manufacturers);
      } catch (error) {
        console.error("Error fetching manufacturers:", error);
      }
    };

    fetchManufacturers();
  }, []);

  const handleManufacturerChange = (e) => {
    const selectedManufacturerId = e.target.value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      manufacturerId: selectedManufacturerId,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${webAPIHost}/public/addProduct`,
        product
      );
      // Handle successful creation
      console.log("Product created:", response.data);

      // Reset the form after successful creation
      // setProduct({
      //     name: '',
      //     description: '',
      //     price: 0,
      //     photos: [],
      //     manufacturerId: 0,
      // });
      console.log(product);
    } catch (error) {
      // Handle error
      console.error("Error creating product:", error);
    }
  };

  const handleChangePhotos = (e) => {
    const { value, name } = e.target;
    const photosArray = value.split(",").map((photo) => photo.trim());
    setProduct({
      ...product,
      [name]: photosArray,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div>
          <label>Manufacturer:</label>
          <select
            name="manufacturerId"
            value={product.manufacturerId}
            onChange={handleManufacturerChange}
            className="form-control"
          >
            <option value="">Select Manufacturer</option>
            {manufacturers &&
              manufacturers.map((manufacturer) => (
                <option key={manufacturer._id} value={manufacturer._id}>
                  {manufacturer.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Photos (comma-separated URLs):</label>
          <input
            type="text"
            name="photos"
            value={product.photos}
            onChange={handleChangePhotos}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary action-button">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
