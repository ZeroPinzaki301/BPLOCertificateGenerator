import React, { forwardRef } from "react";
import NiuganBG from "../assets/TemplateBG/NiuganBG.png";

function getDayWithSuffix(day) {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1: return `${day}st`;
    case 2: return `${day}nd`;
    case 3: return `${day}rd`;
    default: return `${day}th`;
  }
}

const BrgyNiuganTemplate = forwardRef(
  ({ ownerName, businessName, orNumber, date, businessType }, ref) => {
    const d = date ? new Date(date) : null;

    const dayWithSuffix = d ? getDayWithSuffix(d.getDate()) : "Day";
    const monthYear = d
      ? d.toLocaleDateString("en-US", { month: "long", year: "numeric" })
      : "Month, Year";

    const formattedDate = d
      ? d.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "MM/DD/YYYY";

    return (
      <div
        ref={ref}
        className="certificate bg-cover border-4 border-black w-[11in] h-[8.5in] mx-auto"
        style={{
          backgroundImage: `url(${NiuganBG})`,
          fontFamily: "Times New Roman, serif",
        }}
      >
        <div className="text-center mt-[19.5em]">
          <span className="font-bold underline text-[1.4em]">
            {businessName || "Business Name Here"}
          </span>.
        </div>

        <div className="mt-[2.5em] grid grid-cols-[5.25fr_.75fr_4fr]">
          <h2 className="underline text-center font-bold text-[1.3em]">
            {ownerName || "Owner's Name Here"}
          </h2>
          <div className=""></div>
          <h2 className="font-bold text-[1.4em] tracking-wide underline">
            NIUGAN, ANGAT, BULACAN
          </h2>
        </div>

        <div>
          <p className="text-center font-bold underline mt-[1.3em] text-[1.4em]">
            {businessType || "Business Type Here"}
          </p>
        </div>
        
        {/* Dynamic day + month/year section */}
        <div className="flex gap-20 font-bold text-[1.075em] ml-[21.4em] mt-[5.35em]">
          <div>{dayWithSuffix}</div>
          <div>{monthYear}</div>
        </div>

        <div className="flex flex-col ml-[24em] mt-[3.75em]">
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

export default BrgyNiuganTemplate;