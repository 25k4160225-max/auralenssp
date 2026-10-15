import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TechGrid } from "@/components/catalog-ui";
import { pageHead } from "@/lib/catalog";
import hero from "@/assets/hero_pro.jpg";
export const Route = createFileRoute("/technology")({
  head: () =>
    pageHead(
      "Công nghệ AuraLens",
      "Thấu kính tinh thể lỏng, lấy nét tự động, dịch thuật AR, GPS, LiDAR và AI trong kính AuraLens.",
    ),
  component: Technology,
});
function Technology() {
  return (
    <main>
      <section className="container-main page-body">
        <div className="eyebrow">CÔNG NGHỆ AURALENS</div>
        <h1 className="page-title">
          Một thế giới thông minh.
          <br />
          Ngay trong tầm mắt.
        </h1>
        <p className="section-description">
          Từ thấu kính tinh thể lỏng đến trí tuệ nhân tạo, khám phá cấu trúc ý tưởng của AuraLens.
        </p>
        <img
          src={hero}
          alt="Cấu trúc kính thông minh AuraLens Pro"
          className="w-full rounded-lg my-8 max-h-[450px] object-cover"
        />
        <TechGrid full />
        <div className="mt-10 border-t pt-7">
          <p className="section-description">
            AuraLens Pro ưu tiên phần cứng toàn diện với gọng dày. AuraLens Lite tập trung lấy nét,
            dịch thuật cơ bản và thiết kế thanh thoát. Các công nghệ được trình bày theo bản thiết
            kế ý tưởng, chưa phải cam kết hiệu năng đã kiểm chứng.
          </p>
          <Button className="mt-5" asChild>
            <Link to="/shop">
              Chọn kính AuraLens
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
