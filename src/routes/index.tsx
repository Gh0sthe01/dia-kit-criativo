import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero-apostolo.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mídia Kit — Apóstolo Luiz Henrique" },
      { name: "description", content: "Mídia kit oficial do Apóstolo Luiz Henrique: ministério, conteúdo no Instagram e YouTube e parcerias." },
      { property: "og:title", content: "Mídia Kit — Apóstolo Luiz Henrique" },
      { property: "og:description", content: "Ministério, conteúdo e oportunidades de parceria." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const pilares = [
  ["Pregação da Palavra", "Mensagens bíblicas que edificam, confrontam e restauram vidas."],
  ["Fé & Família", "Conteúdo sobre casamento, filhos e vida cristã no dia a dia."],
  ["Avivamento", "Cultos, conferências e momentos de oração ao vivo."],
];
const formatos = [
  ["Instagram", "Reels, stories, lives e publicações de devocionais diários."],
  ["YouTube", "Pregações completas, cultos ao vivo e séries de estudos bíblicos."],
  ["Eventos", "Ministração em conferências, congressos e cultos especiais."],
];
const parcerias = ["Editoras e livrarias cristãs", "Eventos e conferências", "Gravadoras e ministérios de louvor", "Instituições e projetos sociais"];

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <section className="relative flex min-h-[90vh] items-end overflow-hidden">
        <img src={hero} alt="Apóstolo Luiz Henrique ministrando" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-fade" />
        <div className="relative mx-auto w-full max-w-5xl px-6 pb-20">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Mídia Kit 2026</p>
          <h1 className="mt-4 text-6xl font-bold leading-none md:text-8xl">Apóstolo<br />Luiz Henrique</h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">Levando a Palavra de Deus a milhares de pessoas através do Instagram, do YouTube e dos púlpitos do Brasil.</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-4xl font-bold text-primary">Sobre o ministério</h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          O Apóstolo Luiz Henrique dedica sua vida à pregação do Evangelho, ao cuidado de pessoas e à formação de líderes. Com uma mensagem de fé, esperança e transformação, alcança uma comunidade engajada que acompanha diariamente seus conteúdos nas redes.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pilares.map(([t, d]) => (
            <div key={t} className="border-t border-primary pt-6">
              <h3 className="text-2xl font-bold">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-4xl font-bold text-primary">Onde estamos</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {formatos.map(([t, d]) => (
              <div key={t} className="rounded-md border border-border p-8">
                <h3 className="text-3xl font-bold">{t}</h3>
                <p className="mt-3 text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-4xl font-bold text-primary">Parcerias</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {parcerias.map((p) => (
            <li key={p} className="flex items-center gap-4 text-lg"><span className="h-px w-8 bg-primary" />{p}</li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border py-20 text-center">
        <h2 className="text-5xl font-bold">Vamos caminhar juntos?</h2>
        <p className="mt-4 text-muted-foreground">Para agenda, convites e parcerias, entre em contato.</p>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="mt-8 inline-block rounded-md bg-primary px-8 py-4 font-semibold text-primary-foreground transition-opacity hover:opacity-90">Fale conosco</a>
      </section>
    </main>
  );
}
