import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Package, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useStore } from "@/components/store-context";
import { Button } from "@/components/ui/button";
import { pageHead, money } from "@/lib/catalog";
export const Route = createFileRoute("/tracking")({
  head: () =>
    pageHead(
      "Theo dõi đơn hàng",
      "Xem trạng thái và lịch sử đơn hàng kính thông minh AuraLens trong tài khoản của bạn.",
    ),
  component: Tracking,
});
function Tracking() {
  const { user } = useStore();
  const [orders, setOrders] = useState<Database["public"]["Tables"]["orders"]["Row"][]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setError("Không thể tải đơn hàng.");
        else setOrders(data ?? []);
        setLoading(false);
      });
  }, [user]);
  return (
    <main className="container-main page-body">
      <div className="eyebrow">HÀNH TRÌNH CHIẾC KÍNH CỦA BẠN</div>
      <h1 className="page-title">Theo dõi đơn hàng.</h1>
      {!user ? (
        <div className="empty-state">
          <Package />
          <h2>Đăng nhập để xem đơn hàng của bạn.</h2>
          <Button asChild>
            <Link to="/account">Đăng nhập</Link>
          </Button>
        </div>
      ) : (
        <>
          <label className="form-field max-w-md mt-6">
            Tìm theo mã đơn
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nhập mã đơn hàng"
            />
          </label>
          {loading ? (
            <p>Đang tải đơn hàng…</p>
          ) : error ? (
            <p className="text-destructive">{error}</p>
          ) : !orders.length ? (
            <div className="empty-state">
              <Package />
              <h2>Bạn chưa có đơn hàng.</h2>
              <Button asChild>
                <Link to="/shop">Khám phá kính AuraLens</Link>
              </Button>
            </div>
          ) : (
            orders
              .filter((o) => o.id.toLowerCase().includes(search.toLowerCase()))
              .map((o) => (
                <article key={o.id} className="border-b py-7">
                  <div className="flex flex-wrap justify-between gap-3">
                    <h2 className="font-semibold">Đơn #{o.id.slice(0, 8).toUpperCase()}</h2>
                    <b>{money(o.total)}</b>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    {new Date(o.created_at).toLocaleDateString("vi-VN")} ·{" "}
                    {o.payment_method.toUpperCase()} ·{" "}
                    {o.status === "pending"
                      ? "Chờ xác nhận"
                      : o.status === "delivered"
                        ? "Đã giao hàng"
                        : o.status === "shipped"
                          ? "Đang vận chuyển"
                          : "Đang xử lý"}
                  </p>
                  <div className="flex gap-4 items-center text-[10px] mt-5 flex-wrap">
                    <CheckCircle2 size={15} className="text-primary" />
                    <span>Đã ghi nhận</span>
                    <span className="text-muted-foreground">
                      ──── Chờ xác nhận ──── Vận chuyển ──── Giao hàng
                    </span>
                  </div>
                  <p className="text-xs mt-5">
                    {o.full_name} · {o.address}
                  </p>
                </article>
              ))
          )}
        </>
      )}
    </main>
  );
}
