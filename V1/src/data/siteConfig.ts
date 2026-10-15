/**
 * ============================================================================
 *  AMANDA — SCULPT & MOVEMENT · ARCHIVO DE CONFIGURACIÓN CENTRAL
 * ============================================================================
 *
 *  👉 Este es el ÚNICO archivo que necesitas editar para cambiar el contenido
 *     de la web: textos, enlaces, colores, imágenes, vídeos y el formulario.
 *
 *  · Las IMÁGENES viven en  /public/images/  → se referencian como "/images/archivo.jpg"
 *  · Los VÍDEOS viven en    /public/videos/  → se referencian como "/videos/archivo.mp4"
 *    (también puedes usar una URL completa a un CDN: "https://cdn.../clip.mp4")
 *  · Guarda el archivo y la página se recarga sola con `npm run dev`.
 * ============================================================================
 */

/* ----------------------------------------------------------------------------
 *  TIPOS (no hace falta tocarlos)
 * --------------------------------------------------------------------------*/
export type HeadlineSegment = {
  text: string;
  /** "sans" = geométrica limpia · "serif" = editorial en cursiva */
  style: "sans" | "serif";
};

export type VibeTrack = {
  id: string;
  phase: string;
  bpm: number;
  duration: string;
  intensity: 1 | 2 | 3 | 4 | 5;
  description: string;
  accent: string;
};

export type Reel = {
  id: string;
  title: string;
  classStyle: string;
  bpm: number;
  poster: string;
  video: string;
  tiktokUrl: string;
};

export type GalleryItem =
  | { type: "image"; src: string; alt: string; caption: string; span: "tall" | "wide" | "square" }
  | { type: "quote"; text: string; author: string }
  | { type: "social"; network: "instagram" | "tiktok" };

export type InquiryType = { id: string; label: string };

/* ============================================================================
 *  CONFIGURACIÓN
 * ==========================================================================*/
export const siteConfig = {
  /* --------------------------------------------------------------------------
   *  1. MARCA Y SEO
   * ------------------------------------------------------------------------*/
  brand: {
    name: "Amanda",
    logo: "AMANDA.", // Imagotipo de la barra de navegación
    watermark: "AMANDA SCULPT", // Marca de agua gigante del footer
    language: "es", // Idioma del documento HTML ("es" | "en")
    copyright: "© 2026 Amanda Sculpt. Todos los derechos reservados.",
    credits: "Diseño & desarrollo — Studio Editorial, Los Angeles",
  },

  seo: {
    title: "Amanda — Sculpt Instructor en Los Angeles | Beat-Driven Sculpt",
    description:
      "Clases de Sculpt de alta energía sincronizadas con la música en Los Angeles. Sesiones privadas, clases en estudio, masterclasses y colaboraciones con marcas.",
    // 🔁 Sustituye por el dominio real cuando lo tengas
    url: "https://amandasculpt.com",
    ogImage: "/images/hero-sculpt.jpg",
  },

  /* --------------------------------------------------------------------------
   *  2. PALETA DE COLORES ("LA Luxury Editorial Wellness")
   *  Cambia cualquier HEX y toda la web se actualiza al instante.
   * ------------------------------------------------------------------------*/
  theme: {
    colors: {
      background: "#F9F6F0", // Alabastro cálido / avena — fondo principal
      surface: "#EFECE6", //    Arena suave — fondo secundario
      ink: "#1C1917", //        Espresso oscuro — texto principal
      muted: "#78716C", //      Piedra cálida — texto secundario
      clay: "#C87D55", //       Arcilla terracota — acento principal
      sage: "#8A9A86", //       Salvia suave — acento secundario
    },
    // ℹ️ Las tipografías (Cormorant Garamond + Plus Jakarta Sans) se cargan en
    //    src/app/layout.tsx mediante next/font (requisito técnico de Next.js).
  },

  /* --------------------------------------------------------------------------
   *  3. REDES SOCIALES Y CONTACTO DIRECTO
   *  🔁 Sustituye los usuarios y URLs por los reales
   * ------------------------------------------------------------------------*/
  social: {
    tiktok: {
      handle: "@amanda.sculpt",
      url: "https://www.tiktok.com/@amanda.sculpt",
      label: "Clases & Sculpt",
    },
    instagram: {
      handle: "@amanda.in.la",
      url: "https://www.instagram.com/amanda.in.la",
      label: "Vida diaria & Lifestyle",
    },
    spotify: {
      handle: "Amanda's Sculpt Playlists",
      url: "https://open.spotify.com/user/amandasculpt",
      label: "Playlists de clase",
    },
  },

  contactInfo: {
    email: "hola@amandasculpt.com",
    location: "Los Angeles, California",
    neighborhoods: "Silver Lake · West Hollywood · Santa Monica",
    responseTime: "Respondo en 24–48 h",
  },

  /* --------------------------------------------------------------------------
   *  4. NAVEGACIÓN
   *  "href" debe coincidir con el id de cada sección (#metodo, #movimiento…)
   * ------------------------------------------------------------------------*/
  nav: {
    links: [
      { label: "El Método", href: "#metodo" },
      { label: "En Movimiento", href: "#movimiento" },
      { label: "Sobre Mí", href: "#sobre-mi" },
      { label: "Contacto", href: "#contacto" },
    ],
    cta: { label: "Conectar", href: "#contacto" },
  },

  /* --------------------------------------------------------------------------
   *  5. HERO
   * ------------------------------------------------------------------------*/
  hero: {
    locationTag: "📍 LOS ANGELES, CA • SCULPT & MOVEMENT",
    headline: [
      { text: "Esculpido por el", style: "sans" },
      { text: "ritmo.", style: "serif" },
      { text: "Guiado por la", style: "sans" },
      { text: "precisión.", style: "serif" },
    ] as HeadlineSegment[],
    subtitle:
      "Clases de Sculpt de alta energía donde cada repetición cae sobre el beat. Música, técnica y control muscular sincronizados para que entrenes con intención — y salgas sintiéndote imparable.",
    primaryCta: { label: "Reserva tu sesión", href: "#contacto" },
    secondaryCta: { label: "Ver clases en movimiento", href: "#movimiento" },
    // 🖼️ Imagen principal (vertical, mínimo 1200px de alto recomendado)
    image: "/images/hero-sculpt.jpg",
    imageAlt: "Amanda realizando una zancada con mancuernas en un estudio luminoso de Los Angeles",
    // 🎬 OPCIONAL: vídeo en bucle sin sonido. Déjalo vacío ("") para usar solo la imagen.
    //    Ejemplo: "/videos/hero-loop.mp4"  (MP4 H.264, < 8 MB, 6–12 s)
    video: "",
    nowPlaying: { label: "Now teaching", track: "Core & Glute Burn", bpm: 126 },
    rotatingBadge: "BEAT-DRIVEN SCULPT • LOS ANGELES • EST. 2019 • ",
    stats: [
      { value: "1.2K+", label: "Clases impartidas" },
      { value: "126", label: "BPM de media" },
      { value: "6", label: "Estudios en L.A." },
    ],
  },

  /* --------------------------------------------------------------------------
   *  6. CINTA DE TEXTO (marquee entre secciones)
   * ------------------------------------------------------------------------*/
  marquee: [
    "Beat-Driven Sculpt",
    "Tempo consciente",
    "Tensión sostenida",
    "Los Angeles",
    "Low impact · High intensity",
    "Move with intention",
  ],

  /* --------------------------------------------------------------------------
   *  7. EL MÉTODO
   * ------------------------------------------------------------------------*/
  method: {
    eyebrow: "01 — El Método",
    titleSans: "Beat-Driven",
    titleSerif: "Sculpt",
    intro:
      "No cuento repeticiones: cuento compases. Cada bloque está construido sobre el tempo de la música para que el músculo trabaje en tensión sostenida, la respiración encuentre su sitio y las transiciones fluyan sin romper la energía.",
    pillars: [
      {
        number: "01",
        title: "La Sincronización del Tempo",
        tag: "BPM",
        text: "Cada playlist se diseña por BPM. Subimos y bajamos el tempo de forma deliberada para modular la intensidad, como un DJ que lee la sala.",
      },
      {
        number: "02",
        title: "El Esculpido Muscular",
        tag: "Tensión",
        text: "Pulsos, isométricos y rangos cortos bajo control. Poco peso, mucha intención: la fórmula para definir sin impacto en las articulaciones.",
      },
      {
        number: "03",
        title: "La Energía de L.A.",
        tag: "Vibe",
        text: "Luz natural, buena música y una comunidad que se anima. Sales de clase sudada, enfocada y con ganas de volver mañana.",
      },
    ],
    vibe: {
      title: "Class Vibe Preview",
      subtitle: "Toca una fase para sentir el tempo de una clase real.",
      tracks: [
        {
          id: "warmup",
          phase: "Warmup Flow",
          bpm: 110,
          duration: "08 min",
          intensity: 2,
          description: "Movilidad articular y respiración que sigue al beat. El cuerpo despierta sin prisa.",
          accent: "#8A9A86",
        },
        {
          id: "burn",
          phase: "Core & Glute Burn",
          bpm: 126,
          duration: "18 min",
          intensity: 4,
          description: "Pulsos al compás y tensión sostenida. Aquí es donde empieza a quemar de verdad.",
          accent: "#C87D55",
        },
        {
          id: "finisher",
          phase: "Sculpt Finisher",
          bpm: 132,
          duration: "10 min",
          intensity: 5,
          description: "Tempo máximo, combinaciones de brazos y un último drop que te deja sin aliento.",
          accent: "#E3B08F",
        },
      ] as VibeTrack[],
    },
  },

  /* --------------------------------------------------------------------------
   *  8. EN MOVIMIENTO — GALERÍA DE TIKTOK / REELS (formato 9:16)
   *  · poster: miniatura vertical (1080×1920 recomendado)
   *  · video:  "/videos/reel-01.mp4" o URL a CDN. Si lo dejas "", se muestra
   *            el póster con una animación suave (ideal mientras no tengas los clips).
   *  · tiktokUrl: enlace directo al vídeo en TikTok
   * ------------------------------------------------------------------------*/
  movement: {
    eyebrow: "02 — En Movimiento",
    titleSans: "En",
    titleSerif: "movimiento",
    intro: "Fragmentos reales de clase. Sube el volumen mental: todo pasa sobre el beat.",
    profileCta: "Sígueme en TikTok",
    reels: [
      {
        id: "reel-01",
        title: "Squat pulses al compás",
        classStyle: "Full Body Sculpt",
        bpm: 128,
        poster: "/images/reel-01.jpg",
        video: "", // 🎬 ej: "/videos/reel-01.mp4"
        tiktokUrl: "https://www.tiktok.com/@amanda.sculpt",
      },
      {
        id: "reel-02",
        title: "Bridge series en tensión",
        classStyle: "Glute Burn",
        bpm: 122,
        poster: "/images/reel-02.jpg",
        video: "", // 🎬 ej: "/videos/reel-02.mp4"
        tiktokUrl: "https://www.tiktok.com/@amanda.sculpt",
      },
      {
        id: "reel-03",
        title: "Arms & tempo drop",
        classStyle: "Sculpt Finisher",
        bpm: 132,
        poster: "/images/reel-03.jpg",
        video: "", // 🎬 ej: "/videos/reel-03.mp4"
        tiktokUrl: "https://www.tiktok.com/@amanda.sculpt",
      },
      {
        id: "reel-04",
        title: "Rooftop core al atardecer",
        classStyle: "Core Flow",
        bpm: 116,
        poster: "/images/reel-04.jpg",
        video: "", // 🎬 ej: "/videos/reel-04.mp4"
        tiktokUrl: "https://www.tiktok.com/@amanda.sculpt",
      },
    ] as Reel[],
  },

  /* --------------------------------------------------------------------------
   *  9. SOBRE MÍ / MÁS ALLÁ DE LA ESTERILLA
   * ------------------------------------------------------------------------*/
  about: {
    eyebrow: "03 — Más allá de la esterilla",
    titleSans: "Hola, soy",
    titleSerif: "Amanda.",
    lead: "Instructora de Sculpt, amante de los vinilos y de los matchas demasiado caros. Llegué a Los Angeles con una maleta y una playlist — y me quedé por la luz.",
    paragraphs: [
      "Empecé bailando, me enamoré del Pilates y encontré mi voz en el Sculpt: ese punto exacto donde la técnica precisa se encuentra con una música que te empuja a dar un poco más.",
      "Fuera del estudio me encontrarás haciendo hiking en Runyon al amanecer, perdiéndome por Malibu o buscando el próximo café con buena luz. Mi TikTok es la clase; mi Instagram, todo lo demás.",
    ],
    signature: "— Amanda",
    certifications: ["Certified Sculpt & Barre", "Mat Pilates Comprehensive", "Pre & Postnatal"],
    /**
     * Bento asimétrico. El orden importa para que encaje sin huecos:
     *  span: "tall" (vertical, 2 filas) · "wide" (horizontal, 2 columnas) · "square"
     *  type: "image" | "quote" (cita) | "social" (tarjeta de Instagram / TikTok)
     */
    gallery: [
      { type: "image", src: "/images/about-portrait.jpg", alt: "Retrato de Amanda en su casa de Los Angeles", caption: "Casa · Silver Lake", span: "tall" },
      { type: "image", src: "/images/life-canyon.jpg", alt: "Amanda haciendo hiking con vistas a Los Angeles", caption: "Runyon Canyon · 6:40 am", span: "tall" },
      { type: "image", src: "/images/life-studio.jpg", alt: "Amanda preparando la playlist antes de clase", caption: "Antes de clase · La playlist es sagrada", span: "wide" },
      { type: "image", src: "/images/life-matcha.jpg", alt: "Iced matcha latte en una cafetería de Los Angeles", caption: "Ritual de mañana", span: "square" },
      { type: "quote", text: "La disciplina suena mejor con buena música.", author: "Amanda" },
      { type: "image", src: "/images/life-malibu.jpg", alt: "Amanda paseando por la playa de Malibu al atardecer", caption: "Malibu · Golden hour", span: "wide" },
      { type: "social", network: "instagram" },
      { type: "social", network: "tiktok" },
    ] as GalleryItem[],
  },

  /* --------------------------------------------------------------------------
   *  10. CONTACTO — "TRABAJA CON AMANDA"
   * ------------------------------------------------------------------------*/
  contact: {
    eyebrow: "04 — Trabaja con Amanda",
    titleSans: "Movámonos",
    titleSerif: "juntas.",
    availability:
      "Disponible en Los Angeles para sesiones privadas, clases en estudios y colaboraciones con marcas.",
    inquiryLabel: "¿Qué tienes en mente?",
    inquiryTypes: [
      { id: "private", label: "Sesión Privada 1:1 o Grupo" },
      { id: "brand", label: "Colaboración de Marca / UGC" },
      { id: "studio", label: "Estudio / Masterclass Pop-up" },
      { id: "hello", label: "Saludar / Contacto General" },
    ] as InquiryType[],
    fields: {
      name: { label: "Nombre", placeholder: "Tu nombre" },
      email: { label: "Correo electrónico", placeholder: "tu@email.com" },
      social: { label: "Usuario de Instagram / TikTok", placeholder: "@usuario (opcional)" },
      message: { label: "Mensaje", placeholder: "Cuéntame fechas, objetivos o la idea de tu marca…" },
    },
    submitLabel: "Enviar mensaje",
    sendingLabel: "Enviando…",
    successTitle: "¡Mensaje recibido!",
    successText: "Gracias por escribirme. Te responderé muy pronto desde mi email personal.",
    successReset: "Enviar otro mensaje",
    errorText: "Algo no ha ido bien. Inténtalo de nuevo o escríbeme directamente a",
  },

  /* --------------------------------------------------------------------------
   *  11. FORMULARIO → EMAIL (sin backend)
   *
   *  OPCIÓN A — Web3Forms (recomendado, gratis):
   *    1. Entra en https://web3forms.com y escribe el email de Amanda.
   *    2. Recibirás un "Access Key" por correo.
   *    3. Pégalo abajo en `accessKey`.
   *
   *  OPCIÓN B — Formspree:
   *    1. Crea un formulario en https://formspree.io
   *    2. provider: "formspree"
   *    3. endpoint: "https://formspree.io/f/TU_ID"  (accessKey se ignora)
   *
   *  ℹ️ Mientras la clave no esté configurada, en desarrollo (npm run dev) el
   *     formulario SIMULA un envío correcto para poder presentar el diseño.
   *     En producción mostrará el estado de error.
   * ------------------------------------------------------------------------*/
  form: {
    provider: "web3forms" as "web3forms" | "formspree",
    endpoint: "https://api.web3forms.com/submit",
    // 🔑 SUSTITUYE ESTO por tu Access Key de Web3Forms
    accessKey: "YOUR_WEB3FORMS_ACCESS_KEY",
    subject: "✨ Nueva consulta desde amandasculpt.com",
    fromName: "Amanda Sculpt — Web",
  },

  /* --------------------------------------------------------------------------
   *  12. FOOTER
   * ------------------------------------------------------------------------*/
  footer: {
    tagline: "Esculpido por el ritmo. Guiado por la precisión.",
    note: "Hecho con luz natural y mucho tempo en Los Angeles.",
  },
};

export type SiteConfig = typeof siteConfig;
