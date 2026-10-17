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

// Vẫn giữ transport nhưng ta sẽ không dùng sendMessage của nó nữa để tránh lỗi API đỏ
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
  const { messages, setMessages, status, stop } = useChat({ transport });
  const [text, setText] = useState("");
  // Thêm state giả lập trạng thái đang gõ
  const [isTyping, setIsTyping] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  
  const busy = isTyping;

  useEffect(() => {
    if (!busy) ref.current?.focus();
  }, [busy]);

  // Hàm xử lý AI giả lập (Mock AI)
  const handleFakeAI = (userText: string) => {
    if (!userText.trim() || busy) return;

    // 1. In tin nhắn của người dùng ra màn hình
    const newUserMsg = {
      id: Date.now().toString(),
      role: "user" as const,
      content: userText,
      parts: [{ type: "text", text: userText }]
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setText("");
    setIsTyping(true); // Hiện hiệu ứng AI đang suy nghĩ

    // 2. Chuẩn bị câu trả lời dựa trên từ khóa (Không cần gọi Server)
    setTimeout(() => {
      let botResponse = "Dạ, hiện tại em là phiên bản trợ lý ảo Demo. Để được tư vấn chuyên sâu về thông số kỹ thuật của kính, anh/chị vui lòng liên hệ Hotline 1900583667 nhé!";
      
      const lowerText = userText.toLowerCase();

      if (lowerText.includes("mã giảm giá") || lowerText.includes("khuyến mãi") || lowerText.includes("voucher")) {
        botResponse = "Những sinh viên K59 HUE đăng nhập bằng email của trường sẽ được mã giám giá 15%";
      } else if (lowerText.includes("pro và lite") || lowerText.includes("khác nhau")) {
        botResponse = "Dạ, bản Pro được trang bị đầy đủ công nghệ LiDAR và dịch thuật AR phù hợp cho công việc. Bản Lite thì có thiết kế trong suốt tinh giản, siêu nhẹ, thiên về thời trang làm đẹp ạ.";
      } else if (lowerText.includes("chào")) {
        botResponse = "Dạ chào bạn! Mình là Aura AI, bạn cần mình hỗ trợ thông tin gì về kính thông minh AuraLens ạ?";
      } else if (lowerText.includes("đo độ") || lowerText.includes("cận")) {
        botResponse = "Dạ, kính AuraLens sẽ tự động tinh chỉnh tiêu cự liên tục dựa trên khoảng cách vật thể bạn nhìn, bạn chỉ cần chọn khoảng độ cận của mình khi đặt hàng là được ạ.";
      }

      const newBotMsg = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: botResponse,
        parts: [{ type: "text", text: botResponse }]
      };

      setMessages(prev => [...prev, newBotMsg]);
      setIsTyping(false); // Tắt hiệu ứng suy nghĩ
      ref.current?.focus();
    }, 1500); // Giả lập độ trễ 1.5 giây cho giống AI thật đang chat
  };

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
                Xin chào! Mình là Aura AI. Bạn thích hiệu năng toàn diện của Pro hay phong cách mảnh nhẹ của Lite?
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
                  onClick={() => handleFakeAI(t)}
                >
                  {t}
                </Button>
              ))}
            </div>
          )}
          {messages.map((m) => (
            <Message key={m.id} from={m.role}>
              <MessageContent>
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
          
          {/* Hiệu ứng đang gõ chữ */}
          {isTyping && (
            <Message from="assistant">
              <MessageContent>
                <Shimmer>Aura đang tìm câu trả lời…</Shimmer>
              </MessageContent>
            </Message>
          )}

        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <div className="chat-composer">
        <PromptInput
          onSubmit={({ text: submitted }) => handleFakeAI(submitted)}
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
