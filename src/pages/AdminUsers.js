import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AdminUsers = () => {
    const { isAuthenticated, isAdmin } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        role: "user",
        avatar: "",
    });

    // Fetch users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3001/users");
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError("Không thể tải danh sách người dùng");
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Redirect if not authenticated or not admin
    if (!isAuthenticated || !isAdmin) {
        return <Navigate to="/" />;
    }

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Open add user modal
    const handleAddUser = () => {
        setFormData({
            username: "",
            password: "",
            email: "",
            role: "user",
            avatar: "",
        });
        setShowAddModal(true);
    };

    // Open edit user modal
    const handleEditUser = (user) => {
        setCurrentUser(user);
        setFormData({
            username: user.username,
            password: "", // Password is not displayed for security
            email: user.email,
            role: user.role,
            avatar: user.avatar,
        });
        setShowEditModal(true);
    };

    // Submit add user form
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check if username already exists
            const checkUsername = users.find(user => user.username === formData.username);
            if (checkUsername) {
                setError("Tên đăng nhập đã tồn tại");
                return;
            }

            const response = await axios.post("http://localhost:3001/users", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setUsers([...users, response.data]);
            setShowAddModal(false);
            setError(null);
        } catch (err) {
            setError("Không thể thêm người dùng mới");
        }
    };

    // Submit edit user form
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create a copy of formData to modify
            const userData = { ...formData };

            // If password is empty, remove it from the request
            if (!userData.password) {
                delete userData.password;
            }

            const response = await axios.put(
                `http://localhost:3001/users/${currentUser.id}`,
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setUsers(
                users.map((user) => (user.id === currentUser.id ? response.data : user))
            );
            setShowEditModal(false);
            setError(null);
        } catch (err) {
            setError("Không thể cập nhật người dùng");
        }
    };

    // Delete user
    const handleDeleteUser = async (id) => {
        // Prevent deleting yourself
        const currentUserData = JSON.parse(localStorage.getItem("user"));
        if (currentUserData.id === id) {
            setError("Bạn không thể xóa tài khoản của chính mình");
            return;
        }

        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
            try {
                await axios.delete(`http://localhost:3001/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setUsers(users.filter((user) => user.id !== id));
                setError(null);
            } catch (err) {
                setError("Không thể xóa người dùng");
            }
        }
    };

    // Modal component for adding/editing users
    const UserFormModal = ({ isOpen, onClose, title, onSubmit }) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-[#1e1e1e] rounded-lg shadow-2xl p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="block text-white text-sm font-bold mb-2">
                                Tên đăng nhập
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                disabled={showEditModal} // Cannot change username when editing
                                className="w-full px-4 py-2 bg-[#333] text-white border border-[#555] rounded focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-[#444] disabled:cursor-not-allowed"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-white text-sm font-bold mb-2">
                                {showEditModal ? "Mật khẩu mới (để trống nếu không đổi)" : "Mật khẩu"}
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-[#333] text-white border border-[#555] rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                                required={!showEditModal} // Not required when editing
                            />
                        </div>

                        <div>
                            <label className="block text-white text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-[#333] text-white border border-[#555] rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-white text-sm font-bold mb-2">
                                Quyền
                            </label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-[#333] text-white border border-[#555] rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                                required
                            >
                                <option value="user">Người dùng</option>
                                <option value="admin">Quản trị viên</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-white text-sm font-bold mb-2">
                                Ký tự hiển thị (Avatar)
                            </label>
                            <input
                                type="text"
                                name="avatar"
                                value={formData.avatar}
                                onChange={handleInputChange}
                                placeholder="Nhập 1 ký tự"
                                maxLength="1"
                                className="w-full px-4 py-2 bg-[#333] text-white border border-[#555] rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>

                        <div className="flex justify-end space-x-3 pt-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                            >
                                Lưu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#141414] text-white p-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#141414] text-white p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
                    <button
                        onClick={handleAddUser}
                        className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                        Thêm người dùng
                    </button>
                </div>

                {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                <div className="bg-[#1e1e1e] rounded-lg shadow-lg overflow-hidden">
                    <table className="w-full text-white">
                        <thead className="bg-[#333] text-left">
                            <tr>
                                <th className="px-6 py-4 w-12">#</th>
                                <th className="px-6 py-4 w-12">Avatar</th>
                                <th className="px-6 py-4">Tên đăng nhập</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4 w-28">Quyền</th>
                                <th className="px-6 py-4 w-28 text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#333]">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-[#252525] transition-colors">
                                    <td className="px-6 py-4">{user.id}</td>
                                    <td className="px-6 py-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${user.role === 'admin'
                                            ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                                            : "bg-gradient-to-r from-orange-400 to-orange-500"
                                            }`}>
                                            {user.avatar || user.username?.charAt(0)?.toUpperCase() || "U"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium">{user.username}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-medium ${user.role === "admin"
                                                ? "bg-yellow-400/20 text-yellow-300"
                                                : "bg-blue-400/20 text-blue-300"
                                                }`}
                                        >
                                            {user.role === "admin" ? "Quản trị viên" : "Người dùng"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleEditUser(user)}
                                            className="text-blue-400 hover:text-blue-300 mr-3"
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <UserFormModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Thêm người dùng mới"
                onSubmit={handleAddSubmit}
            />

            <UserFormModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                title="Sửa thông tin người dùng"
                onSubmit={handleEditSubmit}
            />
        </div>
    );
};

export default AdminUsers; 