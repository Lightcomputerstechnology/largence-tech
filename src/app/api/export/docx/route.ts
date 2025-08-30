import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabaseServer";
import { Document, Packer, HeadingLevel, Paragraph, TextRun } from "docx";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return new NextResponse("Missing id", { status: 400 });

  const supa = createServerSupabase();
  const { data: { user } } = await supa.auth.getUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const { data: draft } = await supa.from("drafts").select("*").eq("id", id).single();
  if (!draft) return new NextResponse("Not found", { status: 404 });

  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({ text: draft.title || "Document", heading: HeadingLevel.HEADING_1 }),
        ...String(draft.content || "")
          .split(/\r?\n/g)
          .map(line => new Paragraph({ children: [new TextRun({ text: line })] }))
      ]
    }]
  });

  const buffer = await Packer.toBuffer(doc);
  return new NextResponse(Buffer.from(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${(draft.title || "Document")}.docx"`
    }
  });
            }
                          
