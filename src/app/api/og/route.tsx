import { ImageResponse } from "next/og";

export const runtime = "edge";

const stripHtml = (html: string | null): string | null => {
  if (!html) return null;
  return html
    .replace(/(<\/p>|<br\/>|<br>)/g, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")!.length > 50
        ? searchParams.get("title")!.slice(0, 50) + "…"
        : searchParams.get("title")
      : "Barnvisor";

    const descriptionRaw = stripHtml(searchParams.get("description"));
    const description =
      descriptionRaw && descriptionRaw.length > 260
        ? descriptionRaw.slice(0, 260) + "…"
        : descriptionRaw || null;

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "#090909",
            color: "#ffffff",
            height: "100%",
            width: "100%",
            padding: "100px 100px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 72 }}>{title}</div>
            {description !== null && (
              <div
                style={{
                  fontSize: 24,
                  marginTop: 36,
                  color: "#737374",
                  lineHeight: "1.75",
                }}
              >
                {description}
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
