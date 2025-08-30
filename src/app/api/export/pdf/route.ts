import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabaseServer";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return new NextResponse("Missing id", { status: 400 });

  const supa = createServerSupabase();
  const { data: { user } } = await supa.auth.getUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const { data: draft } = await supa.from("drafts").select("*").eq("id", id).single();
  if (!draft) return new NextResponse("Not found", { status: 404 });

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const { width } = page.getSize();

  const title = draft.title || "Document";
  page.drawText(title, { x: 40, y: 790, size: 18, font: fontBold, color: rgb(0.2,0.2,0.2) });

  const text = (draft.content || "").replace(/\r\n/g, "\n");
  const lines = text.split("\n");
  let y = 760;
  const size = 12;

  for (const line of lines) {
    // naive wrap
    const words = line.split(" ");
    let current = "";
    for (const w of words) {
      const test = current ? current + " " + w : w;
      if (font.widthOfTextAtSize(test, size) > width - 80) {
        page.drawText(current, { x: 40, y, size, font });
        y -= 16;
        current = w;
      } else {
        current = test;
      }
    }
    if (current) {
      page.drawText(current, { x: 40, y, size, font });
      y -= 16;
    }
    if (y < 60) { y = 760; pdfDoc.addPage([595, 842]); }
  }

  const bytes = await pdfDoc.save();
  return new NextResponse(Buffer.from(bytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${title}.pdf"`
    }
  });
    }
