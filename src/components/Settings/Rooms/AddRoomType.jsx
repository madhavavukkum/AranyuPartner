import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaTimes, FaUpload } from 'react-icons/fa';
import { useRoom } from './RoomContext';
import './AddRoomType.css';

const AddRoomType = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addRoomType, addRoom } = useRoom();
  
  const isAddingRoom = searchParams.get('type') || searchParams.get('floor');
  const existingTypeId = searchParams.get('type');
  const targetFloor = searchParams.get('floor');

  const [formData, setFormData] = useState({
    name: '',
    occupancy: 1,
    description: '',
    amenities: [],
    rules: [''],
    images: [],
    // Room specific fields
    roomNumber: '',
    floor: targetFloor || 1
  });

  const [newAmenity, setNewAmenity] = useState('');
  const [newRule, setNewRule] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()]
      }));
      setNewAmenity('');
    }
  };

  const handleRemoveAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter(a => a !== amenity)
    }));
  };

  const handleAddRule = () => {
    if (newRule.trim()) {
      setFormData(prev => ({
        ...prev,
        rules: [...prev.rules.filter(r => r.trim()), newRule.trim()]
      }));
      setNewRule('');
    }
  };

  const handleRemoveRule = (index) => {
    setFormData(prev => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index)
    }));
  };

  const handleRuleChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      rules: prev.rules.map((rule, i) => i === index ? value : rule)
    }));
  };

  const handleImageAdd = (e) => {
    const url = e.target.value;
    if (url && !formData.images.includes(url)) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, url]
      }));
      e.target.value = '';
    }
  };

  const handleRemoveImage = (image) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== image)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isAddingRoom && existingTypeId) {
      // Adding a room to existing type
      const roomData = {
        number: formData.roomNumber,
        floor: parseInt(formData.floor),
        typeId: existingTypeId
      };
      addRoom(roomData);
      navigate('/my-rooms');
    } else {
      // Adding new room type
      const roomTypeData = {
        name: formData.name,
        occupancy: parseInt(formData.occupancy),
        description: formData.description,
        amenities: formData.amenities,
        rules: formData.rules.filter(rule => rule.trim()),
        images: formData.images.length > 0 ? formData.images : ['https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg']
      };
      
      const newTypeId = addRoomType(roomTypeData);
      
      // If room number is provided, also add a room
      if (formData.roomNumber) {
        const roomData = {
          number: formData.roomNumber,
          floor: parseInt(formData.floor),
          typeId: newTypeId
        };
        addRoom(roomData);
      }
    }
  }















  const commonAmenities = ['AC', 'TV', 'WiFi', 'Balcony', 'Mini Bar', 'Room Service', 'Jacuzzi', 'Work Desk'];
};

export default AddRoomType;