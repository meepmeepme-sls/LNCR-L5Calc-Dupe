export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get("url");

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: "Missing url parameter" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const upstreamUrl = `https://ember.level5robotics.com/api/scrape-points?url=${encodeURIComponent(targetUrl)}`;
    const upstreamResp = await fetch(upstreamUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });

    const body = await upstreamResp.text();
    return new Response(body, {
      status: upstreamResp.status,
      headers: {
        "Content-Type": upstreamResp.headers.get("Content-Type") || "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "*"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch points: " + err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
