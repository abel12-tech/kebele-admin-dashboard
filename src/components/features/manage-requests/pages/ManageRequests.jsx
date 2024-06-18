import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDarkMode } from "../../../../shared/darkModeContext";
import {
  useDeleteRequestMutation,
  useGetAllRequestsQuery,
} from "../api/requestsApi";

const ManageRequests = () => {
  const { isDarkMode, initializeDarkMode } = useDarkMode();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: requests,
    isLoading,
    isSuccess,
    error,
  } = useGetAllRequestsQuery();

  const [deleteRequest] = useDeleteRequestMutation();
  const navigate = useNavigate();

  const itemsPerPage = 5;

  const onDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await deleteRequest(id).unwrap();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  useEffect(() => {
    initializeDarkMode();
  }, [initializeDarkMode]);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil((requests?.length || 0) / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, requests?.length || 0);

  return (
    <div
      className={`h-full overflow-y-auto ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="flex flex-col flex-1 w-full">
        <div className="w-full container h-screen p-6 overflow-y-auto rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr
                  className={`text-xs font-semibold tracking-wide text-left ${
                    isDarkMode
                      ? "border-gray-700 text-gray-400 bg-gray-800"
                      : "text-gray-500 bg-gray-50"
                  } text-gray-500 uppercase border-b`}
                >
                  <th className="px-4 py-3">Resident</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y  ${
                  isDarkMode ? "divide-gray-700 bg-gray-800" : "bg-white"
                }`}
              >
                {isLoading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-3 text-center text-gray-500"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : isSuccess ? (
                  requests.slice(startIndex, endIndex).map((request) => (
                    <tr
                      key={request._id}
                      className={`${
                        isDarkMode ? "text-gray-400" : "text-gray-700"
                      }`}
                      onClick={() => navigate(`/requests/${request._id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <td className="px-4 py-3 text-sm">
                        {request.resident?.firstName}
                      </td>
                      <td className="px-4 py-3 text-sm">{request.status}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center space-x-4 text-sm">
                          <Link
                            to={`/requests/${request._id}`}
                            className="flex items-center bg-green-400 text-white justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg"
                            aria-label="Change Status"
                          >
                            See Details
                          </Link>
                          <button
                            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                            aria-label="Delete"
                            onClick={(e) => onDelete(request._id, e)}
                          >
                            <svg
                              className="w-5 h-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-3 text-center text-red-500"
                    >
                      Error fetching data. Please try again later.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div
            className={`grid px-4 py-3 text-xs font-semibold tracking-wide ${
              isDarkMode
                ? "border-gray-700 text-gray-400 bg-gray-800"
                : "text-gray-500 bg-gray-50"
            }  uppercase border-t  sm:grid-cols-9`}
          >
            <span className="flex items-center col-span-3">
              Showing {startIndex + 1}-{endIndex} of {requests?.length}
            </span>
            <span className="col-span-2" />
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
              <nav aria-label="Table navigation">
                <ul className="inline-flex items-center">
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Previous"
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 01-1.414 1.414l-4-4a1 1 010-1.414l4-4a1 1 011.414 0z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <li key={page}>
                        <button
                          className={`px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple ${
                            currentPage === page
                              ? "text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple"
                              : ""
                          }`}
                          onClick={() => goToPage(page)}
                        >
                          {page}
                        </button>
                      </li>
                    )
                  )}
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Next"
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                    >
                      <svg
                        className="w-4 h-4 fill-current"
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 011.414-1.414l4 4a1 1 010 1.414l-4 4a1 1 01-1.414 0z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRequests;
