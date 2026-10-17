import { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Glasses, MessageCircle, X, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";

const transport = new DefaultChatTransport({ api: "/api/support" });

export function SupportChat() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        className="chat-launcher"
        aria-label="Trò chuyện với Aura AI"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <MessageCircle />}
      </Button>
      {open && <ChatPanel close={() => setOpen(false)} />}
    </>
  );
}

function ChatPanel({ close }: { close: () => void }) {
  // Lấy thêm hàm setMessages để can thiệp trực tiếp vào luồng chat
  const { messages, setMessages, sendMessage, status, error, stop } = useChat({ transport });
  const [text, setText] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (!busy) ref.current?.focus();
  }, [busy]);

  return (
    <section className="chat-panel" aria-label="Aura AI">
      <div className="chat-head">
        <div className="flex gap-3 items-center">
          <Glasses size={25} />
          <div>
            <b>Aura AI</b>
            <small>Tư vấn kính thông minh · Trực tuyến</small>
          </div>
        </div>
        <Button variant="ghost" size="icon" aria-label="Đóng trò chuyện" onClick={close}>
          <X />
        </Button>
      </div>
      <Conversation>
        <ConversationContent className="p-4 gap-5">
          <Message from="assistant">
            <MessageContent>
              <MessageResponse>
                Xin chào! Mình là Aura AI. Bạn thích hiệu năng toàn diện của Pro hay phong cách mảnh
                nhẹ của Lite?
              </MessageResponse>
            </MessageContent>
          </Message>
          {!messages.length && (
            <div className="flex flex-wrap gap-2">
              {["Pro và Lite khác nhau thế nào?", "Làm sao để có mã giảm giá?"].map((t) => (
                <Button
                  key={t}
                  variant="outline"
                  size="sm"
                  className="text-[10px] whitespace-normal h-auto py-2"
                  onClick={() => {
                    // Xử lý nút bấm gợi ý cũng áp dụng logic check từ khóa
                    const userText = t.toLowerCase();
                    if (userText.includes("mã giảm giá") || userText.includes("khuyến mãi")) {
                      const newUserMsg = { id: Date.now().toString(), role: "user" as const, content: t, parts: [{ type: "text", text: t }] };
                      const newBotMsg = { id: (Date.now() + 1).toString(), role: "assistant" as const, content: "Những sinh viên K59 HUE đăng nhập bằng email của trường sẽ được mã giám giá 15%", parts: [{ type: "text", text: "Những sinh viên K59 HUE đăng nhập bằng email của trường sẽ được mã giám giá 15%" }] };
                      setMessages([...messages, newUserMsg, newBotMsg]);
                    } else {
                      sendMessage({ text: t });
                    }
                  }}
                >
                  {t}
                </Button>
              ))}
            </div>
          )}
          {messages.map((m) => (
            <Message key={m.id} from={m.role}>
              <MessageContent>
                {/* Fallback rendering trong trường hợp parts không tồn tại (do tự chèn frontend) */}
                {m.parts ? m.parts.map((part, i) =>
                  part.type === "text" ? (
                    <MessageResponse key={i}>{part.text}</MessageResponse>
                  ) : part.type === "reasoning" ? (
                    <details key={i} className="text-[10px] text-muted-foreground">
                      <summary>Đang phân tích</summary>
                      <MessageResponse>{part.text}</MessageResponse>
                    </details>
                  ) : null,
                ) : (
                  <MessageResponse>{m.content}</MessageResponse>
                )}
              </MessageContent>
            </Message>
          ))}
          {status === "submitted" && (
            <Message from="assistant">
              <MessageContent>
                <Shimmer>Aura đang tìm câu trả lời…</Shimmer>
              </MessageContent>
            </Message>
          )}
          {error && <p className="text-destructive text-xs leading-6">{error.message}</p>}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <div className="chat-composer">
        <PromptInput
          onSubmit={({ text: submitted }) => {
            if (!submitted.trim() || busy) return;

            const userText = submitted.toLowerCase();

            // KỊCH BẢN ĐỊNH TUYẾN: Check từ khóa ưu đãi trước khi gọi API
            if (userText.includes("mã giảm giá") || userText.includes("khuyến mãi") || userText.includes("voucher")) {
              const newUserMsg = {
                id: Date.now().toString(),
                role: "user" as const,
                content: submitted,
                parts: [{ type: "text", text: submitted }]
              };
              const newBotMsg = {
                id: (Date.now() + 1).toString(),
                role: "assistant" as const,
                content: "Những sinh viên K59 HUE đăng nhập bằng email của trường sẽ được mã giám giá 15%",
                parts: [{ type: "text", text: "Những sinh viên K59 HUE đăng nhập bằng email của trường sẽ được mã giám giá 15%" }]
              };

              setMessages([...messages, newUserMsg, newBotMsg]);
              setText("");
              ref.current?.focus();
              return; // Chặn ở đây, không gọi sendMessage lên server nữa
            }

            // Nếu hỏi bình thường thì gọi AI
            sendMessage({ text: submitted });
            setText("");
            ref.current?.focus();
          }}
        >
          <PromptInputTextarea
            ref={ref}
            autoFocus
            placeholder="Hỏi Aura về chiếc kính của bạn…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="text-xs"
          />
          <PromptInputFooter className="justify-between">
            <span className="text-[9px] text-muted-foreground">AuraLens · Tư vấn tự động</span>
            <PromptInputSubmit
              status={status}
              onStop={stop}
              disabled={!busy && !text.trim()}
              aria-label={busy ? "Dừng trả lời" : "Gửi câu hỏi"}
            >
              <ArrowUp />
            </PromptInputSubmit>
          </PromptInputFooter>
        </PromptInput>
      </div>
    </section>
  );
}
