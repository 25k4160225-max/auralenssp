import pro0 from '@/assets/pro_0.jpg'; import pro1 from '@/assets/pro_1.jpg'; import pro2 from '@/assets/pro_2.jpg'; import pro3 from '@/assets/pro_3.jpg';
import lite0 from '@/assets/lite_0.jpg'; import lite1 from '@/assets/lite_1.jpg'; import lite2 from '@/assets/lite_2.jpg'; import lite3 from '@/assets/lite_3.jpg';
export type Line = 'pro' | 'lite';
export const lineInfo = {
 pro: {name:'AuraLens Pro',subtitle:'Công nghệ toàn diện. Giá dễ tiếp cận.',description:'Gọng dày, mạnh mẽ với phần cứng đa dụng: LiDAR, dẫn đường AR, dịch thuật và ghi âm. Ưu tiên hiệu năng với mức giá dễ tiếp cận hơn.',price:2990000},
 lite: {name:'AuraLens Lite',subtitle:'Tinh giản công nghệ. Nâng tầm phong cách.',description:'Gọng mảnh trong suốt, vi mạch ẩn tinh tế. Lấy nét thông minh và hỗ trợ dịch thuật cơ bản trong thiết kế thời trang nhẹ nhàng, thanh thoát.',price:4490000}
};
export const products = [
 {id:'pro-black',line:'pro' as Line,name:'Pro Square · Đen công nghệ',shape:'Vuông',color:'Đen',swatch:'black',image:pro0},
 {id:'pro-round',line:'pro' as Line,name:'Pro Round · Xám graphite',shape:'Tròn',color:'Graphite',swatch:'gray',image:pro1},
 {id:'pro-gold',line:'pro' as Line,name:'Pro Square · Mạ vàng',shape:'Vuông',color:'Mạ vàng',swatch:'gold',image:pro2},
 {id:'pro-silver',line:'pro' as Line,name:'Pro Angular · Mạ bạc',shape:'Góc cạnh',color:'Mạ bạc',swatch:'gray',image:pro3},
 {id:'lite-clear',line:'lite' as Line,name:'Lite Round · Trong suốt',shape:'Tròn',color:'Trong suốt',swatch:'clear',image:lite0},
 {id:'lite-gold',line:'lite' as Line,name:'Lite Square · Champagne',shape:'Vuông',color:'Mạ vàng',swatch:'gold',image:lite1},
 {id:'lite-silver',line:'lite' as Line,name:'Lite Oval · Mạ bạc',shape:'Tròn',color:'Mạ bạc',swatch:'gray',image:lite2},
 {id:'lite-rose',line:'lite' as Line,name:'Lite Cat-eye · Hồng pha lê',shape:'Góc cạnh',color:'Hồng pha lê',swatch:'rose',image:lite3},
];
export type Product = typeof products[number];
export type CartItem = {id:string;productId:string;prescription:number;quantity:number};
export const money=(n:number)=>new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(n);
export const pageHead=(title:string,description:string)=>({meta:[{title:`${title} | AuraLens`},{name:'description',content:description},{property:'og:title',content:`${title} | AuraLens`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]});
