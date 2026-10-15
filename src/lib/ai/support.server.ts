import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  convertToModelMessages,
  type UIMessage,
} from "ai";
import { createResponsesCall } from "./responses.server.ts";
import { withLovableAiGatewayRunIdHeader } from "./run-id.ts";
export const discountReply =
  "Những sinh viên K59 HUE đăng nhập bằng email của trường sẽ được mã giám giá 15%";
export async function handleSupport(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return Response.json({ error: "Yêu cầu không hợp lệ." }, { status: 403 });
  let messages: UIMessage[];
  try {
    const body = await request.json();
    if (!Array.isArray(body.messages) || body.messages.length > 40) throw new Error();
    messages = body.messages.filter((m: UIMessage) => m.role === "user" || m.role === "assistant");
    if (messages.some((m) => !Array.isArray(m.parts))) throw new Error();
  } catch {
    return Response.json({ error: "Nội dung trò chuyện không hợp lệ." }, { status: 400 });
  }
  const last = messages.at(-1);
  const text =
    last?.parts
      .filter((p) => p.type === "text")
      .map((p) => p.text)
      .join(" ") ?? "";
  if (!text || text.length > 2000)
    return Response.json({ error: "Vui lòng nhập câu hỏi dưới 2.000 ký tự." }, { status: 400 });
  const normalized = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  if (/giam gia|khuyen mai|uu dai|voucher|coupon|discount|ma giam|sinh vien|k59/.test(normalized))
    return createUIMessageStreamResponse({
      stream: createUIMessageStream({
        originalMessages: messages,
        execute: ({ writer }) => {
          writer.write({ type: "text-start", id: "discount" });
          writer.write({ type: "text-delta", id: "discount", delta: discountReply });
          writer.write({ type: "text-end", id: "discount" });
        },
      }),
    });
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) return Response.json({ error: "Tư vấn AI chưa được cấu hình." }, { status: 503 });
  const { result, gateway } = createResponsesCall(
    request,
    { baseURL: "https://ai.gateway.lovable.dev/v1", apiKey: key, model: "openai/gpt-6-astra" },
    await convertToModelMessages(messages),
    `Bạn là Aura AI, tư vấn kính AuraLens bằng tiếng Việt ngắn gọn, thân thiện. Dữ liệu: AuraLens Pro gọng dày mạnh mẽ, LiDAR, GPS AR, lấy nét tinh thể lỏng, dịch thuật, ghi âm có sự đồng ý; giá dự kiến 2.990.000đ. Lite gọng mảnh trong suốt thời trang vi mạch ẩn, lấy nét và dịch thuật cơ bản, giá dự kiến 4.490.000đ. Có 8 mẫu tròn vuông góc cạnh, mạ vàng bạc. Độ cận -12 đến 0 D bước .25. Đây là thiết kế ý tưởng, không bịa thông số đã kiểm chứng. Tài khoản Google hoặc email. COD lưu đơn chờ xác nhận chưa thu tiền; Visa/ATM/VNPay/MoMo chưa kết nối. Giá phí 0đ và 3-5 ngày chỉ minh họa. Chưa có hotline hay chính sách đổi trả chính thức. Không chẩn đoán mắt. Nếu hỏi mã giảm giá hoặc khuyến mãi, chỉ trả lời nguyên văn: ${discountReply}. Không xác nhận bất kỳ mã nào khi chưa kiểm tra email trường, niên khóa K59. Không yêu cầu dữ liệu nhạy cảm.`,
  );
  return withLovableAiGatewayRunIdHeader(
    result.toUIMessageStreamResponse({
      originalMessages: messages,
      sendReasoning: true,
      onError: (error) => {
        if (error instanceof Error && "responseBody" in error) {
          try {
            const parsed = JSON.parse(String(error.responseBody));
            return parsed.message ?? parsed.error?.message ?? error.message;
          } catch {
            return error.message;
          }
        }
        return error instanceof Error ? error.message : "Không thể kết nối tư vấn AI.";
      },
    }),
    gateway,
  );
}
