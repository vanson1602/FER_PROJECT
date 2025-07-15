import React, { useState } from "react";

const Animation = () => {
  const [currentVideo, setCurrentVideo] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [viewMode, setViewMode] = useState("selection"); // "selection" or "player"

  const handleAnimeSelect = (category) => {
    const categoryVideos = animationVideos.filter(
      (video) => video.category === category
    );
    if (categoryVideos.length > 0) {
      setSelectedCategory(category);
      setCurrentVideo(categoryVideos[0].id);
      setViewMode("player");
    }
  };

  const handleBackToSelection = () => {
    setViewMode("selection");
    setSelectedCategory("");
    setCurrentVideo("");
  };

  const animationVideos = [
    {
      id: "RZzbDFgXMUU",
      title:
        "Doraemon - Tập 613 - Buffet Loại Nào Cũng Có - Bản Lồng Tiếng Hay Nhất",
      thumbnail: "https://img.youtube.com/vi/RZzbDFgXMUU/maxresdefault.jpg",
      duration: "22:30",
      category: "doraemon",
    },
    {
      id: "gin3J9hQG0o",
      title:
        "[S13] Doraemon - Tập 645: Mua Hàng Ở Tương Lai [Bản Lồng Tiếng Mới Nhất]",
      thumbnail: "https://img.youtube.com/vi/gin3J9hQG0o/maxresdefault.jpg",
      duration: "22:45",
      category: "doraemon",
    },
    {
      id: "0HOa-A0rt_Q",
      title:
        "Doraemon Tập 299 - Kế Hoạch Ngày Sinh Nhật, Máy Cải Lão Hoàn Đồng - Tiếng Việt",
      thumbnail: "https://img.youtube.com/vi/0HOa-A0rt_Q/maxresdefault.jpg",
      duration: "22:20",
      category: "doraemon",
    },
    {
      id: "Rhb17GpOeug",
      title:
        "Doraemon Tập 353 - Cây Lăn Trợ Giúp Chuyển Nhà, Máy Mô Phỏng Hiện Tượng",
      thumbnail: "https://img.youtube.com/vi/Rhb17GpOeug/maxresdefault.jpg",
      duration: "22:15",
      category: "doraemon",
    },
    {
      id: "iLlXocX-ugc",
      title: "Doraemon Tập 320 - Chào Mừng Đến Thăm Trái Đất Phần 1",
      thumbnail: "https://img.youtube.com/vi/iLlXocX-ugc/maxresdefault.jpg",
      duration: "22:30",
      category: "doraemon",
    },
    // Conan Videos
    {
      id: "f_xLFg_jcfE",
      title:
        "Thám Tử Lừng Danh Conan - Tập 896 | Trạm Dừng Xe Buýt Ngày Mưa | Bản Lồng Tiếng",
      thumbnail: "https://img.youtube.com/vi/f_xLFg_jcfE/maxresdefault.jpg",
      duration: "24:15",
      category: "conan",
    },
    {
      id: "KKkoxtP1xCI",
      title:
        "Thám Tử Lừng Danh Conan - Tập 897 | Con Đường Tách Biệt Của Ngày Lái Xe | Bản Lồng Tiếng",
      thumbnail: "https://img.youtube.com/vi/KKkoxtP1xCI/maxresdefault.jpg",
      duration: "24:20",
      category: "conan",
    },
    {
      id: "JzFW_-U_Zo8",
      title:
        "Thám Tử Lừng Danh Conan - Tập 605 - Cái Chết Của Nhà Sưu Tầm Cổ Vật | 《Tập Đặc Biệt》",
      thumbnail: "https://img.youtube.com/vi/JzFW_-U_Zo8/maxresdefault.jpg",
      duration: "25:10",
      category: "conan",
    },
    {
      id: "adz3Q1bJDHI",
      title:
        "Thám Tử Lừng Danh Conan - Tập 613 - Biệt Thự Cô Con Gái Giàu Có (Phần 1) | 《Tập Đặc Biệt》",
      thumbnail: "https://img.youtube.com/vi/adz3Q1bJDHI/maxresdefault.jpg",
      duration: "25:05",
      category: "conan",
    },
    // Shin Videos
    {
      id: "U7b_ON2Xzv8",
      title: "Shin Cậu Bé Bút Chì ( Lồng Tiếng Full HD ) : Buổi Ngắm Hoa Bí Ẩn",
      thumbnail: "https://img.youtube.com/vi/U7b_ON2Xzv8/maxresdefault.jpg",
      duration: "11:25",
      category: "shin",
    },
    {
      id: "nfPjUm8hj4g",
      title:
        "[Bản Lồng Tiếng] Shin - Cậu Bé Bút Chì: Chuyện chuyển nhà! Cuộc tấn công của đội quân xương rồng!",
      thumbnail: "https://img.youtube.com/vi/nfPjUm8hj4g/maxresdefault.jpg",
      duration: "11:40",
      category: "shin",
    },
    {
      id: "UVZ-b0md-1Y",
      title:
        "[Bản Lồng Tiếng] Shin - Cậu Bé Bút Chì: Cơn bão hung hăng mời gọi! Vị hôn thê đến từ tương lai",
      thumbnail: "https://img.youtube.com/vi/UVZ-b0md-1Y/maxresdefault.jpg",
      duration: "11:50",
      category: "shin",
    },
    // One Piece Videos
    {
      id: "65RXDD-IN98",
      title:
        "[Lù Rì Viu] One Piece Tập 1135 - 1136 Bonney Hoá Nika Đấm Vỡ Mồm Alpha Cp8 || Review anime",
      thumbnail: "https://img.youtube.com/vi/65RXDD-IN98/maxresdefault.jpg",
      duration: "15:30",
      category: "onepiece",
    },
    // Tom and Jerry Videos
    {
      id: "3YHO81QWQmU",
      title: "Tom and Jerry Singapore Full Episodes | Cartoon Network Asia",
      thumbnail: "https://img.youtube.com/vi/3YHO81QWQmU/maxresdefault.jpg",
      duration: "45:30",
      category: "tomjerry",
    },
    {
      id: "lSnaD2ZYSdU",
      title: "Tom và Jerry - Quả trứng và Jerry",
      thumbnail: "https://img.youtube.com/vi/lSnaD2ZYSdU/maxresdefault.jpg",
      duration: "22:15",
      category: "tomjerry",
    },
    {
      id: "WAkdyQnOfIo",
      title:
        "Tom và Jerry - Hành động ngu dốt của Jerry(mice follies, Viet sub)",
      thumbnail: "https://img.youtube.com/vi/WAkdyQnOfIo/maxresdefault.jpg",
      duration: "21:45",
      category: "tomjerry",
    },
    // Pokemon Videos
    {
      id: "Y183Bawp2yI",
      title:
        "[S23] Pokémon Tập 1 - Pikachu Ra Đời - Hoạt Hình Pokémon Tiếng Việt",
      thumbnail: "https://img.youtube.com/vi/Y183Bawp2yI/maxresdefault.jpg",
      duration: "21:30",
      category: "pokemon",
    },
    {
      id: "Y183Bawp2yI",
      title:
        "[S23] Pokémon Tập 2 - Satoshi Và Go, Tiến Lên Cùng Lugia - Hoạt Hình Pokémon Tiếng Việt.",
      thumbnail: "https://img.youtube.com/vi/Y183Bawp2yI/maxresdefault.jpg",
      duration: "21:30",
      category: "pokemon",
    },
    {
      id: "nbgGWeY76Co",
      title:
        "[S23] Pokémon Tập 3 - Tòa Tháp Bí Ẩn Của Fushigisou - Hoạt Hình Pokémon Tiếng Việt.",
      thumbnail: "https://img.youtube.com/vi/nbgGWeY76Co/maxresdefault.jpg",
      duration: "21:30",
      category: "pokemon",
    },
    // Masha and The Bear Videos
    {
      id: "KYniUCGPGLs",
      title: "Masha and The Bear - Recipe for disaster (Episode 17)",
      thumbnail: "https://img.youtube.com/vi/KYniUCGPGLs/maxresdefault.jpg",
      duration: "7:00",
      category: "masha",
    },
    {
      id: "x1fe8-Qli9E",
      title: "Masha and The Bear - Bon appétit (Episode 24)",
      thumbnail: "https://img.youtube.com/vi/x1fe8-Qli9E/maxresdefault.jpg",
      duration: "7:00",
      category: "masha",
    },
    // Peppa Pig Videos
    {
      id: "QFdLgfy63cc",
      title:
        "Peppa Pig Season 1 Episode 1 - Muddy Puddles - Cartoons for Children",
      thumbnail: "https://img.youtube.com/vi/QFdLgfy63cc/maxresdefault.jpg",
      duration: "5:00",
      category: "peppapig",
    },
    {
      id: "tvd7t9dYOr4",
      title:
        "Peppa Pig Season 1 Episode 2 - Mr Dinosaur is Lost - Cartoons for Children",
      thumbnail: "https://img.youtube.com/vi/tvd7t9dYOr4/maxresdefault.jpg",
      duration: "5:00",
      category: "peppapig",
    },
    // Đội Bay Siêu Đẳng Videos
    {
      id: "E0tNTGAOxsY",
      title:
        "ĐỘI BAY SIÊU ĐẲNG 16 - Tập 01: Cuộc Chiến Của Những Chuyên Gia Xây Dựng",
      thumbnail: "https://img.youtube.com/vi/E0tNTGAOxsY/maxresdefault.jpg",
      duration: "13:00",
      category: "superwings",
    },
    {
      id: "b2MHS8zJKnA",
      title: "ĐỘI BAY SIÊU ĐẲNG - Phần 8 | Tập 09: Cuộc Chiến Thần Thoại 3D",
      thumbnail: "https://img.youtube.com/vi/b2MHS8zJKnA/maxresdefault.jpg",
      duration: "13:00",
      category: "superwings",
    },
  ];

  // Helper functions
  const getVideoDescription = (category) => {
    switch (category) {
      case "doraemon":
        return "Doraemon là bộ phim hoạt hình nổi tiếng của Nhật Bản kể về chú mèo máy đến từ tương lai để giúp đỡ cậu bé Nobita. Cùng theo dõi những cuộc phiêu lưu thú vị và những bảo bối thần kỳ trong túi thần kỳ của Doraemon!";
      case "conan":
        return "Thám Tử Lừng Danh Conan là bộ anime trinh thám nổi tiếng kể về cậu học sinh trung học Kudo Shinichi bị teo nhỏ thành cậu bé Conan Edogawa. Với trí thông minh xuất chúng, Conan giải quyết những vụ án bí ẩn và tìm cách trở lại hình dạng ban đầu.";
      case "shin":
        return "Shin Cậu Bé Bút Chì là bộ anime hài hước về cậu bé Shinnosuke Nohara 5 tuổi tinh nghịch và những cuộc phiêu lưu hàng ngày đầy tiếng cười với gia đình và bạn bè.";
      case "onepiece":
        return "One Piece là bộ anime phiêu lưu về Monkey D. Luffy và băng hải tặc Mũ Rơm trong hành trình tìm kiếm kho báu One Piece để trở thành Vua Hải Tặc.";
      case "tomjerry":
        return "Tom và Jerry là bộ phim hoạt hình kinh điển về cuộc đuổi bắt vui nhộn và bất tận giữa chú mèo Tom và chú chuột Jerry. Những tình huống hài hước và sáng tạo mang đến tiếng cười cho mọi lứa tuổi.";
      case "pokemon":
        return "Pokémon kể về hành trình của Satoshi và Pikachu cùng những người bạn khám phá thế giới Pokémon, chinh phục các huy hiệu và tham gia các trận đấu hấp dẫn.";
      case "masha":
        return "Masha and The Bear là series hoạt hình vui nhộn kể về cô bé Masha tinh nghịch và chú gấu tốt bụng với những câu chuyện hài hước, ý nghĩa dành cho thiếu nhi.";
      case "peppapig":
        return "Peppa Pig là bộ phim hoạt hình nổi tiếng dành cho trẻ em, kể về cô heo Peppa và gia đình cùng những câu chuyện vui nhộn, giáo dục.";
      case "superwings":
        return "Đội Bay Siêu Đẳng (Super Wings) là series hoạt hình về những chiếc máy bay dễ thương cùng nhau giải cứu, xây dựng và phiêu lưu khắp thế giới, mang lại bài học bổ ích cho trẻ nhỏ.";
      default:
        return "Thế giới phim hoạt hình đặc sắc với những câu chuyện thú vị và ý nghĩa dành cho mọi lứa tuổi.";
    }
  };

  const getVideoTags = (category) => {
    switch (category) {
      case "doraemon":
        return ["#Doraemon", "#PhimHoatHinh", "#TiengViet", "#TreEm", "#Robot"];
      case "conan":
        return ["#Conan", "#ThamTu", "#TrinhTham", "#Anime", "#TiengViet"];
      case "shin":
        return [
          "#ShinChanVN",
          "#HaiHuoc",
          "#TreEm",
          "#GiaDinh",
          "#PhimHoatHinh",
        ];
      case "onepiece":
        return ["#OnePiece", "#HaiTac", "#Luffy", "#Anime", "#PhieuLuu"];
      case "tomjerry":
        return [
          "#TomJerry",
          "#HaiHuoc",
          "#KinhDien",
          "#TreEm",
          "#CartoonNetwork",
        ];
      case "pokemon":
        return ["#Pokemon", "#Pikachu", "#Anime", "#Satoshi", "#HoatHinh"];
      case "masha":
        return [
          "#MashaAndTheBear",
          "#Cartoon",
          "#Kids",
          "#Funny",
          "#Animation",
        ];
      case "peppapig":
        return ["#PeppaPig", "#Cartoon", "#Kids", "#Family", "#Education"];
      case "superwings":
        return [
          "#SuperWings",
          "#DoiBaySieuDang",
          "#Cartoon",
          "#Kids",
          "#Adventure",
        ];
      default:
        return ["#PhimHoatHinh", "#Anime", "#TiengViet"];
    }
  };

  const getChannelName = (category) => {
    switch (category) {
      case "doraemon":
        return "🤖 Doraemon Channel";
      case "conan":
        return "🕵️ Detective Conan VN";
      case "shin":
        return "✏️ Shin Chan VN";
      case "onepiece":
        return "🦸 One Piece Official";
      case "tomjerry":
        return "🐱 Tom & Jerry VN";
      case "pokemon":
        return "⚡ Pokémon Channel";
      case "masha":
        return "🐻 Masha & The Bear";
      case "peppapig":
        return "🐷 Peppa Pig Official";
      case "superwings":
        return "✈️ Super Wings VN";
      default:
        return "📺 Anime Channel";
    }
  };

  // Anime categories for selection grid
  const animeCategories = [
    {
      id: "doraemon",
      name: "Doraemon",
      icon: "🤖",
      description: "Chú mèo máy từ tương lai",
      color: "from-blue-400 to-blue-600",
      videoCount: animationVideos.filter((v) => v.category === "doraemon")
        .length,
      thumbnail: "https://img.youtube.com/vi/RZzbDFgXMUU/maxresdefault.jpg",
    },
    {
      id: "conan",
      name: "Thám Tử Conan",
      icon: "🕵️",
      description: "Trinh thám lừng danh",
      color: "from-red-400 to-red-600",
      videoCount: animationVideos.filter((v) => v.category === "conan").length,
      thumbnail: "https://img.youtube.com/vi/f_xLFg_jcfE/maxresdefault.jpg",
    },
    {
      id: "shin",
      name: "Shin Cậu Bé Bút Chì",
      icon: "✏️",
      description: "Cậu bé tinh nghịch",
      color: "from-yellow-400 to-orange-500",
      videoCount: animationVideos.filter((v) => v.category === "shin").length,
      thumbnail: "https://img.youtube.com/vi/U7b_ON2Xzv8/maxresdefault.jpg",
    },
    {
      id: "onepiece",
      name: "One Piece",
      icon: "🦸",
      description: "Hành trình hải tặc",
      color: "from-green-400 to-green-600",
      videoCount: animationVideos.filter((v) => v.category === "onepiece")
        .length,
      thumbnail: "https://img.youtube.com/vi/65RXDD-IN98/maxresdefault.jpg",
    },
    {
      id: "tomjerry",
      name: "Tom & Jerry",
      icon: "🐱",
      description: "Mèo và chuột kinh điển",
      color: "from-orange-400 to-yellow-500",
      videoCount: animationVideos.filter((v) => v.category === "tomjerry")
        .length,
      thumbnail: "https://img.youtube.com/vi/3YHO81QWQmU/maxresdefault.jpg",
    },
    // Pokemon Category
    {
      id: "pokemon",
      name: "Pokémon",
      icon: "⚡",
      description: "Hành trình cùng Pikachu",
      color: "from-yellow-300 to-yellow-500",
      videoCount: animationVideos.filter((v) => v.category === "pokemon")
        .length,
      thumbnail: "https://img.youtube.com/vi/Y183Bawp2yI/maxresdefault.jpg",
    },
    // Masha and The Bear Category
    {
      id: "masha",
      name: "Masha and The Bear",
      icon: "🐻",
      description: "Cô bé nghịch ngợm và chú gấu tốt bụng",
      color: "from-pink-300 to-yellow-200",
      videoCount: animationVideos.filter((v) => v.category === "masha").length,
      thumbnail: "https://img.youtube.com/vi/KYniUCGPGLs/maxresdefault.jpg",
    },
    // Peppa Pig Category
    {
      id: "peppapig",
      name: "Peppa Pig",
      icon: "🐷",
      description: "Heo Peppa vui nhộn cho bé",
      color: "from-pink-200 to-pink-400",
      videoCount: animationVideos.filter((v) => v.category === "peppapig")
        .length,
      thumbnail: "https://img.youtube.com/vi/QFdLgfy63cc/maxresdefault.jpg",
    },
    // Đội Bay Siêu Đẳng Category
    {
      id: "superwings",
      name: "Đội Bay Siêu Đẳng",
      icon: "✈️",
      description: "Phi đội máy bay giải cứu vui nhộn",
      color: "from-blue-200 to-blue-400",
      videoCount: animationVideos.filter((v) => v.category === "superwings")
        .length,
      thumbnail: "https://img.youtube.com/vi/E0tNTGAOxsY/maxresdefault.jpg",
    },
  ];

  // Anime Selection Grid Component
  const AnimeSelectionGrid = () => (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {animeCategories.map((anime) => (
          <div
            key={anime.id}
            onClick={() => handleAnimeSelect(anime.id)}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group"
          >
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={anime.thumbnail}
                alt={anime.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(
                    anime.name
                  )}`;
                }}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${anime.color} opacity-60`}
              ></div>

              {/* Icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl">{anime.icon}</div>
              </div>

              {/* Video count badge */}
              <div className="absolute top-3 right-3 bg-black bg-opacity-80 text-white px-2 py-1 rounded-full text-sm font-bold">
                {anime.videoCount} videos
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                {anime.name}
              </h3>
              <p className="text-gray-600 text-sm">{anime.description}</p>

              {anime.videoCount > 0 ? (
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-green-600 font-semibold text-sm">
                    ✓ Có sẵn
                  </span>
                  <button
                    className={`px-4 py-2 bg-gradient-to-r ${anime.color} text-white rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300`}
                  >
                    Xem ngay
                  </button>
                </div>
              ) : (
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-gray-400 font-semibold text-sm">
                    ⏳ Sắp có
                  </span>
                  <button className="px-4 py-2 bg-gray-300 text-gray-500 rounded-full text-sm font-semibold cursor-not-allowed">
                    Chờ cập nhật
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Video Player Section Component
  const VideoPlayerSection = () => {
    const filteredVideos = animationVideos.filter(
      (video) => video.category === selectedCategory
    );
    const currentVideoData = animationVideos.find(
      (video) => video.id === currentVideo
    );

    return (
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${currentVideo}?si=qcR4hwjOdk4_yQrW`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="rounded-t-xl"
                ></iframe>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {currentVideoData?.title}
                </h2>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    ⏱️ {currentVideoData?.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    👁️ 1.2M lượt xem
                  </span>
                  <span className="flex items-center gap-1">📅 Hôm nay</span>
                </div>

                <div className="flex items-center gap-3">
                  <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold">
                    👍 Thích (124)
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-200 transition-all duration-300 font-semibold">
                    💾 Lưu
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-200 transition-all duration-300 font-semibold">
                    🔗 Chia sẻ
                  </button>
                </div>
              </div>
            </div>

            {/* Video Description */}
            <div className="bg-white rounded-xl shadow-lg mt-6 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">📝 Mô tả</h3>
              <p className="text-gray-600 leading-relaxed">
                {getVideoDescription(currentVideoData?.category || "doraemon")}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {getVideoTags(currentVideoData?.category || "doraemon").map(
                  (tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Related Videos */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                🎬 Video liên quan
                <span className="text-sm font-normal text-gray-500">
                  ({filteredVideos.length} videos)
                </span>
              </h3>

              <div className="space-y-4">
                {filteredVideos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => setCurrentVideo(video.id)}
                    className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 ${
                      currentVideo === video.id
                        ? "ring-2 ring-orange-500 bg-orange-50"
                        : "hover:shadow-md"
                    }`}
                  >
                    <div className="flex gap-3 p-3">
                      <div className="relative flex-shrink-0">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-24 h-16 object-cover rounded"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/120x90?text=${encodeURIComponent(
                              video.title.slice(0, 10)
                            )}`;
                          }}
                        />
                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                          {video.duration}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-gray-800 line-clamp-2 leading-tight">
                          {video.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {getChannelName(video.category)}
                        </p>
                        <p className="text-xs text-gray-500">
                          👀 500K lượt xem
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="pt-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 bg-clip-text text-transparent tracking-tight">
            🎨 PHIM HOẠT HÌNH
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mt-2"></div>

          {viewMode === "selection" ? (
            <p className="text-gray-600 text-xl font-medium mt-6 mb-8">
              Chọn anime yêu thích để bắt đầu xem
            </p>
          ) : (
            <div className="mt-6 mb-8">
              <button
                onClick={handleBackToSelection}
                className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-all duration-300 font-semibold"
              >
                ← Quay lại chọn anime
              </button>
              <p className="text-gray-600 text-lg mt-3">
                Đang xem:{" "}
                <span className="font-semibold">
                  {animeCategories.find((a) => a.id === selectedCategory)?.name}
                </span>
              </p>
            </div>
          )}
        </div>

        {viewMode === "selection" ? (
          <AnimeSelectionGrid />
        ) : (
          <VideoPlayerSection />
        )}
      </div>
    </div>
  );
};

export default Animation;
