<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Use flat TanStack content routes and a shared root storefront shell; every content route owns its localized page metadata.
- Centralize product variants and illustrative prices in the browser-safe catalog module so configurator, cart and server order pricing share one source.
- Use Cloud Auth and owner-scoped RLS for profiles, carts and orders; order writes go through an authenticated server function with server-calculated totals.
- Keep Aura support as one session-only conversation with AI Elements and AI SDK UI-message transport; deterministic promotion replies enforce the mandated wording before model calls.
- Treat product photos, prices and delivery estimates as concept-stage illustrations until the merchant confirms commercial details; disconnected payment methods never collect money.
