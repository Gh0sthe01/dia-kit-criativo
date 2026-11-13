import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero-apostolo-novo.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mídia Kit — Apóstolo Luiz Henrique" },
      {
        name: "description",
        content:
          "Mídia kit oficial do Apóstolo Luiz Henrique: ministério, conteúdo no Instagram e YouTube e parcerias.",
      },
      { property: "og:title", content: "Mídia Kit — Apóstolo Luiz Henrique" },
      {
        property: "og:description",
        content: "Ministério, conteúdo e oportunidades de parceria.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const pilares = [
  {
    title: "Pregação da Palavra",
    description:
      "Mensagens bíblicas que edificam, confrontam e restauram vidas.",
    number: "01",
  },
  {
    title: "Fé & Família",
    description:
      "Conteúdo sobre casamento, filhos e vida cristã no dia a dia.",
    number: "02",
  },
  {
    title: "Avivamento",
    description: "Cultos, conferências e momentos de oração ao vivo.",
    number: "03",
  },
] as const;

const formatos = [
  {
    title: "Instagram",
    description: "Reels, stories, lives e publicações de devocionais diários.",
    mark: "IG",
  },
  {
    title: "YouTube",
    description: "Pregações completas, cultos ao vivo e séries de estudos bíblicos.",
    mark: "YT",
  },
  {
    title: "Eventos",
    description: "Ministração em conferências, congressos e cultos especiais.",
    mark: "EV",
  },
] as const;

const parcerias = [
  "Editoras e livrarias cristãs",
  "Eventos e conferências",
  "Gravadoras e ministérios de louvor",
  "Instituições e projetos sociais",
] as const;

const manifesto =
  "O Apóstolo Luiz Henrique dedica sua vida à pregação do Evangelho, ao cuidado de pessoas e à formação de líderes. Com uma mensagem de fé, esperança e transformação, alcança uma comunidade engajada que acompanha diariamente seus conteúdos nas redes.";

function ArrowUpRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="arrow-icon"
      fill="none"
    >
      <path d="M3.5 12.5 12 4m0 0H5m7 0v7" />
    </svg>
  );
}

function Index() {
  const manifestoRef = useRef<HTMLElement>(null);
  const [activeNav, setActiveNav] = useState("inicio");

  useEffect(() => {
    const section = manifestoRef.current;
    if (!section) return;

    const words = Array.from(
      section.querySelectorAll<HTMLElement>(".manifesto-word"),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const recording = new URLSearchParams(window.location.search).get("rec") === "1";

    if (reducedMotion) {
      words.forEach((word) => word.style.setProperty("--fill", "100%"));
      return;
    }

    let frame = 0;
    let startTime = 0;

    const clamp = (value: number) => Math.max(0, Math.min(1, value));

    const update = (time: number) => {
      cancelAnimationFrame(frame);

      if (recording) {
        if (!startTime) startTime = time;
        const elapsed = (time - startTime) / 1000;
        const progress = clamp((elapsed - 1.3) / 2.9);
        const position = progress * (words.length + 3) - 3;
        words.forEach((word, index) => {
          const fill = clamp((position - index + 3) / 3);
          word.style.setProperty("--fill", Math.round(fill * 100) + "%");
        });
        if (progress < 1) frame = requestAnimationFrame(update);
        return;
      }

      const rect = section.getBoundingClientRect();
      const travel = Math.max(rect.height + window.innerHeight * 0.5, 1);
      const progress = clamp(
        (window.innerHeight * 0.78 - rect.top) / travel,
      );
      const position = progress * (words.length + 3) - 3;
      words.forEach((word, index) => {
        const fill = clamp((position - index + 3) / 3);
        word.style.setProperty("--fill", Math.round(fill * 100) + "%");
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    if (recording) frame = requestAnimationFrame(update);
    else {
      update(performance.now());
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const words = manifesto.split(" ");

  return (
    <main className="editorial-page">
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <img
          src={hero}
          alt="Apóstolo Luiz Henrique ministrando"
          width={1536}
          height={1024}
          className="hero-photo"
          fetchPriority="high"
        />
        <div className="hero-wash" aria-hidden="true" />

        <header className="site-header">
          <a className="brand-mini" href="#inicio" aria-label="Início">
            <span className="brand-mark" aria-hidden="true">
              <i />
              <i />
            </span>
            <span>LUIZ HENRIQUE</span>
          </a>

          <nav className="nav-pill" aria-label="Navegação principal">
            {[
              ["Início", "inicio"],
              ["Ministério", "ministerio"],
              ["Canais", "canais"],
              ["Parcerias", "parcerias"],
            ].map(([label, id]) => (
              <a
                key={id}
                href={"#" + id}
                className={activeNav === id ? "nav-link active" : "nav-link"}
                onMouseEnter={() => setActiveNav(id)}
                onFocus={() => setActiveNav(id)}
                onClick={() => setActiveNav(id)}
              >
                {label}
              </a>
            ))}
          </nav>

          <a className="contact-button" href="https://instagram.com" target="_blank" rel="noreferrer">
            <span>Fale conosco</span>
            <ArrowUpRight />
          </a>
        </header>

        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span className="eyebrow-dot" />
            Mídia Kit 2026
          </p>
          <h1 id="hero-title" className="hero-title" aria-label="Apóstolo Luiz Henrique">
            <span className="title-line"><span>Apóst<span className="title-accent-o">O</span>lo</span></span>
            <span className="title-line title-line-second">
              <span>Luiz Henrique</span>
            </span>
          </h1>
          <p className="hero-description">
            Levando a Palavra de Deus a milhares de pessoas através do Instagram,
            do YouTube e dos púlpitos do Brasil.
          </p>
          <a className="primary-button" href="#ministerio">
            Conheça o ministério <ArrowUpRight />
          </a>
        </div>

        <div className="glass-nameplate" aria-label="Apóstolo Luiz Henrique">
          <span className="nameplate-symbol" aria-hidden="true">
            <i />
            <i />
          </span>
          <span className="nameplate-name">LUIZ HENRIQUE</span>
          <span className="nameplate-caption">MINISTÉRIO &amp; MENSAGEM</span>
        </div>

        <div className="hero-side-note">
          <span className="availability-dot" />
          <span>Uma mensagem<br />de fé e esperança</span>
        </div>

        <div className="hero-bottom">
          <span>MINISTÉRIO · CONTEÚDO · PARCERIAS</span>
          <a href="#manifesto" className="scroll-cue">
            <span>Role para explorar</span>
            <span className="scroll-arrow" aria-hidden="true">↓</span>
          </a>
          <span>BRASIL</span>
        </div>
      </section>

      <div className="section-ribbon" aria-hidden="true">
        <span>EST. NO PROPÓSITO</span>
        <span className="ribbon-center"><span className="ribbon-dot" /> MENSAGEM QUE TRANSFORMA</span>
        <span>FÉ EM MOVIMENTO</span>
      </div>

      <section className="manifesto-section" id="manifesto" ref={manifestoRef}>
        <div className="manifesto-kicker reveal">
          <span className="eyebrow-dot" />
          <span>Uma vida dedicada ao Evangelho</span>
        </div>
        <p className="manifesto-copy" aria-label={manifesto}>
          {words.map((word, index) => (
            <span className="manifesto-word" key={word + "-" + index} aria-hidden="true">
              {word}{" "}
            </span>
          ))}
        </p>
        <div className="manifesto-footer reveal">
          <span>FÉ · ESPERANÇA · TRANSFORMAÇÃO</span>
          <p>
            Pregação do Evangelho, cuidado de pessoas e formação de líderes.
          </p>
        </div>
      </section>

      <section className="ministry-section" id="ministerio">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow"><span className="eyebrow-dot" /> O MINISTÉRIO</p>
            <h2>Uma mensagem<br />com propósito.</h2>
          </div>
          <p className="section-intro">
            Conteúdos que acompanham a vida cristã, fortalecem famílias e
            convidam pessoas a viver a fé.
          </p>
        </div>

        <div className="pillar-grid">
          {pilares.map((item, index) => (
            <article className="pillar-card reveal" key={item.title} style={{ transitionDelay: index * 90 + "ms" }}>
              <div className="card-topline">
                <span>{item.number}</span>
                <span className="card-cross" aria-hidden="true">✳</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="card-rule" />
            </article>
          ))}
        </div>
      </section>

      <section className="channels-section" id="canais">
        <div className="channels-intro reveal">
          <p className="eyebrow"><span className="eyebrow-dot" /> ONDE ESTAMOS</p>
          <h2>A Palavra<br />em diferentes formatos.</h2>
          <p>
            Uma presença que conecta mensagens, pessoas e momentos de
            comunhão em diferentes plataformas.
          </p>
        </div>

        <div className="channel-list">
          {formatos.map((item, index) => (
            <article className="channel-card reveal" key={item.title} style={{ transitionDelay: index * 90 + "ms" }}>
              <span className="channel-mark">{item.mark}</span>
              <div className="channel-copy">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <ArrowUpRight />
            </article>
          ))}
        </div>
      </section>

      <section className="partnership-section" id="parcerias">
        <div className="partnership-panel">
          <div className="partnership-heading reveal">
            <span className="glass-tile tile-star" aria-hidden="true">✳</span>
            <p className="eyebrow"><span className="eyebrow-dot" /> OPORTUNIDADES</p>
            <h2>Vamos caminhar<br />juntos?</h2>
            <p className="partnership-description">
              Para agenda, convites e parcerias, entre em contato.
            </p>
          </div>

          <div className="partnership-options">
            <p className="eyebrow">PARCERIAS</p>
            <ul>
              {parcerias.map((item, index) => (
                <li className="reveal" key={item} style={{ transitionDelay: index * 70 + "ms" }}>
                  <span className="option-index">0{index + 1}</span>
                  <span>{item}</span>
                  <ArrowUpRight />
                </li>
              ))}
            </ul>
            <a className="primary-button partnership-button" href="https://instagram.com" target="_blank" rel="noreferrer">
              Fale conosco <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand-mini footer-brand" href="#inicio">
          <span className="brand-mark" aria-hidden="true"><i /><i /></span>
          <span>APÓSTOLO LUIZ HENRIQUE</span>
        </a>
        <span>MÍDIA KIT 2026</span>
        <a href="#inicio" className="back-to-top">Voltar ao início ↑</a>
      </footer>
    </main>
  );
}
