// pages/index.tsx

"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  fetchUsers,
  deleteUsers,
  updateUserStatus,
  removeUsers,
  updateUserInState,
} from "@/store/userSlice"; // Import both actions here
import Navbar from "@/app/components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";
const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUserSelect = (id: number) => {
    setSelectedUserIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((userId) => userId !== id)
        : [...prevIds, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedUserIds.length === users.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(users.map((user) => user.id));
    }
  };

  const handleAction = async (action: string) => {
    try {
      if (action === "delete") {
        await dispatch(deleteUsers(selectedUserIds)).unwrap();
        dispatch(removeUsers(selectedUserIds));
        toast.success("User(s) deleted successfully");
        router.push("/routes/login");
      } else {
        const status = action === "block" ? "blocked" : "active";
        await dispatch(
          updateUserStatus({ ids: selectedUserIds, status })
        ).unwrap();
        selectedUserIds.forEach((id) => {
          const user = users.find((user) => user.id === id);
          if (user) {
            dispatch(updateUserInState({ ...user, status }));
          }
        });
        toast.success(
          `User(s) ${
            status === "blocked" ? "blocked" : "unblocked"
          } successfully`
        );
        if (status === "blocked") {
          return router.push("/routes/login");
        }
      }
      setSelectedUserIds([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to perform action. Please try again.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <h1 className="text-3xl font-bold my-6">User Management</h1>
      <div className="flex justify-end gap-2 mb-4">
        <button
          className="btn btn-error"
          onClick={() => handleAction("block")}
          disabled={!selectedUserIds.length}
        >
          Block
        </button>
        <button
          className="btn btn-info"
          onClick={() => handleAction("unblock")}
          disabled={!selectedUserIds.length}
        >
          Unblock
        </button>
        <button
          className="btn btn-warning"
          onClick={() => handleAction("delete")}
          disabled={!selectedUserIds.length}
        >
          Delete
        </button>
      </div>
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedUserIds.length === users.length}
                  className="checkbox"
                />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUserIds.includes(user.id)}
                    onChange={() => handleUserSelect(user.id)}
                    className="checkbox"
                  />
                </td>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.status === "active" ? "badge-success" : "badge-error"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
