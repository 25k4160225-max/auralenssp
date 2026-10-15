import { createFileRoute } from "@tanstack/react-router";
import { products, pageHead } from "@/lib/catalog";
import { ProductCard } from "@/components/catalog-ui";
import modelPro from "@/assets/model_pro.jpg";
import modelLite from "@/assets/model_lite.jpg";
export const Route = createFileRoute("/gallery")({
  head: () =>
    pageHead(
      "Bộ sưu tập hình ảnh",
      "Tám mẫu kính Pro và Lite cùng hình ảnh người mẫu đeo kính AuraLens.",
    ),
  component: Gallery,
});
function Gallery() {
  return (
    <main className="container-main page-body">
      <div className="eyebrow">GALLERY</div>
      <h1 className="page-title">AuraLens qua từng góc nhìn.</h1>
      <div className="product-grid mt-8">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div className="lifestyle-grid mt-10">
        <img className="w-full" src={modelPro} alt="Người mẫu nam đeo Pro" />
        <img className="w-full" src={modelLite} alt="Người mẫu nữ đeo Lite" />
      </div>
    </main>
  );
}
