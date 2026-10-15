import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/api/support")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { handleSupport } = await import("@/lib/ai/support.server");
        return handleSupport(request);
      },
    },
  },
});
