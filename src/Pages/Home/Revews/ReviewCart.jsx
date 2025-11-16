import React from "react";
import { BsQuote } from "react-icons/bs";

const ReviewCart = ({ card }) => {
  // ডেটা destructure করা হলো
  const { review, userName, user_photoURL, ratings } = card;

  return (
    <div className="max-w-sm bg-white shadow-md rounded-xl p-6 border">
      {/* Quote Icon */}
      <div className="text-gray-400 text-4xl mb-3">
        <BsQuote />
      </div>

      {/* Review Text */}
      <p className="text-gray-600 text-sm leading-relaxed mb-5">{review}</p>

      {/* Divider */}
      <div className="border-b mb-4"></div>

      {/* User Section */}
      <div className="flex items-center gap-3">
        {/* User Image */}
        <div>
          <img
            src={user_photoURL}
            alt={userName}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>

        {/* User Name & Rating */}
        <div>
          <h3 className="font-semibold">{userName}</h3>
          <p className="text-gray-500 text-sm">⭐ {ratings}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCart;
