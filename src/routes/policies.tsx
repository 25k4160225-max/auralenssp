import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/catalog";
export const Route = createFileRoute("/policies")({
  head: () =>
    pageHead("Vận chuyển & đổi trả", "Thông tin vận chuyển, đổi trả và thanh toán của AuraLens."),
  component: Policies,
});
function Policies() {
  return (
    <main className="container-main page-body">
      <div className="eyebrow">AN TÂM CÙNG AURALENS</div>
      <h1 className="page-title">Vận chuyển & đổi trả.</h1>
      <div className="max-w-2xl space-y-8 mt-8 text-sm leading-8">
        <section>
          <h2 className="font-semibold">Vận chuyển</h2>
          <p className="text-muted-foreground">
            Website đang trong giai đoạn thử nghiệm. Phí và thời gian giao hàng hiện là minh họa, sẽ
            được xác nhận trước khi giao thực tế.
          </p>
        </section>
        <section>
          <h2 className="font-semibold">Đổi trả & bảo hành</h2>
          <p className="text-muted-foreground">
            Chính sách chính thức đang được hoàn thiện. Hãy liên hệ tư vấn trước khi đặt kính theo
            độ cận riêng.
          </p>
        </section>
        <section>
          <h2 className="font-semibold">Thanh toán</h2>
          <p className="text-muted-foreground">
            Hiện có thể ghi nhận đơn COD chờ xác nhận. Visa, Mastercard, ATM, VNPay và MoMo chưa kết
            nối; website không thu tiền trực tuyến.
          </p>
        </section>
        <section>
          <h2 className="font-semibold">Hình ảnh & thông số</h2>
          <p className="text-muted-foreground">
            Ảnh sản phẩm và người mẫu là hình minh họa dựa trên bản thiết kế. Giá dự kiến và thông
            số ý tưởng cần được thương hiệu xác nhận trước khi bán chính thức.
          </p>
        </section>
      </div>
    </main>
  );
}
