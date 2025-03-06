// import React, { useState, useEffect } from 'react';

const ProfileImagePicker = () => {
  // Handle image selection
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        localStorage.setItem('pageper_profile_img', base64Image);
      };
      
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input when "Upload" button is clicked
  const triggerFileInput = () => {
    const fileInput = document.getElementById('profileImageInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg">
      <input 
        type="file" 
        id="profileImageInput"
        hidden
        accept="image/*"
        className="hidden"
        onChange={handleImageSelect}
      />
      
      <button onClick={triggerFileInput}> Upload Image </button>
    </div>
  );
};

export default ProfileImagePicker;
