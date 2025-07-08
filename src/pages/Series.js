import React from "react";

const Series = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="pt-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">📺 Phim Bộ</h1>
          <p className="text-gray-600 text-lg">
            Bộ sưu tập phim bộ hấp dẫn (Đang phát triển)
          </p>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              Đang phát triển
            </h2>
            <p className="text-gray-500">Tính năng này sẽ sớm có mặt!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Series;
