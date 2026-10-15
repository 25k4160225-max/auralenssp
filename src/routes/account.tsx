import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, Glasses } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useStore } from "@/components/store-context";
import { pageHead } from "@/lib/catalog";
import { toast } from "sonner";
export const Route = createFileRoute("/account")({
  head: () =>
    pageHead(
      "Tài khoản của bạn",
      "Đăng nhập Google hoặc email và quản lý hồ sơ, địa chỉ giao hàng, độ cận của bạn tại AuraLens.",
    ),
  component: Account,
});
function Account() {
  const { user } = useStore();
  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
  const [busy, setBusy] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    address: "",
    birthday: "",
    prescription: 0,
  });
  const [recovery, setRecovery] = useState(false);
  useEffect(() => {
    if (window.location.hash.includes("type=recovery")) setRecovery(true);
  }, []);
  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) toast.error("Không thể tải hồ sơ.");
        if (data)
          setProfile({
            full_name: data.full_name,
            phone: data.phone,
            address: data.address,
            birthday: data.birthday ?? "",
            prescription: data.prescription,
          });
      });
  }, [user]);
  async function auth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email"));
    const password = String(f.get("password"));
    setBusy(true);
    try {
      const { error } =
        mode === "signup"
          ? await supabase.auth.signUp({
              email,
              password,
              options: { emailRedirectTo: window.location.origin + "/account" },
            })
          : mode === "reset"
            ? await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + "/account",
              })
            : await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success(
        mode === "signup"
          ? "Kiểm tra email để xác nhận tài khoản."
          : mode === "reset"
            ? "Kiểm tra email để đặt lại mật khẩu."
            : "Đăng nhập thành công.",
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể đăng nhập.");
    } finally {
      setBusy(false);
    }
  }
  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ ...profile, birthday: profile.birthday || null, id: user.id });
    setBusy(false);
    if (error) toast.error("Không thể lưu hồ sơ.");
    else toast.success("Đã lưu hồ sơ của bạn.");
  }
  return (
    <main className="container-main page-body">
      <div className="auth-panel">
        {user ? (
          <>
            <div className="eyebrow">TÀI KHOẢN AURALENS</div>
            <h1 className="page-title">
              Xin chào{profile.full_name ? `, ${profile.full_name}` : ""}.
            </h1>
            <p className="text-xs text-muted-foreground mb-7 break-all">{user.email}</p>
            {recovery && (
              <form
                className="mb-6"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const password = String(new FormData(e.currentTarget).get("newPassword"));
                  const { error } = await supabase.auth.updateUser({ password });
                  if (error) toast.error(error.message);
                  else {
                    setRecovery(false);
                    toast.success("Đã cập nhật mật khẩu.");
                  }
                }}
              >
                <label className="form-field">
                  Mật khẩu mới
                  <input name="newPassword" type="password" minLength={8} required />
                </label>
                <Button type="submit">Lưu mật khẩu mới</Button>
              </form>
            )}
            <form onSubmit={save}>
              <label className="form-field">
                Họ và tên
                <input
                  value={profile.full_name}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  autoComplete="name"
                />
              </label>
              <div className="two-cols">
                <label className="form-field">
                  Số điện thoại
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </label>
                <label className="form-field">
                  Ngày sinh
                  <input
                    type="date"
                    value={profile.birthday}
                    onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
                  />
                </label>
              </div>
              <label className="form-field">
                Địa chỉ nhận hàng mặc định
                <textarea
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                />
              </label>
              <label className="form-field">
                Độ cận gần nhất (D)
                <input
                  type="number"
                  step={0.25}
                  min={-12}
                  max={0}
                  value={profile.prescription}
                  onChange={(e) => setProfile({ ...profile, prescription: Number(e.target.value) })}
                />
              </label>
              <Button type="submit" disabled={busy} className="w-full">
                {busy ? "Đang lưu…" : "Lưu hồ sơ"}
              </Button>
            </form>
            <Button
              className="mt-5"
              variant="ghost"
              onClick={async () => {
                const { error } = await supabase.auth.signOut();
                if (error) toast.error(error.message);
              }}
            >
              <LogOut />
              Đăng xuất
            </Button>
          </>
        ) : (
          <>
            <Glasses className="text-primary size-9 mb-6" />
            <div className="eyebrow">CHÀO MỪNG ĐẾN AURALENS</div>
            <h1 className="page-title">
              {mode === "signup"
                ? "Tạo tài khoản."
                : mode === "reset"
                  ? "Quên mật khẩu?"
                  : "Một tầm nhìn mới."}
            </h1>
            <p className="section-description mb-6">
              Lưu chiếc kính yêu thích và theo dõi hành trình đơn hàng.
            </p>
            <Button
              variant="outline"
              className="w-full h-11 mb-6"
              onClick={async () => {
                const result = await lovable.auth.signInWithOAuth("google", {
                  redirect_uri: window.location.origin + "/account",
                });
                if (result.error) toast.error(result.error.message);
              }}
            >
              <span className="font-bold text-lg">G</span>Tiếp tục với Google
            </Button>
            <div className="text-center text-[10px] text-muted-foreground mb-5">
              HOẶC SỬ DỤNG EMAIL
            </div>
            <form onSubmit={auth}>
              <label className="form-field">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="ban@example.com"
                />
              </label>
              {mode !== "reset" && (
                <label className="form-field">
                  Mật khẩu
                  <input
                    required
                    type="password"
                    minLength={8}
                    name="password"
                    autoComplete={mode === "signup" ? "new-password" : "current-password"}
                    placeholder="Ít nhất 8 ký tự"
                  />
                </label>
              )}
              <Button className="w-full h-11" type="submit" disabled={busy}>
                {busy
                  ? "Đang xử lý…"
                  : mode === "signup"
                    ? "Đăng ký"
                    : mode === "reset"
                      ? "Gửi email đặt lại mật khẩu"
                      : "Đăng nhập"}
              </Button>
            </form>
            <div className="flex justify-between mt-4">
              <Button
                variant="link"
                onClick={() => setMode(mode === "signup" ? "login" : "signup")}
              >
                {mode === "signup" ? "Đã có tài khoản?" : "Tạo tài khoản"}
              </Button>
              <Button variant="link" onClick={() => setMode(mode === "reset" ? "login" : "reset")}>
                {mode === "reset" ? "Quay lại đăng nhập" : "Quên mật khẩu?"}
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-5">
              Facebook và đăng nhập SMS chưa được hỗ trợ trong phiên bản này.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
