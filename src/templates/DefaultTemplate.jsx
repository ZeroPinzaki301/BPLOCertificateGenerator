import React, { forwardRef } from "react";

const DefaultTemplate = forwardRef(
  ({ ownerName, businessName, orNumber, ctcNumber, date, businessType }, ref) => {
    return (
      <div
        ref={ref}
        className="certificate border-4 border-black w-[8.5in] h-[11in] mx-auto p-12 bg-white"
      >
        <h1 className="text-3xl font-bold text-center mb-8">
          Barangay Business Certificate
        </h1>

        <p className="mb-4">This certifies that:</p>
        <h2 className="text-2xl font-bold mb-4">
          {ownerName || "Owner's Name Here"}
        </h2>

        <p className="mb-4">
          is the registered owner of{" "}
          <span className="font-semibold">
            {businessName || "Business Name Here"}
          </span>.
        </p>

        <p className="mb-2">OR Number: {orNumber || "_________"}</p>
        <p className="mb-2">CTC Number: {ctcNumber || "_________"}</p>
        <p className="mb-2">Type of Business: {businessType || "_________"}</p>
        <p className="mb-2">Date Issued: {date || "MM/DD/YYYY"}</p>

        <div className="mt-12 text-right">
          <p>__________________________</p>
          <p>Barangay Captain</p>
        </div>
      </div>
    );
  }
);

export default DefaultTemplate;