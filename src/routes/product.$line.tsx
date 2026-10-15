import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { ShoppingBag, Check, ShieldCheck, ZoomIn, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { products, lineInfo, money, pageHead, type Line } from "@/lib/catalog";
import { useStore } from "@/components/store-context";
export const Route = createFileRoute("/product/$line")({
  validateSearch: z.object({ variant: z.string().optional() }),
  head: ({ params }) =>
    pageHead(
      params.line === "pro"
        ? "AuraLens Pro – hiệu năng đa dụng"
        : "AuraLens Lite – thời trang tinh giản",
      "Tùy chỉnh kiểu gọng, màu sắc và độ cận cho chiếc kính thông minh AuraLens của bạn.",
    ),
  component: ProductPage,
});
function ProductPage() {
  const { line: raw } = Route.useParams();
  const { variant } = Route.useSearch();
  const line: Line = raw === "lite" ? "lite" : "pro";
  return <Configurator key={line + variant} line={line} initial={variant} />;
}
function Configurator({ line, initial }: { line: Line; initial?: string | undefined }) {
  const variants = products.filter((p) => p.line === line);
  const [selected, setSelected] = useState(variants.find((p) => p.id === initial) ?? variants[0]);
  const [myopia, setMyopia] = useState(false);
  const [prescription, setPrescription] = useState(-1);
  const [zoom, setZoom] = useState(false);
  const { add } = useStore();
  const info = lineInfo[line];
  if (!selected) return null;
  return (
    <main className="container-main page-body">
      <div className="breadcrumb">
        <Link to="/">Trang chủ</Link>
        <ChevronRight size={11} />
        <Link to="/shop">Cửa hàng</Link>
        <ChevronRight size={11} />
        {info.name}
      </div>
      <div className="config-grid">
        <div>
          <div className="relative">
            <img className="config-main-img" src={selected.image} alt={selected.name} />
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 bottom-4"
              aria-label="Phóng to sản phẩm"
              onClick={() => setZoom(true)}
            >
              <ZoomIn />
            </Button>
          </div>
          <div className="thumbnail-row">
            {variants.map((p) => (
              <Button
                key={p.id}
                variant="outline"
                aria-label={p.name}
                onClick={() => setSelected(p)}
              >
                <img src={p.image} alt={p.name} />
              </Button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-5">
            Hình minh họa thiết kế ý tưởng · Chọn ảnh để xem từng mẫu gọng.
          </p>
        </div>
        <div className="config-text">
          <div className="eyebrow">
            {line === "pro" ? "HIỆU NĂNG TOÀN DIỆN" : "THỜI TRANG TINH GIẢN"}
          </div>
          <h1>{info.name}</h1>
          <p className="text-sm font-medium">{info.subtitle}</p>
          <p className="config-description">{info.description}</p>
          <div className="config-price">
            {money(info.price)}
            <span className="text-[10px] font-normal text-muted-foreground ml-3">Giá dự kiến</span>
          </div>
          <div className="option-block">
            <h3>01. Kiểu gọng · {selected.shape}</h3>
            <div className="flex gap-2">
              {["Tròn", "Vuông", "Góc cạnh"].map((shape) => (
                <Button
                  key={shape}
                  variant={selected.shape === shape ? "default" : "outline"}
                  onClick={() => {
                    const next = variants.find((p) => p.shape === shape);
                    if (next) setSelected(next);
                  }}
                >
                  {shape === "Góc cạnh" ? "Tam giác / góc cạnh" : shape}
                </Button>
              ))}
            </div>
          </div>
          <div className="option-block">
            <h3>02. Chất liệu & màu sắc · {selected.color}</h3>
            <div className="flex gap-4">
              {variants.map((p) => (
                <Button
                  key={p.id}
                  title={p.color}
                  aria-label={`Chọn ${p.color}`}
                  className={`swatch swatch-${p.swatch} ${selected.id === p.id ? "selected" : ""}`}
                  onClick={() => setSelected(p)}
                  variant="ghost"
                />
              ))}
            </div>
          </div>
          <div className="option-block">
            <h3>03. Thông số thị lực</h3>
            <div className="flex gap-2">
              <Button variant={!myopia ? "default" : "outline"} onClick={() => setMyopia(false)}>
                Không cận{!myopia && <Check />}
              </Button>
              <Button variant={myopia ? "default" : "outline"} onClick={() => setMyopia(true)}>
                Có cận{myopia && <Check />}
              </Button>
            </div>
            {myopia && (
              <label className="form-field mt-4">
                Độ cận (Diop)
                <input
                  type="number"
                  aria-label="Độ cận"
                  min={-12}
                  max={0}
                  step={0.25}
                  value={prescription}
                  onChange={(e) =>
                    setPrescription(Math.min(0, Math.max(-12, Number(e.target.value))))
                  }
                />
                <input
                  type="range"
                  aria-label="Thanh trượt độ cận"
                  min={-12}
                  max={0}
                  step={0.25}
                  value={prescription}
                  onChange={(e) => setPrescription(Number(e.target.value))}
                />
                <span>Thông số lựa chọn: {prescription.toFixed(2)} D</span>
              </label>
            )}
          </div>
          <Button
            className="w-full h-12 mt-7"
            onClick={() =>
              add({
                id: crypto.randomUUID(),
                productId: selected.id,
                prescription: myopia ? prescription : 0,
                quantity: 1,
              })
            }
          >
            <ShoppingBag />
            Thêm vào giỏ hàng · {money(info.price)}
          </Button>
          <Button variant="link" className="w-full mt-2" asChild>
            <Link to="/cart">
              Xem giỏ hàng & đặt hàng
              <ChevronRight />
            </Link>
          </Button>
          <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground mt-5">
            <ShieldCheck size={14} />
            Tùy chỉnh theo nhu cầu · Tư vấn cùng Aura AI
          </div>
        </div>
      </div>
      <Dialog open={zoom} onOpenChange={setZoom}>
        <DialogContent className="max-w-3xl">
          <DialogTitle>{selected.name}</DialogTitle>
          <div className="zoom-view">
            <img className="w-full" src={selected.image} alt={selected.name} />
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
