import React from "react";
import { Link } from "react-router-dom";
import { FaTimesCircle, FaRedoAlt } from "react-icons/fa";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-white shadow-xl rounded-lg p-8 text-center border-t-4 border-red-500">
        <FaTimesCircle className="text-red-500 text-5xl mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Payment Canceled
        </h2>

        <p className="text-gray-600 mb-6 text-base">
          Payment failed. Please try again or contact support.
        </p>

        <Link to={"/dashboard/my-parcels"}>
          <button
            className="w-full py-2 bg-red-500 text-white font-medium rounded-md 
                       hover:bg-red-600 transition duration-200 flex items-center justify-center"
          >
            <FaRedoAlt className="mr-2" />
            Try Again
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancel;

// import React from "react";
// import { Link } from "react-router";

// const PaymentCancel = () => {
//   return (
//     <div>
//       <h2>Payment Canceled. Please Try Again</h2>
//       <Link to={"/dashboard/my-parcels"}>
//         {" "}
//         <button className="btn btn-primary text-black">Try Again</button>
//       </Link>
//     </div>
//   );
// };

// export default PaymentCancel;
