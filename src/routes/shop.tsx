import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/catalog-ui";
import { products, pageHead } from "@/lib/catalog";
export const Route = createFileRoute("/shop")({
  head: () =>
    pageHead(
      "Cửa hàng",
      "Khám phá tám thiết kế kính AuraLens Pro và Lite, chọn gọng tròn, vuông hoặc góc cạnh.",
    ),
  component: Shop,
});
function Shop() {
  const [line, setLine] = useState("Tất cả");
  const [shape, setShape] = useState("Tất cả kiểu gọng");
  const [search, setSearch] = useState("");
  const visible = products.filter(
    (p) =>
      (line === "Tất cả" || p.line === line) &&
      (shape === "Tất cả kiểu gọng" || p.shape === shape) &&
      p.name.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <main className="container-main page-body">
      <div className="eyebrow">BỘ SƯU TẬP AURALENS</div>
      <h1 className="page-title">Công nghệ mang phong cách của bạn.</h1>
      <p className="section-description">
        Pro: phần cứng toàn diện, gọng dày, giá dễ tiếp cận. Lite: gọng trong suốt, mảnh nhẹ, tinh
        tế.
      </p>
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="filters">
          {["Tất cả", "pro", "lite"].map((v) => (
            <Button key={v} variant={line === v ? "default" : "outline"} onClick={() => setLine(v)}>
              {v === "Tất cả" ? v : v === "pro" ? "AuraLens Pro" : "AuraLens Lite"}
            </Button>
          ))}
        </div>
        <label className="flex items-center gap-2 border rounded-md px-3 py-2">
          <Search size={16} />
          <input
            aria-label="Tìm kiếm kính"
            className="bg-transparent outline-none text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm chiếc kính của bạn"
          />
        </label>
      </div>
      <div className="flex justify-between items-center mb-6">
        <label className="text-xs">
          Kiểu gọng{" "}
          <select
            className="bg-background border rounded-md p-2 ml-2"
            value={shape}
            onChange={(e) => setShape(e.target.value)}
          >
            {["Tất cả kiểu gọng", "Tròn", "Vuông", "Góc cạnh"].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <span className="text-xs text-muted-foreground">{visible.length} thiết kế</span>
      </div>
      <div className="product-grid">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {visible.length === 0 && <p className="empty-state">Không tìm thấy kính phù hợp.</p>}
      <p className="text-[10px] text-muted-foreground mt-10">
        Hình ảnh thiết kế ý tưởng. Giá dự kiến, chưa phải thông số thương mại đã kiểm chứng.
      </p>
    </main>
  );
}
