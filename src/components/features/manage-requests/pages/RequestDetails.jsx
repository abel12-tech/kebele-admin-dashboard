import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetRequestByIdQuery,
  useUpdateStatusMutation,
} from "../api/requestsApi";
import { useDarkMode } from "../../../../shared/darkModeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const date = request?._id.reservationDate;
  const [updateRequestStatus] = useUpdateStatusMutation();

  const onChangeStatus = async (newStatus) => {
    try {
      await updateRequestStatus({
        id,
        status: newStatus,
        reservationDate: date,
        statusUpdated: "yes",
      }).unwrap();

      toast.success("Status updated successfully", {
        position: "top-right",
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(error, {
        position: "top-right",
      });
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
            <ToastContainer position="top-right" duration={2000} />
            <p className="mb-2">
              <strong>Resident:</strong> {request._id.resident}
            </p>
            <p className="mb-2">
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
          <h1 className="text-2xl font-bold mb-4 mt-4">Change Status</h1>
          <div className="mt-4 flex space-x-2">
            {/* <h2>Change Status</h2> */}
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => onChangeStatus("Up Coming")}
            >
              Up Coming
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => onChangeStatus("Active")}
            >
              Active
            </button>
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded"
              onClick={() => onChangeStatus("Completed")}
            >
              Completed
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => onChangeStatus("Rejected")}
            >
              Rejected
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestDetails;
