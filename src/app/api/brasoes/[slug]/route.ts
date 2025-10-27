import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const url = `https://raw.githubusercontent.com/webdesignbet/brasoes/main/${slug}.webp`;

  try {
    const r = await fetch(url, { cache: "force-cache" });
    if (!r.ok) throw new Error("not ok");
    const buf = await r.arrayBuffer();

    return new NextResponse(buf, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.redirect(new URL("/brasoes/escudobase.svg", _req.url));
  }
}