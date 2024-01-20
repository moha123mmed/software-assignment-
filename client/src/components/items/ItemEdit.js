import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const ItemEdit = () => {
  const initialState = {
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: null,
  };
  const [item, setItem] = useState(initialState);
  const { _id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await axios.get(`/api/items/${_id}`);
        setItem(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchItem();
  }, [_id]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", item.name);
      formData.append("description", item.description);
      formData.append("price", item.price);
      formData.append("quantity", item.quantity);
      if (item.image) {
        formData.append("image", item.image);
      }
      await axios.patch(`/api/items/${item._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate('/items/');
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event) => {
    if (event.target.name === "image") {
      const file = event.target.files[0];
      setItem({ ...item, image: file });
    } else {
      setItem({ ...item, [event.target.name]: event.target.value });
    }
  };
  const handleCancel = () => {
    navigate('/items/');
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={item.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={item.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={item.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={item.quantity}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
      <button type="submit">Update Item</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};
export default ItemEdit;