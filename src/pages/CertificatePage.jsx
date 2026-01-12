import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import DefaultTemplate from "../templates/DefaultTemplate";
import BrgyDonacionTemplate from "../templates/BrgyDonacionTemplate";
import BrgyNiuganTemplate from "../templates/BrgyNiuganTemplate";
import PrintModal from "../components/PrintModal";

// Define which fields each template requires
const templateFields = {
  DefaultTemplate: ["ownerName", "businessName", "orNumber", "ctcNumber", "date", "businessType"],
  BrgyDonacionTemplate: ["ownerName", "businessName", "orNumber", "date", "businessType"],
  BrgyNiuganTemplate: ["ownerName", "businessName", "orNumber", "date", "businessType"],
};

// Map field names to input components
const fieldComponents = {
  ownerName: (value, setValue) => (
    <input
      className="border p-2 rounded"
      placeholder="Owner's Name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  ),
  businessName: (value, setValue) => (
    <input
      className="border p-2 rounded"
      placeholder="Business Name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  ),
  orNumber: (value, setValue) => (
    <input
      className="border p-2 rounded"
      placeholder="OR Number"
      type="number"
      min="0"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  ),
  ctcNumber: (value, setValue) => (
    <input
      className="border p-2 rounded"
      placeholder="CTC Number"
      type="number"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  ),
  date: (value, setValue) => (
    <input
      type="date"
      className="border p-2 rounded"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  ),
  businessType: (value, setValue) => (
    <input
      className="border p-2 rounded"
      placeholder="Type of Business"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  ),
};

const getToday = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

export default function CertificatePage() {
  // State for all possible fields
  const [status, setStatus] = useState(""); // NEW or RENEWAL
  const [ownerName, setOwnerName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [orNumber, setOrNumber] = useState("");
  const [ctcNumber, setCtcNumber] = useState("");
  const [date, setDate] = useState(getToday());
  const [businessType, setBusinessType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("DefaultTemplate");

  const certificateRef = useRef();

  // Render the correct certificate preview WITH ref
  const renderSelectedTemplateWithRef = () => {
    switch (selectedTemplate) {
      case "BrgyDonacionTemplate":
        return (
          <BrgyDonacionTemplate
            ownerName={ownerName}
            businessName={businessName}
            orNumber={orNumber}
            date={date}
            businessType={businessType}
            status={status}
            ref={certificateRef}
          />
        );
      case "BrgyNiuganTemplate":
        return (
          <BrgyNiuganTemplate
            ownerName={ownerName}
            businessName={businessName}
            orNumber={orNumber}
            date={date}
            businessType={businessType}
            ref={certificateRef}
          />
        );
      default:
        return (
          <DefaultTemplate
            ownerName={ownerName}
            businessName={businessName}
            orNumber={orNumber}
            ctcNumber={ctcNumber}
            date={date}
            businessType={businessType}
            ref={certificateRef}
          />
        );
    }
  };

  // Render certificate preview WITHOUT ref (for modal)
  const renderSelectedTemplateCopy = () => {
    switch (selectedTemplate) {
      case "BrgyDonacionTemplate":
        return (
          <BrgyDonacionTemplate
            ownerName={ownerName}
            businessName={businessName}
            orNumber={orNumber}
            date={date}
            status={status}
            businessType={businessType}
          />
        );
      case "BrgyNiuganTemplate":
        return (
          <BrgyNiuganTemplate
            ownerName={ownerName}
            businessName={businessName}
            orNumber={orNumber}
            date={date}
            businessType={businessType}
          />
        );
      default:
        return (
          <DefaultTemplate
            ownerName={ownerName}
            businessName={businessName}
            orNumber={orNumber}
            ctcNumber={ctcNumber}
            date={date}
            businessType={businessType}
          />
        );
    }
  };

  // Print handler
  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
  });

  // Download PDF handler
  const handleDownloadPDF = async () => {
    const element = certificateRef.current;
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("certificate.pdf");
  };

  // Helper to map field name to state + setter
  const getFieldState = (field) => {
    switch (field) {
      case "ownerName": return [ownerName, setOwnerName];
      case "businessName": return [businessName, setBusinessName];
      case "orNumber": return [orNumber, setOrNumber];
      case "ctcNumber": return [ctcNumber, setCtcNumber];
      case "date": return [date, setDate];
      case "businessType": return [businessType, setBusinessType];
      default: return ["", () => {}];
    }
  };

  return (
    <div className="p-6 grid grid-cols-[25%_75%] ">
      <div>
        <h2 className="text-2xl font-bold mb-4">Fill Certificate Details</h2>

        {/* Dropdown */}
        <div>
          <h3 className="">Choose Barangay</h3>
          <select
            className="border p-2 rounded w-full mb-4"
            value={selectedTemplate}
            onChange={(event) => setSelectedTemplate(event.target.value)}
          >
            <option value="DefaultTemplate">Default</option>
            <option value="BrgyDonacionTemplate">Donacion</option>
            <option value="BrgyNiuganTemplate">Niugan</option>
          </select>
        </div>

        {/* Dynamic Input Fields */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {templateFields[selectedTemplate].map((field) => {
            const [value, setter] = getFieldState(field);
            return (
              <React.Fragment key={field}>
                {fieldComponents[field](value, setter)}
              </React.Fragment>
            );
          })}
        </div>

        <div className="mb-6">
          <h3 className="font-semibold">Choose Status</h3>
          <label className="mr-4">
            <input
              type="radio"
              name="status"
              value="NEW"
              checked={status === "NEW"}
              onChange={(e) => setStatus(e.target.value)}
            />
            New
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="RENEWAL"
              checked={status === "RENEWAL"}
              onChange={(e) => setStatus(e.target.value)}
            />
            Renewal
          </label>
        </div>

        {/* Print Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Print / Download Certificate
        </button>
      </div>

      {/* Certificate Preview WITH ref */}
      <div className="mb-6">{renderSelectedTemplateWithRef()}</div>

      {/* Confirmation Modal */}
      <PrintModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          handlePrint();
          setIsModalOpen(false);
        }}
        onDownload={handleDownloadPDF}
      >
        {renderSelectedTemplateCopy()}
      </PrintModal>
    </div>
  );
}