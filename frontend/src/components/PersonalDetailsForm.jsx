import React from "react";

const PersonalDetailsForm = () => {
  return (
    <>
      <form action="" className="flex flex-col p-4">
        <div className="flex justify-between mb-5">
          <h1>Personal Details</h1>

          <button className="ml-auto text-red-600 font-bold cursor-pointer">
            DELETE
          </button>
        </div>
        <label htmlFor="name">Name: </label>
        <input
          className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
          type="text"
          name="name"
          id="name"
        />

        <label htmlFor="value">Value</label>
        <input
          className="bg-gray-100 max-w-sm mb-5 outline-0 p-2"
          type="text"
          name="value"
          id="value"
        />
        <button
          type="submit"
          className="bg-blue-400 mr-auto px-10 py-4 font-bold text-white cursor-pointer"
        >
          SAVE
        </button>
      </form>
    </>
  );
};

export default PersonalDetailsForm;
