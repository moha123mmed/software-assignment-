import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ItemAdd = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('image', image);
    axios.post('/api/items', formData)
      .then(response => {
        console.log('Item added successfully:', response.data);
		navigate('/items/');
      })
      .catch(error => {
        console.error('Item adding failed:', error);
      });
  };
  return (
    <div >
      <h1>Add Item</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={handleNameChange} required /><br />
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={description} onChange={handleDescriptionChange} required></textarea><br />
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" name="price" value={price} onChange={handlePriceChange} required /><br />
        <label htmlFor="quantity">Quantity:</label>
        <input type="number" id="quantity" name="quantity" value={quantity} onChange={handleQuantityChange} required /><br />
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" name="image" onChange={handleImageChange} required /><br />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};
export default ItemAdd;