import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo và thông tin công ty */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-400">MovieHome</h3>
            </div>

            <p className="text-gray-400 mb-4 leading-relaxed">
              MovieHome là dịch vụ được cung cấp bởi Công ty Cổ Phần MovieHome,
              thành viên của Công ty Cổ Phần Giải Trí và Giáo Dục Movie (MEE,
              JSC)
            </p>

            <div className="space-y-2 text-sm text-gray-400">
              <p>
                Địa chỉ: Tầng 5, khu đô thị FPT, Phường Hoà Hải, Quận Ngũ Hành
                Sơn, Thành Phố Đà Nẵng, Việt Nam.
              </p>
              <p>Mã số doanh nghiệp: 0314415573</p>
              <p>Ngày cấp mã số doanh nghiệp: 19/5/2017.</p>
              <p>Nơi cấp: Sở kế hoạch và đầu tư thành phố Đà Nẵng.</p>
            </div>

            <div className="mt-6">
              <div className="flex items-center bg-green-600 text-white px-4 py-2 rounded-full text-sm w-fit">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ĐÃ THÔNG BÁO BỘ CÔNG THƯƠNG
              </div>
            </div>
          </div>

          {/* Giới thiệu */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">
              GIỚI THIỆU
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  Quy chế sử dụng Dịch vụ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  Khuyến mãi
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  Hướng dẫn sử dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">HỖ TRỢ</h4>
            <ul className="space-y-3">
              <li className="text-gray-400">
                <span className="text-green-400 font-semibold">
                  1900 8675 (24/7)
                </span>
              </li>
              <li>
                <a
                  href="mailto:support@moviehome.vn"
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  support@moviehome.vn
                </a>
              </li>
              <li>
                <a
                  href="https://moviehome.vn/help"
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  https://moviehome.vn/help
                </a>
              </li>
            </ul>
          </div>

          {/* Tải ứng dụng */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">
              TẢI ỨNG DỤNG
            </h4>
            <div className="space-y-3">
              <a href="#" className="block">
                <div className="bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-3 border border-gray-700">
                  <div className="flex items-center">
                    <svg
                      className="w-8 h-8 text-white mr-3"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.523 15.3414c-.5511 0-.9725-.4536-.9725-.992 0-.5329.4159-.9865.9725-.9865s.9725.4536.9725.9865c0 .5384-.4214.992-.9725.992zm-11.046 0c-.5511 0-.9725-.4536-.9725-.992 0-.5329.4159-.9865.9725-.9865s.9725.4536.9725.9865c0 .5384-.4214.992-.9725.992z" />
                    </svg>
                    <span className="text-white font-medium">Google Play</span>
                  </div>
                </div>
              </a>

              <a href="#" className="block">
                <div className="bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-3 border border-gray-700">
                  <div className="flex items-center">
                    <svg
                      className="w-8 h-8 text-white mr-3"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <span className="text-white font-medium">App Store</span>
                  </div>
                </div>
              </a>
            </div>

            {/* Kết nối với chúng tôi */}
            <div className="mt-8">
              <h5 className="text-lg font-semibold text-white mb-4">
                KẾT NỐI VỚI CHÚNG TÔI
              </h5>
              <div className="flex space-x-3">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/share/1BwUkMzkdZ/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/vvann._.sownn_204?igsh=MTVscG5wMWJ0MHlzcg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.743 3.708 12.446c0-1.297.49-2.449 1.297-3.324.875-.807 2.026-1.297 3.323-1.297 1.297 0 2.449.49 3.324 1.297.807.875 1.297 2.027 1.297 3.324 0 1.297-.49 2.449-1.297 3.324-.875.807-2.027 1.297-3.324 1.297z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="#"
                  className="w-10 h-10 bg-red-600 hover:bg-red-500 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* SoundCloud */}
                <a
                  href="#"
                  className="w-10 h-10 bg-orange-500 hover:bg-orange-400 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.104.101.104.05 0 .093-.046.101-.104l.255-2.105-.255-2.154c-.008-.054-.051-.1-.101-.1m1.702.105c-.058 0-.106.053-.113.119L2.59 14.31l.174 1.853c.007.066.055.119.113.119.057 0 .105-.053.113-.119l.193-1.853-.193-1.861c-.008-.066-.056-.119-.113-.119" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 MovieHome. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
