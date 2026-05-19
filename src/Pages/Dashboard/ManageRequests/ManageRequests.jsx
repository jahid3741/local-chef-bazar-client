import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();

  const [requests, setRequests] = useState([]);

  // load requests
  useEffect(() => {
    axiosSecure.get("/requests").then((res) => {
      setRequests(res.data);
    });
  }, [axiosSecure]);

  // approve request
  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/requests/${id}/approve`);

      if (res.data.requestResult.modifiedCount > 0) {
        Swal.fire({
          icon: "success",

          title: "Request approved",
        });

        const updatedRequests = requests.map((request) => {
          if (request._id === id) {
            return {
              ...request,
              requestStatus: "approved",
            };
          }

          return request;
        });

        setRequests(updatedRequests);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",

        title: error.response?.data?.message,
      });
    }
  };

  // reject request
  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/requests/${id}/reject`);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",

          title: "Request rejected",
        });

        const updatedRequests = requests.map((request) => {
          if (request._id === id) {
            return {
              ...request,
              requestStatus: "rejected",
            };
          }

          return request;
        });

        setRequests(updatedRequests);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Manage Requests</h2>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>

              <th>Name</th>

              <th>Email</th>

              <th>Request Type</th>

              <th>Status</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request, index) => (
              <tr key={request._id}>
                <td>{index + 1}</td>

                <td>{request.userName}</td>

                <td>{request.userEmail}</td>

                <td className="capitalize">{request.requestType}</td>

                <td className="capitalize">{request.requestStatus}</td>

                <td className="space-x-2">
                  {request.requestStatus === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(request._id)}
                        className="btn btn-xs btn-primary"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(request._id)}
                        className="btn btn-xs btn-error"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRequests;
