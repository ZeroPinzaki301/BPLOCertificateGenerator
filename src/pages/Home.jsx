import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Barangay Certificate Generator</h1>
      <Link
        to="/certificate"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Try Default Template
      </Link>
    </div>
  );
}