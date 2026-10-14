// Health check, ported from the standalone Express backend in `be/`.
// force-dynamic so the timestamp reflects the request, not the build.
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    status: "ok",
    service: "yis-api",
    timestamp: new Date().toISOString(),
  });
}
