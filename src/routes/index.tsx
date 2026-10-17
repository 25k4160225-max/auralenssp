import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Play,
  ShieldCheck,
  Truck,
  SlidersHorizontal,
  Headphones,
  ScanEye,
  Languages,
  ChevronDown,
  Camera,
  RefreshCw,
  Phone,
  MapPin,
} from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { LineCard, ProductCard, TechGrid } from "@/components/catalog-ui";
import { pageHead, products } from "@/lib/catalog";
import hero from "@/assets/hero_pro.jpg";
import modelPro from "@/assets/model_pro.jpg";
import modelLite from "@/assets/model_lite.jpg";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Kính thông minh, tầm nhìn mới",
      "Khám phá AuraLens Pro và Lite: kính thông minh đa dụng và thời trang tinh giản. Tùy chọn gọng, màu sắc và độ cận.",
    ),
  component: Home,
});

function Home() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [statusText, setStatusText] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
      setStatusText("Đang quét tỷ lệ khuôn mặt... Đang phân tích gọng kính phù hợp!");
    } catch (err) {
      alert("Không thể truy cập camera. Vui lòng cấp quyền camera trên trình duyệt của bạn.");
    }
  };

  return (
    <>
      <section className="hero">
        <img
          className="hero-photo"
          src={hero}
          alt="AuraLens Pro với cảm biến và thấu kính thông minh"
        />
        <div className="container-main hero-inner">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              TẦM NHÌN MỚI. KHẢ NĂNG MỚI.
            </div>
            <h1>
              AuraLens.
              <br />
              Nhìn rõ hơn.
              <br />
              <span>Sống khác biệt.</span>
            </h1>
            <p className="hero-subtitle">
              Không chỉ là một chiếc kính. Là cách bạn nhìn,
              <br className="hidden md:block" /> kết nối và khám phá thế giới bằng công nghệ AI.
            </p>
            <div className="hero-ctas">
              <Button asChild>
                <Link to="/shop">
                  Khám phá bộ sưu tập
                  <ArrowRight />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/technology">
                  <Play size={14} />
                  Trải nghiệm công nghệ
                </Link>
              </Button>
            </div>
            <div className="hero-mini">
              <span>
                <ScanEye size={14} />
                Tự động lấy nét
              </span>
              <span>
                <Languages size={14} />
                Dịch thuật AR
              </span>
              <span>
                <ShieldCheck size={14} />
                Bảo vệ mắt
              </span>
            </div>
          </div>
          <div className="hero-label">
            <b>AuraLens Pro</b>
            <span>Công nghệ vượt trội. Trong tầm mắt.</span>
          </div>
          <div className="hero-bottom">
            <span>
              01 <span className="mx-2">──────</span> 02
            </span>
            <span className="flex items-center gap-2">
              CUỘN ĐỂ KHÁM PHÁ
              <ChevronDown size={12} />
            </span>
          </div>
        </div>
      </section>

      <div className="benefits">
        <div className="container-main benefits-inner">
          {[
            { Icon: Truck, title: "Giao hàng toàn quốc", sub: "Đồng hành trên mọi hành trình" },
            { Icon: ShieldCheck, title: "An tâm lựa chọn", sub: "Thông tin sản phẩm minh bạch" },
            {
              Icon: SlidersHorizontal,
              title: "Cá nhân hóa chiếc kính",
              sub: "Chọn gọng, màu sắc và độ cận",
            },
            { Icon: Headphones, title: "Aura AI luôn bên bạn", sub: "Tư vấn trực tuyến 24/7" },
          ].map(({ Icon, title, sub }) => (
            <div className="benefit" key={title}>
              <Icon />
              <div>
                <b>{title}</b>
                <small>{sub}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="section container-main">
        <div className="section-top">
          <div>
            <div className="eyebrow">HAI PHONG CÁCH. MỘT TẦM NHÌN.</div>
            <h2>Chiếc kính dành riêng cho bạn.</h2>
            <div className="section-description">
              Hiệu năng mạnh mẽ hay phong cách tinh giản? Tìm AuraLens của riêng bạn.
            </div>
          </div>
          <Button variant="link" asChild>
            <Link to="/shop">
              Tất cả sản phẩm
              <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="line-grid">
          <LineCard line="pro" />
          <LineCard line="lite" />
        </div>
      </section>

      <section className="section tech-band">
        <div className="container-main">
          <div className="section-top">
            <div>
              <div className="eyebrow">CÔNG NGHỆ TRONG TẦM MẮT</div>
              <h2>Thông minh hơn. Tự nhiên hơn.</h2>
              <p className="section-description">
                Những công nghệ cốt lõi định hình thế hệ kính AuraLens.
              </p>
            </div>
            <Button variant="link" asChild>
              <Link to="/technology">
                Tìm hiểu công nghệ
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <TechGrid />
        </div>
      </section>

      <section className="section container-main">
        <div className="section-top">
          <div>
            <div className="eyebrow">THIẾT KẾ ĐA DẠNG</div>
            <h2>Một phong cách. Rất riêng.</h2>
          </div>
          <Button variant="link" asChild>
            <Link to="/shop">
              Xem bộ sưu tập
              <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="product-grid">
          {products
            .filter((_, i) => [0, 2, 4, 7].includes(i))
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>

      <section className="section container-main pt-0">
        <div className="section-top">
          <div>
            <div className="eyebrow">AURALENS TRONG CUỘC SỐNG</div>
            <h2>Đeo công nghệ. Thể hiện chính mình.</h2>
          </div>
        </div>
        <div className="lifestyle-grid">
          <Link
            to="/product/$line"
            params={{ line: "pro" }}
            search={{ variant: undefined }}
            className="lifestyle-photo"
          >
            <img src={modelPro} alt="Người mẫu nam đeo AuraLens Pro" loading="lazy" />
            <div className="lifestyle-caption">
              <h3>Sẵn sàng khám phá.</h3>
              <p>AuraLens Pro · Hiệu năng cho mỗi hành trình</p>
            </div>
          </Link>
          <Link
            to="/product/$line"
            params={{ line: "lite" }}
            search={{ variant: undefined }}
            className="lifestyle-photo"
          >
            <img src={modelLite} alt="Người mẫu nữ đeo AuraLens Lite trong suốt" loading="lazy" />
            <div className="lifestyle-caption">
              <h3>Tinh tế mỗi ngày.</h3>
              <p>AuraLens Lite · Công nghệ hòa cùng phong cách</p>
            </div>
          </Link>
        </div>
      </section>
      {/* --- PHẦN 1: TÍNH NĂNG CHỤP ẢNH QUÉT KHUÔN MẶT & ĐỀ XUẤT GỌNG KÍNH --- */}
      <section className="py-10 px-4 bg-slate-900 text-white text-center my-8 rounded-2xl max-w-4xl mx-auto shadow-xl">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-white">Chụp Ảnh Phân Tích & Chọn Gọng Kính</h2>
          <p className="text-slate-300 text-sm mb-6">
            Chụp nhanh 1 bức ảnh để AI nhận diện tỷ lệ khuôn mặt (Tròn, Vuông, Tam Giác) và đề xuất gọng kính phù hợp nhất.
          </p>

          <canvas ref={canvasRef} className="hidden" />

          <div className="relative w-full max-w-md mx-auto aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
            {/* Hiển thị Video khi đang mở Camera */}
            {isCameraActive && (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            )}

            {/* Hiển thị Ảnh đã chụp */}
            {!isCameraActive && capturedImage && (
              <img src={capturedImage} alt="Ảnh chụp khuôn mặt" className="w-full h-full object-cover" />
            )}

            {/* Trạng thái ban đầu */}
            {!isCameraActive && !capturedImage && (
              <div className="text-slate-500 flex flex-col items-center gap-2 p-4">
                <Camera className="w-10 h-10 stroke-1" />
                <span className="text-xs">Chưa bật camera</span>
              </div>
            )}
          </div>

          {/* Nút thao tác nhanh */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            {!isCameraActive && !capturedImage && (
              <Button onClick={startCamera} className="bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl">
                <Camera className="w-4 h-4 mr-2" /> Bật Camera
              </Button>
            )}

            {isCameraActive && (
              <Button onClick={captureAndAnalyze} className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl">
                <Camera className="w-4 h-4 mr-2" /> Chụp Ảnh & Phân Tích Tức Thì
              </Button>
            )}

            {capturedImage && (
              <Button onClick={startCamera} variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800 rounded-xl">
                <RefreshCw className="w-4 h-4 mr-2" /> Chụp Lại Ảnh
              </Button>
            )}
          </div>

          {/* Trạng thái đang phân tích */}
          {isAnalyzing && (
            <p className="mt-4 text-sm font-medium text-amber-400 flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" /> Đang phân tích tỷ lệ khuôn mặt...
            </p>
          )}

          {/* Kết quả trả về lập tức */}
          {result && !isAnalyzing && (
            <div className="mt-6 p-4 bg-slate-800/90 rounded-xl border border-slate-700 text-left">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                <CheckCircle2 className="w-5 h-5" />
                <span>Kết quả nhận diện: {result.faceShape}</span>
              </div>
              <p className="text-slate-300 text-xs mb-2 leading-relaxed">{result.suggestion}</p>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <p className="text-xs text-blue-400 font-semibold mb-0.5">Gọng kính đề xuất phù hợp:</p>
                <p className="text-sm font-bold text-white">{result.frames}</p>
              </div>
            </div>
          )}
        </div>
      </section>


      {/* --- PHẦN 2: ĐÁNH GIÁ KHÁCH HÀNG & THÔNG TIN LIÊN HỆ KẾT NỐI --- */}
      <section className="py-12 bg-slate-50 px-4 text-center my-8 rounded-2xl max-w-4xl mx-auto border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Đánh giá từ khách hàng</h2>
        <div className="bg-white p-6 rounded-2xl shadow-sm max-w-md mx-auto border border-slate-100 mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-slate-900">@caubequakhu</span>
            <span className="text-amber-500 font-semibold bg-amber-50 px-2.5 py-1 rounded-full text-xs">⭐ 4.5/5</span>
          </div>
          <p className="text-slate-600 text-sm italic leading-relaxed">
            "Sản phẩm tuyệt vời quá đeo vào như đang ở tương lai v, nhìn thấy mọi thứ nhưng không thấy được tiếng lòng của em"
          </p>
        </div>

        {/* THÔNG TIN LIÊN HỆ & KẾT NỐI VỚI CHÚNG TÔI */}
        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Kết nối với chúng tôi</h3>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-slate-700">
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" /> Hotline: <strong className="text-slate-900">1900583667</strong>
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" /> Địa chỉ: <strong className="text-slate-900">99 Hồ Đắc Di, Phường An Cựu, Tp Huế</strong>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
