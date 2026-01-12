import React, { forwardRef } from "react";
import DonacionBG from "../assets/TemplateBG/DonacionBG.png";

const BrgyDonacionTemplate = forwardRef(
  ({ ownerName, businessName, orNumber, date, businessType, status }, ref) => {
    // Format date into "Month Day, Year"
    const formattedDate = date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "MM/DD/YYYY";

    return (
      <div
        ref={ref}
        className="
          certificate bg-cover
          w-[8.5in] h-[11in] 
          mx-auto p-12"
        style={{
          backgroundImage: `url(${DonacionBG})`,
          fontFamily: "Times New Roman, serif",
        }}
      >
        <div className="bl-status ml-[36.5em] font-bold flex flex-col mt-25">
          <p>[{status === "NEW" ? " x " : "__"}] NEW</p>
          <p>[{status === "RENEWAL" ? " x " : "__"}] RENEWAL</p>
        </div>

        <div className="mt-11  ml-1 text-[.825em]">
          <p>TO WHOM IT MAY CONCERN:</p>
          <p>This is to certify that the business or trade activity described below.</p>
        </div>

        <div className="text-center mt-4">
          <h2 className="text-[1.3em] font-bold mb-1">
            {businessName || "Business Name Here"}
            <p className="text-[.85em] font-light">(Business Name)</p>
          </h2>

          <h2 className="text-[1.4em] font-bold mb-1">
            DONACION, ANGAT, BULACAN
            <p className="text-[.85em] font-light">(Location of Business)</p>
          </h2>

          <h2 className="text-[1.35em] font-bold mb-1">
            {ownerName || "Owner's Name Here"}
            <p className="text-[.85em] font-light">(President/Owner)</p>
          </h2>

          <h2 className="text-[1.4em] font-bold mb-1">
            DONACION, ANGAT, BULACAN
            <p className="text-[.85em] font-light">(Address of Owner/Manager)</p>
          </h2>

          <h2 className="text-[1.35em] font-bold mb-1">
            {businessType || "Nature of Business"}
            <p className="text-[.85em] font-light">(Nature of Business)</p>
          </h2>
        </div>
        
        <div className="mt-1 text-justify text-[1em]">
          <p className="indent-[6em] ">
            proposed to be established in this Barangay 
            is being applied for a Barangay Business Clearance 
            to be used in securing a corresponding Mayor's Permit
            has been found to be in conformity with the provisions of 
            existing Barangay Ordinances, rules and regulations being enforced
            in this Barangay.
          </p>

          <p className="indent-[3em] mb-[.75em]">
            In view of the foregoing, the undersigned interposes 
            no objections for the issuance of the corresponding Mayor's Permit 
            being applied for.
          </p>

          <p className="indent-[3em] mb-[.75em]">
            This Permit shall be valid until December 31, 2026 and can be
            cancelled revoked anytime the establishment is found to have violated
             any law or ordinance within this barangay.
          </p>

          <p className="indent-[7em]">
            Issued on 
            <span className="font-bold underline"> {formattedDate} </span> 
            at  
            <span className="font-bold"> Municipality of Angat Bulacan.</span>
          </p>
        </div>

        <div className="flex flex-col mt-[5em]">
          <div>
            OR Number : <span className="font-bold">{orNumber || "_________"}</span>
          </div>
          <div>
            Date : <span className="font-bold">{formattedDate}</span>
          </div>
        </div>
        
      </div>
    );
  }
);

export default BrgyDonacionTemplate;