import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { pageHead } from "@/lib/catalog";
import { useStore } from "@/components/store-context";
import { toast } from "sonner";
export const Route = createFileRoute("/reviews")({
  head: () =>
    pageHead(
      "Đánh giá & Review",
      "Đánh giá từ khách hàng AuraLens và chia sẻ trải nghiệm sau khi nhận kính.",
    ),
  component: Reviews,
});
function Reviews() {
  const { user } = useStore();
  const [reviews, setReviews] = useState<Database["public"]["Tables"]["reviews"]["Row"][]>([]);
  const [orders, setOrders] = useState<Database["public"]["Tables"]["orders"]["Row"][]>([]);
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const load = () =>
    supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setError("Không thể tải đánh giá.");
        else setReviews(data ?? []);
      });
  useEffect(() => {
    load();
  }, []);
  useEffect(() => {
    if (!user) return;
    supabase
      .from("orders")
      .select("*")
      .eq("status", "delivered")
      .eq("user_id", user.id)
      .then(({ data }) => setOrders(data ?? []));
  }, [user]);
  return (
    <main className="container-main page-body">
      <div className="eyebrow">TRẢI NGHIỆM THỰC TẾ</div>
      <h1 className="page-title">Góc nhìn từ khách hàng.</h1>
      <p className="section-description">Chỉ khách hàng có đơn đã giao mới có thể gửi đánh giá.</p>
      {error ? (
        <p className="text-destructive mt-8">{error}</p>
      ) : reviews.length ? (
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {reviews.map((r) => (
            <article key={r.id} className="border rounded-lg p-6">
              <div className="flex text-primary">
                {Array.from({ length: r.rating }, (_, i) => (
                  <Star key={i} size={15} fill="currentColor" />
                ))}
              </div>
              <p className="text-xs leading-7 my-5">{r.content}</p>
              <b className="text-xs">{r.display_name}</b>
              <p className="text-[10px] text-muted-foreground mt-2">
                Đã mua hàng · AuraLens {r.product_line}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <MessageSquare />
          <h2>Chờ những trải nghiệm đầu tiên.</h2>
          <p className="text-muted-foreground text-xs">
            Chưa có đánh giá được gửi. Không sử dụng đánh giá giả.
          </p>
        </div>
      )}
      {user && orders.length ? (
        <form
          className="max-w-lg border-t pt-6"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!user) return;
            const f = new FormData(e.currentTarget);
            const { error } = await supabase
              .from("reviews")
              .insert({
                user_id: user.id,
                order_id: String(f.get("order")),
                product_line: String(f.get("line")),
                rating,
                content: String(f.get("content")),
                display_name: String(f.get("name")) || "Khách hàng AuraLens",
              });
            if (error) toast.error("Không thể gửi đánh giá.");
            else {
              toast.success("Đã gửi đánh giá.");
              load();
            }
          }}
        >
          <h2 className="font-semibold mb-5">Chia sẻ trải nghiệm của bạn</h2>
          <label className="form-field">
            Đơn hàng
            <select name="order">
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  #{o.id.slice(0, 8)}
                </option>
              ))}
            </select>
          </label>
          <label className="form-field">
            Dòng kính
            <select name="line">
              <option>Pro</option>
              <option>Lite</option>
            </select>
          </label>
          <label className="form-field">
            Tên hiển thị
            <input name="name" />
          </label>
          <div className="flex mb-5">
            {[1, 2, 3, 4, 5].map((n) => (
              <Button
                key={n}
                variant="ghost"
                size="icon"
                aria-label={`${n} sao`}
                onClick={() => setRating(n)}
              >
                <Star
                  className={n <= rating ? "text-primary" : "text-muted-foreground"}
                  fill={n <= rating ? "currentColor" : "none"}
                />
              </Button>
            ))}
          </div>
          <label className="form-field">
            Đánh giá
            <textarea required minLength={5} name="content" />
          </label>
          <Button type="submit">Gửi đánh giá</Button>
        </form>
      ) : !user ? (
        <Button asChild variant="outline">
          <Link to="/account">Đăng nhập để đánh giá</Link>
        </Button>
      ) : null}
    </main>
  );
}
