import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

const UserManagement = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "user",
    fullName: "",
  });

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/users");
      setUsers(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  // Add new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/users", {
        ...newUser,
        id: Date.now(),
      });
      setUsers([...users, response.data]);
      setNewUser({ username: "", password: "", role: "user", fullName: "" });
      alert("User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
      setError("Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  // Update user
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:3001/users/${editingUser.id}`,
        editingUser
      );
      setUsers(
        users.map((user) => (user.id === editingUser.id ? response.data : user))
      );
      setEditingUser(null);
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        setLoading(true);
        await axios.delete(`http://localhost:3001/users/${userId}`);
        setUsers(users.filter((user) => user.id !== userId));
        alert("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error);
        setError("Failed to delete user");
      } finally {
        setLoading(false);
      }
    }
  };

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#111827",
      border: "none",
      borderRadius: "16px",
      padding: "0",
      maxWidth: "1200px",
      width: "95%",
      maxHeight: "90vh",
      overflow: "hidden",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(8px)",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      contentLabel="User Management"
    >
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white h-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center">
              <span className="mr-3">👥</span>
              User Management
            </h2>
            <p className="text-purple-100 mt-1">Quản lý người dùng hệ thống</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-purple-200 transition-colors duration-200 text-2xl hover:rotate-90 transform transition-transform"
          >
            ✕
          </button>
        </div>

        <div
          className="p-6 overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 120px)" }}
        >
          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative mb-6 backdrop-blur-sm">
              <span className="flex items-center">
                <span className="mr-2">⚠️</span>
                {error}
              </span>
            </div>
          )}

          {/* Add User Button */}
          {!editingUser && !showAddForm && (
            <div className="mb-6">
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
              >
                <span className="mr-2">➕</span>
                Add New User
              </button>
            </div>
          )}

          {/* Add/Edit User Form */}
          {(showAddForm || editingUser) && (
            <form
              onSubmit={editingUser ? handleUpdateUser : handleAddUser}
              className="mb-8 bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-xl shadow-xl border border-gray-600"
            >
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                <span className="mr-3">{editingUser ? "✏️" : "➕"}</span>
                {editingUser ? "Edit User" : "Add New User"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Enter username"
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    value={
                      editingUser ? editingUser.username : newUser.username
                    }
                    onChange={(e) =>
                      editingUser
                        ? setEditingUser({
                            ...editingUser,
                            username: e.target.value,
                          })
                        : setNewUser({ ...newUser, username: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    value={
                      editingUser ? editingUser.password : newUser.password
                    }
                    onChange={(e) =>
                      editingUser
                        ? setEditingUser({
                            ...editingUser,
                            password: e.target.value,
                          })
                        : setNewUser({ ...newUser, password: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    value={
                      editingUser ? editingUser.fullName : newUser.fullName
                    }
                    onChange={(e) =>
                      editingUser
                        ? setEditingUser({
                            ...editingUser,
                            fullName: e.target.value,
                          })
                        : setNewUser({ ...newUser, fullName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Role
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    value={editingUser ? editingUser.role : newUser.role}
                    onChange={(e) =>
                      editingUser
                        ? setEditingUser({
                            ...editingUser,
                            role: e.target.value,
                          })
                        : setNewUser({ ...newUser, role: e.target.value })
                    }
                  >
                    <option value="user">👤 User</option>
                    <option value="admin">👑 Admin</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {editingUser ? "Updating..." : "Adding..."}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <span className="mr-2">{editingUser ? "💾" : "➕"}</span>
                      {editingUser ? "Update User" : "Add User"}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingUser(null);
                    setShowAddForm(false);
                    setNewUser({
                      username: "",
                      password: "",
                      role: "user",
                      fullName: "",
                    });
                  }}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
                >
                  <span className="mr-2">❌</span>
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Users Table */}
          <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
            <div className="bg-gradient-to-r from-gray-700 to-gray-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <span className="mr-3">📋</span>
                Users List
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                      👤 Username
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                      📝 Full Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                      🏷️ Role
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                      ⚙️ Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {users.map((user, index) => (
                    <tr
                      key={user.id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-800" : "bg-gray-750"
                      } hover:bg-gray-700 transition-colors duration-200`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                              {user.username.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              {user.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {user.fullName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            user.role === "admin"
                              ? "bg-purple-500 bg-opacity-20 text-purple-300 border border-purple-500"
                              : "bg-blue-500 bg-opacity-20 text-blue-300 border border-blue-500"
                          }`}
                        >
                          {user.role === "admin" ? "👑 Admin" : "👤 User"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingUser(user)}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center"
                            disabled={loading}
                          >
                            <span className="mr-1">✏️</span>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center"
                            disabled={loading}
                          >
                            <span className="mr-1">🗑️</span>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {users.length === 0 && !loading && (
              <div className="text-center py-12 text-gray-400">
                <div className="text-6xl mb-4">👥</div>
                <p className="text-xl mb-2">No users found</p>
                <p>Add your first user to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserManagement;
