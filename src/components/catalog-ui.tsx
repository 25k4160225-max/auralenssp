import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ScanEye,
  Languages,
  Navigation,
  Cpu,
  Eye,
  ShieldCheck,
  Radio,
  Mic,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, lineInfo, money, type Line, type Product } from "@/lib/catalog";
export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/product/$line"
      params={{ line: product.line }}
      search={{ variant: product.id }}
      className="product-card"
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="line-tag">{lineInfo[product.line].name}</span>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>
          {product.shape} · {product.line === "pro" ? "Hiệu năng đa dụng" : "Mảnh nhẹ, tinh tế"}
        </p>
        <div className="flex justify-between items-center mt-3">
          <b>{money(lineInfo[product.line].price)}</b>
          <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}
export function LineCard({ line }: { line: Line }) {
  const info = lineInfo[line];
  const product = products.find((p) => p.line === line);
  return (
    <article className="line-card">
      <div className="line-image">
        <img src={product?.image} alt={info.name} />
        <span className="line-tag">
          {line === "pro" ? "HIỆU NĂNG TOÀN DIỆN" : "THỜI TRANG TINH GIẢN"}
        </span>
      </div>
      <div className="line-info">
        <div className="flex items-center justify-between">
          <h3>{info.name}</h3>
          <span className="text-[10px] text-primary">
            {line === "pro" ? "PRO SERIES" : "LITE SERIES"}
          </span>
        </div>
        <p>{info.description}</p>
        <div className="line-features">
          {line === "pro" ? (
            <>
              <span>
                <Cpu size={13} />
                LiDAR & AI
              </span>
              <span>
                <Navigation size={13} />
                Dẫn đường AR
              </span>
              <span>
                <Mic size={13} />
                Ghi âm
              </span>
            </>
          ) : (
            <>
              <span>
                <Eye size={13} />
                Gọng trong suốt
              </span>
              <span>
                <ScanEye size={13} />
                Lấy nét thông minh
              </span>
              <span>
                <Languages size={13} />
                Dịch thuật cơ bản
              </span>
            </>
          )}
        </div>
        <div className="line-footer">
          <div>
            <small>Giá dự kiến từ</small>
            <b>{money(info.price)}</b>
          </div>
          <Button variant="outline" asChild>
            <Link to="/product/$line" params={{ line }} search={{ variant: undefined }}>
              Khám phá {line === "pro" ? "Pro" : "Lite"}
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
export const technologies = [
  {
    Icon: ScanEye,
    title: "Tự động lấy nét",
    text: "Thấu kính tinh thể lỏng điều chỉnh tiêu cự theo hướng nhìn, hỗ trợ tầm nhìn linh hoạt.",
  },
  {
    Icon: Languages,
    title: "Dịch thuật AR",
    text: "Hỗ trợ dịch văn bản và hội thoại, đưa thông tin ngôn ngữ vào ngay trong tầm mắt.",
  },
  {
    Icon: Navigation,
    title: "Dẫn đường thông minh",
    text: "Định hướng GPS và LiDAR trên dòng Pro, hỗ trợ nhận biết môi trường xung quanh.",
  },
  {
    Icon: ShieldCheck,
    title: "Bảo vệ đôi mắt",
    text: "Điều chỉnh độ sáng và màu ấm của tròng kính, hướng đến trải nghiệm nhìn dễ chịu.",
  },
  {
    Icon: Cpu,
    title: "AI & trải nghiệm VR",
    text: "Mô-đun AI xử lý thông tin thị giác, nền tảng cho những trải nghiệm thực tế mở rộng.",
  },
  {
    Icon: Radio,
    title: "Kết nối IoT",
    text: "Bluetooth và Wi-Fi kết nối kính với điện thoại và hệ sinh thái thiết bị.",
  },
  {
    Icon: Mic,
    title: "Ghi âm đa hướng",
    text: "Micro trên dòng Pro hỗ trợ ghi lại hội thoại khi có sự đồng ý của người tham gia.",
  },
  {
    Icon: Eye,
    title: "Eye-tracking",
    text: "Cảm biến theo dõi hướng nhìn phối hợp với thấu kính lấy nét thông minh.",
  },
];
export function TechGrid({ full = false }: { full?: boolean }) {
  return (
    <div className="tech-grid">
      {technologies.slice(0, full ? 8 : 4).map(({ Icon, title, text }) => (
        <div key={title} className="tech-item">
          <Icon />
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
}
