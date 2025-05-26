const movies = [
    {
        name: "PHIM ĐIỆN ẢNH DORAEMON: NOBITA VÀ CUỘC PHIÊU LƯU VÀO THẾ GIỚI TRONG TRANH",
        origin_name: "Thông qua món bảo bối mới của Doraemon, cả nhóm bạn bước thế giới trong một bức tranh nổi tiếng và bắt gặp cô bạn bí ẩn tên Claire. Với lời mời của Claire, cả nhóm cùng đến thăm vương quốc Artoria, nơi ẩn giấu một viên ngọc quý mang tên Artoria Blue đang ngủ yên. Trên hành trình tìm kiếm viên ngọc, nhóm bạn Doraemon phát hiện một truyền thuyết về sự hủy diệt của thế giới, mà truyền thuyết đó dường như đang sống dậy! Liệu cả nhóm có thể phá hủy lời nguyền này và bảo vệ cả thế giới?",
        poster_url: "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202505/11730_105_100005.jpg",
        trailer_url: "https://media.lottecinemavn.com/Media/MovieFile/MovieMedia/202503/11730_301_100001.mp4",
        isShowing: true,
    },
    {
        name: "LILO VÀ STITCH",
        origin_name: "Bộ phim live-action Lilo và Stitch đưa câu chuyện kinh điển của Disney năm 2002 trở lại với một diện mạo mới, vừa hài hước vừa đầy cảm xúc. Phim theo chân Lilo, một cô bé người Hawaii cô đơn, và Stitch, sinh vật ngoài hành tinh tinh nghịch đang chạy trốn, khi cả hai vô tình tìm thấy nhau và cùng nhau hàn gắn những tan vỡ trong gia đình của Lilo.",
        poster_url: "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202505/11786_105_100001.jpg",
        trailer_url: "https://media.lottecinemavn.com/Media/MovieFile/MovieMedia/202505/11786_301_100001.mp4",
        isShowing: true,
    },
    {
        name: "THÁM TỬ KIÊN: KỲ ÁN KHÔNG ĐẦU",
        origin_name: "Thám Tử Kiên là một nhân vật được yêu thích trong tác phẩm điện của ăn khách của NGƯỜI VỢ CUỐI CÙNG của Victor Vũ, Thám Tử Kiên: Kỳ Không Đầu sẽ là một phim Victor Vũ trở về với thể loại sở trường Kinh Dị - Trinh Thám sau những tác phẩm tình cảm lãng mạn trước đó.",
        poster_url: "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202504/11548_105_100003.jpg",
        trailer_url: "https://media.lottecinemavn.com/Media/MovieFile/MovieMedia/202503/11548_301_100001.mp4",
        isShowing: true,
    },
    {
        name: "LẬT MẶT 8: VÒNG TAY NẮNG",
        origin_name: "Một bộ phim về sự khác biệt quan điểm giữa ba thế hệ ông bà cha mẹ con cháu. Ai cũng đúng ở góc nhìn của mình nhưng đứng trước hoài bão của tuổi trẻ, cuối cùng thì ai sẽ là người phải nghe theo người còn lại? Và nếu ước mơ của những đứa trẻ bị cho là viển vông, thì cơ hội nào và bao giờ tuổi trẻ mới được tự quyết định tương lai của mình?",
        poster_url: "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202504/11733_105_100002.jpg",
        trailer_url: "https://media.lottecinemavn.com/Media/MovieFile/MovieMedia/202504/11733_301_100002.mp4",
        isShowing: true,
    },
    {
        name: "HOLY NIGHT: ĐỘI SĂN QUỶ",
        origin_name: "Tổ đội săn lùng và tiêu diệt các thế lực tôn thờ quỷ dữ với những sức mạnh siêu nhiên khác nhau gồm “tay đấm” Ma Dong-seok, Seohuyn (SNSD) và David Lee hứa hẹn mở ra cuộc chiến săn quỷ khốc liệt",
        poster_url: "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202505/11724_105_100005.jpg",
        trailer_url: "https://media.lottecinemavn.com/Media/MovieFile/MovieMedia/202504/11724_301_100002.mp4",
        isShowing: true,
    },
    {
        name: "SHIN CẬU BÉ BÚT CHÌ: BÍ ẨN! HỌC VIỆN HOA LỆ TENKASU",
        origin_name: `Câu chuyện của bộ phim bắt đầu với Shinnosuke và những người bạn của Shin thuộc Đội đặc nhiệm Kasukabe trải qua một tuần ở lại "Học viện Tư nhân Tenkasu Kasukabe" (Còn gọi là "Học viện Tenkasu"), một trường nội trú ưu tú được quản lý bởi một AI hiện đại, "Otsmun". Tất cả các học sinh ban đầu được trao một huy hiệu với 1000 điểm và điểm của các em sẽ được Otsmun tăng hoặc giảm dựa trên hành vi và kết quả học tập của các em. Trong đó ai đó tấn công Kazama. Kết quả là trí thông minh của anh ta bị suy giảm và những vết cắn kỳ lạ để lại trên mông anh ta. Đội đặc nhiệm Kasukabe hợp lực với chủ tịch hội học sinh bỏ học của trường, Chishio Atsuki, một cựu vận động viên, để thành lập một nhóm thám tử và giải quyết bí ẩn`,
        poster_url: "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202504/11774_105_100001.jpg",
        trailer_url: "https://media.lottecinemavn.com/Media/MovieFile/MovieMedia/202504/11774_301_100001.mp4",
        isShowing: false,
    },
    {
        name: "YADANG: BA MẶT LẬT KÈO",
        origin_name: `Từ giờ trở đi, bạn là kẻ chỉ điểm của tôi." Là “cầu nối” giữa thế giới ngầm và các cơ quan thực thi pháp luật, những kẻ chỉ điểm chuyên nghiệp được gọi là "yadang" - người cung cấp thông tin bí mật về thế giới ma túy cho các công tố viên và cảnh sát. Khi một kẻ chỉ điểm ma túy “báo tin” về một bữa tiệc có sự tham dự của các VIP nổi tiếng và vô tình vướng vào một âm mưu nguy hiểm, hắn phải làm mọi thứ trong khả năng của mình không chỉ để sống sót,mà còn để phục thù.`,
        poster_url: "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202505/11778_105_100002.jpg",
        trailer_url: "https://media.lottecinemavn.com/Media/MovieFile/MovieMedia/202504/11778_301_100001.mp4",
        isShowing: true,
    },
    {
        name: "UNTIL DAWN: BÍ MẬT KINH HOÀNG",
        origin_name: `Một năm sau khi em gái Melanie mất tích một cách bí ẩn, Clover cùng bạn bè quyết định vào một thung lũng nơi cuối cùng nhìn thấy em gái để tìm kiếm câu trả lời. Khi lạc vào một khu nhà bỏ hoang, họ bị một kẻ giết người đeo mặt nạ theo dõi và bị sát hại một cách kinh hoàng từng người một... cho đến khi họ tỉnh dậy và phát hiện mình quay ngược lại vào buổi tối đầu tiên. Bị mắc kẹt trong một vòng lặp thời gian bí ẩn, họ buộc phải sống lại cơn ác mộng đó mỗi đêm, nhưng mỗi lần lại phải đối mặt với những mối đe dọa mới và những cách chết khác nhau, ngày càng đáng sợ hơn. Khi hy vọng dần tắt, nhóm bạn nhận ra họ chỉ còn 13 mạng sống trước khi biến mất mãi mãi. Cách duy nhất để thoát khỏi là sống sót cho đến khi bình minh.`,
        poster_url: "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202505/11768_105_100003.jpg",
        trailer_url: "https://media.lottecinemavn.com/Media/MovieFile/MovieMedia/202504/11768_301_100001.mp4",
        isShowing: true,
    },
    {
        name: "MƯA LỬA",
        origin_name: `Những câu chuyện CHƯA TỪNG ĐƯỢC LÊN SÓNG, những CHÔNG GAI ngoài đời thực, những khó khăn ĐẨY CHÚNG TÔI đi tới giới hạn và những niềm vui CHƯA BAO GIỜ có thể diễn tả được bằng lời ... Vũ trụ đã sắp đặt, phải là 33 con người này, số phận đã định đoạt, phải là 33 Anh Tài này để tạo nên mùa Anh Trai Vượt Ngàn Chông Gai đầu tiên! Bạn đã sẵn sàng "tận hưởng cơn mưa" cùng chúng tôi?`,
        poster_url: "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202505/11782_105_100001.jpg",
        trailer_url: "https://media.lottecinemavn.com/Media/MovieFile/MovieMedia/202505/11782_301_100003.mp4",
        isShowing: true,
    },
    {
        name: "TỘI ĐỒ",
        origin_name: `Mắc kẹt trong cuộc sống thực tại rối ren, cả hai quay trở lại quê nhà để có một khởi đầu mới, để rồi phát hiện một thế lực ác quỷ đang nhăm nhe chờ đợi họ.`,
        poster_url: "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202505/11781_105_100001.jpg",
        trailer_url: "",
        isShowing: true,
    },
];

export default movies;