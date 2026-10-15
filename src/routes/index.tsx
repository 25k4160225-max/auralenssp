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
} from "lucide-react";
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
    </>
  );
}
