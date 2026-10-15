import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { CartItem } from "@/lib/catalog";
import { toast } from "sonner";
type Store = {
  user: User | null;
  cart: CartItem[];
  add: (item: CartItem) => void;
  update: (id: string, quantity: number) => void;
  clear: () => void;
};
const Context = createContext<Store | null>(null);
export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data }) => {
      if (active) setUser(data.user);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (["SIGNED_IN", "SIGNED_OUT", "USER_UPDATED", "INITIAL_SESSION"].includes(event))
        setUser(session?.user ?? null);
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);
  useEffect(() => {
    let active = true;
    setReady(false);
    if (!user) {
      setReady(true);
      return;
    }
    supabase
      .from("carts")
      .select("items")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active) return;
        if (error) toast.error("Chưa thể tải giỏ hàng đã lưu.");
        if (data && Array.isArray(data.items)) {
          setCart(data.items as unknown as CartItem[]);
        }
        setReady(true);
      });
    return () => {
      active = false;
    };
  }, [user]);
  useEffect(() => {
    if (!user || !ready) return;
    const timer = setTimeout(() => {
      supabase
        .from("carts")
        .upsert({
          user_id: user.id,
          items: JSON.parse(JSON.stringify(cart)),
          updated_at: new Date().toISOString(),
        })
        .then(({ error }) => {
          if (error) toast.error("Không thể lưu giỏ hàng.");
        });
    }, 350);
    return () => clearTimeout(timer);
  }, [cart, user, ready]);
  const add = (item: CartItem) => {
    setCart((prev) => {
      const exists = prev.find(
        (p) => p.productId === item.productId && p.prescription === item.prescription,
      );
      return exists
        ? prev.map((p) =>
            p.id === exists.id ? { ...p, quantity: Math.min(10, p.quantity + item.quantity) } : p,
          )
        : [...prev, item];
    });
    toast.success("Đã thêm kính vào giỏ hàng");
  };
  return (
    <Context.Provider
      value={{
        user,
        cart,
        add,
        update: (id, quantity) =>
          setCart((prev) =>
            quantity <= 0
              ? prev.filter((p) => p.id !== id)
              : prev.map((p) => (p.id === id ? { ...p, quantity: Math.min(10, quantity) } : p)),
          ),
        clear: () => setCart([]),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useStore() {
  const value = useContext(Context);
  if (!value) throw new Error("Store unavailable");
  return value;
}
