import { Link } from "@tanstack/react-router";
import { Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 px-4 border-t border-slate-800 text-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cột 1 */}
        <div>
          <h3 className="text-white font-bold text-lg mb-2">AuraLens.</h3>
          <p className="text-xs text-slate-400">
            Công nghệ trong tầm mắt. Phong cách trong từng khoảnh khắc.
          </p>
        </div>

        {/* Cột 2 */}
        <div>
          <h4 className="text-white font-semibold mb-3">Khám phá AuraLens</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/shop" className="hover:text-white">Cửa hàng</Link></li>
            <li><Link to="/technology" className="hover:text-white">Công nghệ AuraLens</Link></li>
          </ul>
        </div>

        {/* Cột 3: KẾT NỐI VỚI CHÚNG TÔI */}
        <div>
          <h4 className="text-white font-semibold mb-3">Kết nối với chúng tôi</h4>
          <div className="space-y-2 text-xs">
            <p className="flex items-center gap-2 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              Hotline: <strong className="text-white">1900583667</strong>
            </p>
            <p className="flex items-start gap-2 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-blue-400 mt-0.5" />
              <span>Địa chỉ: <strong className="text-white">99 Hồ Đắc Di, Phường An Cựu, Tp Huế</strong></span>
            </p>
          </div>
        </div>
      </div>

     <div className="max-w-6xl mx-auto border-t border-slate-800 mt-8 pt-6 text-center text-xs text-slate-500">
        © 2026 AuraLens. All rights reserved.
      </div>
    </footer>
  );
}
