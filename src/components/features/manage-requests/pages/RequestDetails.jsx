import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetRequestByIdQuery,
  useUpdateStatusMutation,
} from "../api/requestsApi";
import { useDarkMode } from "../../../../shared/darkModeContext";

const RequestDetails = () => {
  const { isDarkMode, initializeDarkMode } = useDarkMode();
  useEffect(() => {
    initializeDarkMode();
  }, [initializeDarkMode]);

  const { id } = useParams();
  const {
    data: request,
    isLoading,
    isSuccess,
    error,
  } = useGetRequestByIdQuery(id);
  console.log(request);
  const [updateRequestStatus] = useUpdateStatusMutation();

  const onChangeStatus = async () => {
    try {
      await updateRequestStatus({ id, status: "New Status" }).unwrap();
      alert("Status updated successfully");
    } catch (error) {
      console.error("Error changing status:", error);
      alert("Error changing status");
    }
  };

  return (
    <div
      className={`h-full p-6 text-center justify-center items-center overflow-y-auto ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {isLoading && <div>Loading...</div>}

      {error && <div>Error loading request details.</div>}

      {isSuccess && request && (
        <div
          className={`flex flex-col items-center justify-center ${
            isDarkMode ? "border-gray-700 text-gray-400" : "text-gray-500 "
          }`}
        >
          <h1 className="text-2xl font-bold mb-4">Request Details</h1>
          <div className="mt-4">
            <p>
              <strong>Resident:</strong> {request._id.resident}
            </p>
            <p>
              <strong>Status:</strong> {request._id.status}
            </p>
          </div>
          {request._id.document && request._id.document.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Documents</h2>
              <div className="flex flex-wrap justify-center">
                {request._id.document.map((doc, index) => (
                  <img
                    key={index}
                    src={doc}
                    alt={`Document ${index + 1}`}
                    className="w-32 h-32 object-cover m-2 rounded"
                  />
                ))}
              </div>
            </div>
          )}
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={onChangeStatus}
          >
            Change Status
          </button>
        </div>
      )}
    </div>
  );
};

export default RequestDetails;
