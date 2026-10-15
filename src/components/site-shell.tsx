import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import {
  Glasses,
  ShoppingBag,
  User,
  Search,
  Menu,
  X,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/components/store-context";
const nav = [
  { to: "/" as const, label: "Trang chủ" },
  { to: "/shop" as const, label: "Cửa hàng" },
  { to: "/technology" as const, label: "Công nghệ AuraLens" },
  { to: "/reviews" as const, label: "Đánh giá & Review" },
  { to: "/tracking" as const, label: "Theo dõi đơn hàng" },
];
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { cart } = useStore();
  const path = useLocation().pathname;
  return (
    <>
      <div className="announcement">
        <Glasses size={13} /> Một tầm nhìn mới. Một thế giới không giới hạn.{" "}
        <ChevronRight size={12} />
      </div>
      <header className="site-header">
        <div className="container-main header-inner">
          <Link to="/" className="brand">
            <span className="brand-symbol">
              <Glasses size={30} />
            </span>
            AuraLens<span className="text-primary">.</span>
          </Link>
          <nav className="desktop-nav">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className={path === n.to ? "active" : ""}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Button
              variant="ghost"
              size="icon"
              className="search-button"
              title="Tìm sản phẩm"
              asChild
            >
              <Link to="/shop">
                <Search size={18} />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" title="Tài khoản" asChild>
              <Link to="/account">
                <User size={18} />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative" title="Giỏ hàng" asChild>
              <Link to="/cart">
                <ShoppingBag size={18} />
                {cart.length > 0 && (
                  <span className="cart-badge">{cart.reduce((s, i) => s + i.quantity, 0)}</span>
                )}
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="mobile-menu"
              aria-label="Mở menu"
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {open && (
          <nav className="mobile-nav">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container-main">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand">
              <Glasses className="text-primary" />
              AuraLens.
            </Link>
            <p>
              Công nghệ trong tầm mắt.
              <br />
              Phong cách trong từng khoảnh khắc.
            </p>
          </div>
          <div>
            <h3>Khám phá AuraLens</h3>
            <Link to="/shop">
              Cửa hàng <ArrowUpRight size={10} className="inline" />
            </Link>
            <Link to="/technology">Công nghệ AuraLens</Link>
            <Link to="/gallery">Bộ sưu tập</Link>
          </div>
          <div>
            <h3>Chăm sóc khách hàng</h3>
            <Link to="/tracking">Theo dõi đơn hàng</Link>
            <Link to="/policies">Vận chuyển & đổi trả</Link>
            <Link to="/account">Tài khoản của bạn</Link>
          </div>
          <div>
            <h3>Kết nối với chúng tôi</h3>
            <p>Tư vấn trực tuyến cùng Aura AI</p>
            <Link to="/support">Liên hệ & hỗ trợ</Link>
            <p>Thông tin liên hệ đang cập nhật</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 AuraLens. All rights reserved.</span>
          <span>Hình ảnh minh họa thiết kế ý tưởng · Giá dự kiến</span>
        </div>
      </div>
    </footer>
  );
}
