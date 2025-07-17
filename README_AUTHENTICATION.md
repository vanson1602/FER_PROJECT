# Hệ thống Xác thực và Phân quyền

Dự án này đã được cài đặt hệ thống xác thực và phân quyền cho người dùng với các vai trò khác nhau.

## Tính năng

- **Xác thực người dùng**: Đăng nhập bằng tài khoản và mật khẩu
- **Phân quyền**:
  - **Người dùng thường (User)**: Có thể xem nội dung phim, thông tin cá nhân
  - **Quản trị viên (Admin)**: Có thể quản lý phim (thêm, sửa, xóa) và quản lý người dùng

## Cách chạy dự án

1. **Khởi động JSON Server (API Backend)**

```bash
npm run server
```

2. **Khởi động ứng dụng React**

```bash
npm start
```

## Tài khoản mẫu

Dự án đã được cài đặt sẵn với các tài khoản sau:

### Tài khoản người dùng thường
- Username: `user`
- Password: `user123`

### Tài khoản quản trị viên
- Username: `admin`
- Password: `admin123`

## Cấu trúc hệ thống

### Backend (JSON Server)
- **db.json**: Lưu trữ dữ liệu người dùng và phim
- **server.js**: Xử lý xác thực và phân quyền dựa trên JWT

### Frontend
- **AuthContext.js**: Context API quản lý trạng thái xác thực
- **LoginModal.js**: Giao diện đăng nhập
- **AdminMovies.js**: Trang quản lý phim (chỉ dành cho admin)
- **AdminUsers.js**: Trang quản lý người dùng (chỉ dành cho admin)

## API Endpoints

### Authentication
- `POST /auth/login`: Đăng nhập và nhận JWT token

### Movies
- `GET /movies`: Lấy danh sách phim (không yêu cầu xác thực)
- `POST /movies`: Thêm phim mới (yêu cầu quyền admin)
- `PUT /movies/:id`: Cập nhật phim (yêu cầu quyền admin)
- `DELETE /movies/:id`: Xóa phim (yêu cầu quyền admin)

### Users
- `GET /users`: Lấy danh sách người dùng (yêu cầu quyền admin)
- `POST /users`: Thêm người dùng mới (yêu cầu quyền admin)
- `PUT /users/:id`: Cập nhật người dùng (yêu cầu quyền admin)
- `DELETE /users/:id`: Xóa người dùng (yêu cầu quyền admin)

## Luồng xác thực

1. Người dùng nhập thông tin đăng nhập
2. Thông tin được gửi đến server thông qua endpoint `/auth/login`
3. Server kiểm tra thông tin và trả về JWT token nếu hợp lệ
4. Token được lưu trong localStorage và được sử dụng cho các yêu cầu tiếp theo
5. Token bao gồm thông tin về vai trò của người dùng (user/admin) 