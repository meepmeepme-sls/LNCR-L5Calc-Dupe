export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);

  // If client-side Next.js App Router requested RSC payload
  if (request.headers.get("rsc") === "1") {
    let cleanPath = url.pathname.replace(/^\/+|\/+$/g, "");
    if (!cleanPath) cleanPath = "index";

    try {
      const rscUrl = new URL(`/_rsc/${cleanPath}.rsc`, request.url);
      const rscResp = await env.ASSETS.fetch(rscUrl);
      if (rscResp && rscResp.ok) {
        return new Response(rscResp.body, {
          status: 200,
          headers: {
            "Content-Type": "text/x-component",
            "Cache-Control": "public, max-age=0, must-revalidate",
            "Vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch"
          }
        });
      }
    } catch (e) {
      // Fallback to normal response
    }
  }

  return next();
}
