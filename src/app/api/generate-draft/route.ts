import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabaseServer";
import { POST as createDraft } from "../drafts/route";

export async function POST(req: Request) {
  const supa = createServerSupabase();
  const { data: { user } } = await supa.auth.getUser();
  if (!user) return NextResponse.redirect("/sign-in", { status: 303 });

  const form = await req.formData();
  const template = String(form.get("template") || "NDA").trim();
  const partyA = String(form.get("party_a") || "").trim();
  const partyB = String(form.get("party_b") || "").trim();
  const jurisdiction = String(form.get("jurisdiction") || "").trim();
  const effective = String(form.get("effective_date") || "").trim();
  const notes = String(form.get("notes") || "").trim();

  const titleParts = [template, partyA && `— ${partyA}`, partyB && ` & ${partyB}`]
    .filter(Boolean)
    .join("");
  const title = titleParts || template;

  let content = "";

  if (process.env.OPENAI_API_KEY) {
    const OpenAI = (await import("openai")).default;
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = [
      `You are a legal drafting assistant. Produce a clean, concise ${template}.`,
      `STYLE RULES:`,
      `- Professional tone, plain English.`,
      `- Numbered clauses with short paragraphs.`,
      `- Tidy formatting. No boilerplate fluff or purple prose.`,
      `- Use clear headings (e.g., 1. Definitions, 2. Confidentiality).`,
      `- Insert user inputs directly; use [brackets] only if missing.`,
      ``,
      `INPUTS:`,
      `- Party A: ${partyA || "[Party A]"}`,
      `- Party B: ${partyB || "[Party B]"}`,
      `- Jurisdiction: ${jurisdiction || "[Jurisdiction]"}`,
      `- Effective Date: ${effective || "[Date]"}`,
      `- Notes (may add clauses or specifics): ${notes || "[None]"}`,
      ``,
      `OUTPUT:`,
      `- Start with the document title on the first line.`,
      `- Then the body with numbered clauses.`,
      `- Keep within ~800–1200 words.`,
    ].join("\n");

    const chat = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      max_tokens: 1200,
      messages: [
        { role: "system", content: "You format legal drafts cleanly and concisely." },
        { role: "user", content: prompt },
      ],
    });

    content = (chat.choices[0]?.message?.content || "").trim();
    if (!content) {
      content =
        `# ${template}\n\n` +
        `This ${template} (“Agreement”) is made between ${partyA || "[Party A]"} and ${partyB || "[Party B]"}, ` +
        `effective ${effective || "[Date]"}, under the laws of ${jurisdiction || "[Jurisdiction]"}.\n\n` +
        `1. Scope. …\n2. Confidentiality. …\n3. Term & Termination. …\n4. Governing Law. ${jurisdiction || "[Jurisdiction]"}.`;
    }
  } else {
    // Fallback when no OPENAI_API_KEY is set
    content =
`# ${template}

This ${template} (“Agreement”) is made between ${partyA || "[Party A]"} and ${partyB || "[Party B]"}, effective ${effective || "[Date]"}.

1. Definitions.
   Define key terms used in this Agreement.

2. Confidentiality.
   Each party will keep Confidential Information strictly confidential and use it only for the permitted purpose.

3. Use & Restrictions.
   Parties must not disclose, reverse engineer, or misuse protected information.

4. Term & Termination.
   This Agreement commences on the Effective Date and continues until terminated upon written notice.

5. Intellectual Property.
   No license is granted unless expressly stated. All IP remains with the original owner.

6. Liability & Indemnity.
   Limit liability to direct losses where lawful. Include a reasonable cap if needed.

7. Governing Law.
   This Agreement is governed by ${jurisdiction || "[Jurisdiction]"}.

Notes: ${notes || "[None]"}

[Set OPENAI_API_KEY to enable AI-generated wording.]
`;
  }

  // Reuse drafts POST to enforce quota & redirect to editor
  const fd = new FormData();
  fd.set("title", title);
  fd.set("content", content);
  const proxyReq = new Request(req.url, { method: "POST", body: fd, headers: req.headers });
  return createDraft(proxyReq);
      }
