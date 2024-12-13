import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    dob: '',
    profileImage: '',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  // Fetch profile data on page load
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('https://intelli-loan-backend.vercel.app/routes/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setProfileData({
            name: data.username,
            phone: data.phone || '',
            dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : '',
            profileImage: data.profileImage || '',
          });
          // Set image preview directly from data returned
          setImagePreview(data.profileImage ? data.profileImage : null);
        } else {
          alert('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        alert('Error fetching profile data');
      }
    };

    fetchProfileData();
  }, []);

  // Handle the profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({ ...profileData, profileImage: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', profileData.name);
    formData.append('phone', profileData.phone);
    formData.append('dob', profileData.dob);
    if (profileData.profileImage) {
      formData.append('profileImage', profileData.profileImage);
    }

    // Update profile data
    try {
      const response = await fetch('https://intelli-loan-backend.vercel.app/routes/auth/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert('Profile updated successfully!');
        // Refresh profile data
        setProfileData({
          name: data.username,
          phone: data.phone || '',
          dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : '',
          profileImage: data.profileImage || '',
        });
        setImagePreview(data.profileImage ? data.profileImage : null);
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('You are logged out');
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-20">
      <Navbar profileImage={imagePreview || profileData.profileImage} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">Profile</h1>

        {/* Profile Image with "+" icon and file input */}
        <div className="flex justify-center mb-6 relative">
          <div className="relative">
            <img
              src={imagePreview || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-indigo-600 object-cover"
            />
            <label className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-xl font-bold">+</span>
              <input
                type="file"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-800">User Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              className="mt-1 w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-800">Phone Number</label>
            <input
              type="text"
              id="phone"
              placeholder="Enter your phone number"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              className="mt-1 w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
            />
          </div>

          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-800">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={profileData.dob}
              onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })}
              className="mt-1 w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out text-lg font-semibold"
          >
            Save Changes
          </button>
        </form>

        <button
          onClick={handleLogout}
          className="mt-6 w-full text-center text-red-500 font-medium hover:underline text-lg"
        >
          Logout
        </button>
      </div>

      {/* Footer */}
      <footer className="w-full bg-indigo-600 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto text-center px-4">
          <p className="text-lg">&copy; 2024 Intelliloan. All rights reserved.</p>
          <p className="mt-2">Created by Devang Chaudhari, Shruti Mamidwar and Sanika Mali.</p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6">
            <a href="/home" className="text-white hover:underline">Home</a>
            <a href="/news" className="text-white hover:underline">News</a>
            <a href="/chart" className="text-white hover:underline">Chart</a>
            <a href="/profile" className="text-white hover:underline">Profile</a>
            <a href="/about" className="text-white hover:underline">About Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;
