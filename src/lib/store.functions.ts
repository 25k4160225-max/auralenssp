import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { z } from 'zod';
import { products, lineInfo } from '@/lib/catalog';
export const placeOrder=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(z.object({items:z.array(z.object({productId:z.string(),prescription:z.number().min(-12).max(0),quantity:z.number().int().min(1).max(10)})).min(1).max(20),full_name:z.string().min(2).max(120),phone:z.string().regex(/^(\+84|0)[0-9]{9,10}$/),address:z.string().min(10).max(500),payment_method:z.literal('cod')})).handler(async({data,context})=>{
 const total=data.items.reduce((sum,item)=>{const product=products.find(p=>p.id===item.productId);if(!product)throw new Error('Sản phẩm không tồn tại.');return sum+lineInfo[product.line].price*item.quantity;},0);
 const {supabaseAdmin}=await import('@/integrations/supabase/client.server');
 const {data:order,error}=await supabaseAdmin.from('orders').insert({...data,items:data.items,total,user_id:context.userId}).select('id,status,total').single();
 if(error)throw new Error('Không thể lưu đơn hàng. Vui lòng thử lại.');
 return order;
});
