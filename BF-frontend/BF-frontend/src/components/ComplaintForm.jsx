import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { toast } from 'react-toastify';
import axios from '../services/axiosInstance';
import './ComplaintForm.css';

const center = { lat: 20.5937, lng: 78.9629 }; // Default center (India)
const departmentOptions = [
  { id: 1, name: "Water Department" },
  { id: 2, name: "Electricity" },
  { id: 3, name: "Garbage" },
  { id: 4, name: "Road Repair" }
];

const ComplaintForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState("Water Department");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      setImage(null);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (JPEG, PNG, etc.)');
      return;
    }

    // Validate file size (2MB example)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be smaller than 2MB');
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (event) => {
      setImage(event.target.result); // base64 string
    };

    reader.onerror = () => {
      toast.error('Failed to read image file');
      setImage(null);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!location) {
      toast.warn('Please select a location on the map.');
      setIsSubmitting(false);
      return;
    }

    const selectedDept = departmentOptions.find(dept => dept.name === department);
    if (!selectedDept) {
      toast.error('Please select a valid department');
      setIsSubmitting(false);
      return;
    }

    const complaintData = {
      title,
      description,
      departmentId: selectedDept.id,
      photoUrl: image, // base64 string or null
      latitude: location.lat,
      longitude: location.lng
    };

    try {
      await axios.post('/api/complaints/send', complaintData, {
        headers: { 'Content-Type': 'application/json' },
      });

      toast.success('Complaint submitted successfully!');
      // Reset form
      setTitle('');
      setDescription('');
      setDepartment("Water Department");
      setImage(null);
      setLocation(null);
      document.getElementById('file-input').value = '';
    } catch (error) {
      console.error('Error submitting complaint:', error);
      toast.error(error.response?.data?.message || 'Failed to submit complaint. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLiveLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationError('');
        toast.info('Location captured!');
      },
      () => {
        setLocationError('Unable to retrieve your location. Please enable location services.');
      }
    );
  };

  const handleMapClick = (e) => {
    setLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    toast.info('Location selected on map.');
  };

  return (
    <div className="complaint-container">
      <h2 className="complaint-title">Register a Complaint</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Complaint Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />

        <label className="form-label">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          required
          className="form-input"
        />

        <label className="form-label">Department:</label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
          className="form-input"
        >
          <option value="">-- Select Department --</option>
          {departmentOptions.map((dept) => (
            <option key={dept.id} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>

        <label className="form-label">Upload Image (Optional):</label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input"
        />

        <button type="button" onClick={getLiveLocation} className="live-btn">
          Use My Live Location
        </button>

        {locationError && <p className="location-error">⚠️ {locationError}</p>}

        <p className="text-center text-gray-600 my-2">Or click on the map to select a location</p>

        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerClassName="map-container"
            center={location || center}
            zoom={location ? 15 : 5}
            onClick={handleMapClick}
          >
            {location && <Marker position={location} />}
          </GoogleMap>
        </LoadScript>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;