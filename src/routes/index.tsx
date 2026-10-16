import { createFileRoute } from "@tanstack/react-router";
import {
  Phone,
  MapPin,
  Star,
  Camera,
  RefreshCw,
  ShieldCheck,
  Truck,
  Headphones,
  ArrowRight,
} from "lucide-react";
import { useState, useRef } from "react";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
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
      alert("Không thể truy cập camera. Vui lòng cấp quyền camera trên trình duyệt.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* 1. Header / Hero Section */}
      <section className="py-12 px-4 text-center bg-gradient-to-b from-slate-50 to-white">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
          AuraLens - Nhìn rõ hơn. Sống khác biệt.
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto mb-6">
          Kính thông minh công nghệ AI hỗ trợ nhận diện và trải nghiệm góc nhìn tương lai.
        </p>
      </section>

      {/* 2. Feature Camera Scan */}
      <section className="py-10 px-4 bg-slate-50 my-6 rounded-2xl max-w-4xl mx-auto border border-slate-100">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Thử Kính Ảo & Phân Tích Khuôn Mặt</h2>
          <p className="text-slate-600 text-sm mb-6">
            Bật camera để máy nhận diện tỷ lệ khuôn mặt và đề xuất gọng kính phù hợp nhất.
          </p>

          <div className="relative w-full max-w-md mx-auto aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center border-2 border-slate-200">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className={`w-full h-full object-cover ${isCameraActive ? "block" : "hidden"}`}
            />
            {!isCameraActive && (
              <div className="text-slate-400 flex flex-col items-center gap-2 p-4">
                <Camera className="w-10 h-10 stroke-1" />
                <span className="text-xs">Chưa bật camera</span>
              </div>
            )}
          </div>

          {statusText && (
            <p className="mt-3 text-sm font-medium text-emerald-600 flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" /> {statusText}
            </p>
          )}

          {!isCameraActive && (
            <button
              onClick={startCamera}
              className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-all shadow-md flex items-center gap-2 mx-auto"
            >
              <Camera className="w-4 h-4" /> Bật Camera Quét Khuôn Mặt
            </button>
          )}
        </div>
      </section>

      {/* 3. Review Card (@caubequakhu) */}
      <section className="py-10 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Đánh giá từ khách hàng</h2>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-semibold text-slate-900">@caubequakhu</h4>
              <p className="text-xs text-slate-500">Khách hàng đã mua hàng</p>
            </div>
            <div className="flex items-center gap-1 text-amber-400 bg-amber-50 px-2.5 py-1 rounded-full text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 opacity-50" />
              <span className="text-slate-700 ml-1">4.5</span>
            </div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed italic">
            "Sản phẩm tuyệt vời quá đeo vào như đang ở tương lai v, nhìn thấy mọi thứ nhưng không thấy được tiếng lòng của em"
          </p>
        </div>
      </section>

      {/* 4. Footer Contact */}
      <footer className="bg-slate-900 text-slate-200 py-8 px-4 border-t border-slate-800 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">AuraLens</h3>
            <p className="text-xs text-slate-400">Tầm nhìn mới. Khả năng mới.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 text-sm">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Phone className="w-4 h-4 text-blue-400" />
              <span>Hotline: <strong className="text-white">1900583667</strong></span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Địa chỉ: <strong className="text-white">99 Hồ Đắc Di, Phường An Cựu, Tp Huế</strong></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
