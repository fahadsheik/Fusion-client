/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";

export default function ProfileForm() {
  const [editMode, setEditMode] = useState({
    aboutMe: false,
    details: false,
    contactDetails: false,
  });

  const [formData, setFormData] = useState({
    aboutMe: "",
    dateOfJoining: "",
    pensionFund: "PF# XXXXXXXX",
    education: "",
    interestAreas: "",
    contact: "+91 -",
    email: "atul@iiitdmj.ac.in",
    linkedIn: "",
    github: "",
  });

  const handleEditToggle = (section) => {
    setEditMode((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Call your save API here if needed
    console.log(formData);
    // Close all edit boxes
    setEditMode({
      aboutMe: false,
      details: false,
      contactDetails: false,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-[4910px] border-l-8 border-customSaveButtonColor">
      {/* About Me Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">About Me</h2>
          {!editMode.aboutMe ? (
            <button
              onClick={() => handleEditToggle("aboutMe")}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              Save
            </button>
          )}
        </div>
        {editMode.aboutMe ? (
          <textarea
            name="aboutMe"
            value={formData.aboutMe}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
        ) : (
          <p className="mt-2 p-2 border border-gray-300 rounded-md">
            {formData.aboutMe || "No information provided"}
          </p>
        )}
      </div>

      {/* Details Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">Details</h2>
          {!editMode.details ? (
            <button
              onClick={() => handleEditToggle("details")}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              Save
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date Of Joining
            </label>
            {editMode.details ? (
              <input
                type="date"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="mt-1 p-2 border border-gray-300 rounded-md">
                {formData.dateOfJoining || "Not provided"}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pension Fund #
            </label>
            <p className="mt-1 p-2 border border-gray-300 rounded-md">
              {formData.pensionFund}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Education
            </label>
            {editMode.details ? (
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="mt-1 p-2 border border-gray-300 rounded-md">
                {formData.education || "Not provided"}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Interest Areas
            </label>
            {editMode.details ? (
              <input
                type="text"
                name="interestAreas"
                value={formData.interestAreas}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="mt-1 p-2 border border-gray-300 rounded-md">
                {formData.interestAreas || "Not provided"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Contact Details Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">Contact Details</h2>
          {!editMode.contactDetails ? (
            <button
              onClick={() => handleEditToggle("contactDetails")}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              Save
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            {editMode.contactDetails ? (
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="mt-1 p-2 border border-gray-300 rounded-md">
                {formData.contact || "Not provided"}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 p-2 border border-gray-300 rounded-md bg-gray-100">
              {formData.email}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              LinkedIn
            </label>
            {editMode.contactDetails ? (
              <input
                type="text"
                name="linkedIn"
                value={formData.linkedIn}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="mt-1 p-2 border border-gray-300 rounded-md">
                {formData.linkedIn || "Not provided"}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Github ID
            </label>
            {editMode.contactDetails ? (
              <input
                type="text"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="mt-1 p-2 border border-gray-300 rounded-md">
                {formData.github || "Not provided"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
