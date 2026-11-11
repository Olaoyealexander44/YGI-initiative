import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import moodVideo from "../assets/video/Mood.mp4";
import euroImage1 from "../assets/images/euro-image1.jpg";
import euroImage2 from "../assets/images/europageimage2.jpg";
import euroImage3 from "../assets/images/euroimage3.jpg";
import empowermentPic from "../assets/images/empoerment.jpg";
import ygiLogo from "../assets/images/Blue Orange And Red Modern People Network Logo.svg";

const slides = [
  {
    type: "video",
    src: moodVideo,
    duration: 12000,
    tagline: "Empowering next generation",
    titles: ["Transforming Communities."],
  },
  {
    type: "image",
    src: euroImage1,
    alt: "YGI surgeon team",
    duration: 6000,
    tagline: "shifting",
    titles: ["Mindset"],
  },
  {
    type: "image",
    src: euroImage2,
    alt: "Perioperative care",
    duration: 6000,
    tagline: "Education",
    titles: ["Scholarship", "Opportunities"],
  },
  {
    type: "image",
    src: euroImage3,
    alt: "Nurse at work",
    duration: 6000,
    tagline: "Growth",
    titles: ["Empowerment", "Initiative"],
  },
  {
    type: "image",
    src: empowermentPic,
    alt: "Pharmacy programme",
    duration: 6000,
    tagline: "",
    titles: ["Leadership"],
  },
];

export default function YGIHero() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const scrollToSection = (id) => {
    setDropdownOpen(false);
    setAdminOpen(false);
    if (!id) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToRoute = (path) => {
    setDropdownOpen(false);
    setAdminOpen(false);
    navigate(path);
  };

  const navItems = [
    { name: "Home", id: null },
    { name: "About", id: "about" },
    { name: "Media", id: "media" },
    { name: "News", id: "news" },
    { name: "Contact", id: "contact" },
  ];

  const FADE_MS = 1800;

  const goToSlide = (index) => {
    setCurrent(index);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const slide = slides[current];

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (slide.type === "video") {
      const video = videoRef.current;

      if (video) {
        video.currentTime = 0;

        const playPromise = video.play();

        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay may be blocked by the browser.
          });
        }

        const handleEnded = () => {
          nextSlide();
        };

        video.addEventListener("ended", handleEnded);

        timerRef.current = setTimeout(() => {
          video.removeEventListener("ended", handleEnded);
          nextSlide();
        }, slide.duration);

        return () => {
          video.removeEventListener("ended", handleEnded);
          clearTimeout(timerRef.current);
        };
      }
    } else {
      timerRef.current = setTimeout(() => {
        nextSlide();
      }, slide.duration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [current]);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden font-[Poppins] pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left)]">
      {/* ================= BACKGROUND SLIDES ================= */}

      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = index === current;

          if (slide.type === "video") {
            return (
              <video
                key={slide.src}
                ref={index === 0 ? videoRef : null}
                src={slide.src}
                muted
                playsInline
                preload="auto"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms] ease-in-out ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
            );
          }

          return (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms] ease-in-out ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            />
          );
        })}
      </div>

      {/* ================= OVERLAY ================= */}

      <div
        className="
          absolute inset-0 z-[2]
          bg-gradient-to-br
          from-[#ffbd59]/20
          via-black/30
          to-[#140c00]/70
        "
      />

      {/* ================= LOGO ================= */}

      <div className="absolute left-3 top-5 z-10 text-white sm:left-6 sm:top-8 lg:left-[55px] lg:top-[50px]">
        <div
          className="
            flex items-center gap-2
            rounded-[18px]
            border border-[#ffbd59]/35
            bg-white/[0.06]
            px-2.5 py-2.5
            pr-3
            shadow-[0_12px_36px_rgba(0,0,0,0.28)]
            backdrop-blur-[10px]
            transition-all duration-300
            hover:-translate-y-0.5
            hover:border-[#ffbd59]/75
            sm:gap-3
            sm:rounded-[22px]
            sm:px-4
            sm:py-3
            sm:pr-4
          "
        >
          {/* Logo */}

          <div className="relative flex items-center justify-center">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-white/25 blur-2xl"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-[-6px] rounded-full bg-[#00b7cd]/20 blur-3xl"
            />
            <img
              src={ygiLogo}
              alt="YGI Logo"
              className="
                relative
                z-10
                block
                h-16 w-16
                object-contain
                brightness-110 saturate-125
                drop-shadow-[0_10px_30px_rgba(255,255,255,0.35)]
                sm:h-[100px] sm:w-[100px]
                lg:h-[124px] lg:w-[124px]
              "
            />
          </div>

          {/* Divider */}

          <span
            className="
              min-h-10
              w-[2.5px]
              self-stretch
              rounded-full
              bg-gradient-to-b
              from-[#ffbd59]
              to-[#ffbd59]/15
              sm:min-h-14
              sm:w-[3px]
              lg:min-h-16
            "
          />

          {/* Logo Text */}

          <div className="flex flex-col justify-center gap-[2px]">
            <span
              className="
                text-xl
                font-extrabold
                leading-none
                tracking-[1.5px]
                text-white
                drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]
                sm:text-3xl
                lg:text-[34px]
              "
            >
              NEI
            </span>

            <span
              className="
                w-[100px]
                max-w-[32vw]
                text-[7px]
                font-medium
                uppercase
                leading-[11px]
                tracking-[1.1px]
                text-[#ffd79c]
                sm:w-[130px]
                sm:text-[9px]
                sm:leading-[13px]
                lg:w-[150px]
                lg:text-[10px]
                lg:leading-[15px]
                lg:tracking-[1.6px]
              "
            >
              NEXTBUILDER EMPOWERMENT INITIATIVE
            </span>
          </div>
        </div>
      </div>

      {/* ================= TOP NAVIGATION (DROPDOWN) ================= */}

      <nav
        className="
          absolute
          right-3
          top-5
          z-20
          sm:right-6
          sm:top-8
          lg:right-[70px]
          lg:top-[55px]
        "
      >
        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={dropdownOpen}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-[16px]
            border
            border-[#ffbd59]/40
            bg-white/[0.06]
            text-white
            shadow-[0_12px_36px_rgba(0,0,0,0.28)]
            backdrop-blur-[10px]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-[#ffbd59]/80
            hover:text-[#ffbd59]
            sm:h-14
            sm:w-14
            sm:rounded-[18px]
            sm:text-lg
            lg:h-[62px]
            lg:w-[62px]
            lg:text-xl
          "
        >
          <i className={`fa-solid ${dropdownOpen ? "fa-xmark" : "fa-bars"}`} />
        </button>

        {/* Dropdown Panel */}
        {dropdownOpen && (
          <div
            className="
              absolute
              right-0
              top-[calc(100%+10px)]
              min-w-[190px]
              max-w-[80vw]
              overflow-hidden
              rounded-[18px]
              border
              border-[#ffbd59]/35
              bg-[rgba(20,12,0,0.88)]
              p-1.5
              shadow-[0_18px_50px_rgba(0,0,0,0.42)]
              backdrop-blur-[14px]
              sm:top-[calc(100%+14px)]
              sm:min-w-[230px]
              sm:rounded-[20px]
              sm:p-2.5
            "
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-3
                      rounded-[12px]
                      px-4
                      py-3
                      text-left
                      text-[11px]
                      font-medium
                      uppercase
                      tracking-[1.2px]
                      text-white
                      transition-all
                      duration-200
                      hover:bg-[#ffbd59]/12
                      hover:text-[#ffbd59]
                      sm:text-[12px]
                    "
                  >
                    <span>{item.name}</span>
                    <i className="fa-solid fa-chevron-right text-[9px] opacity-70" />
                  </button>
                </li>
              ))}

              {/* Divider */}
              <li className="my-1 h-px bg-[#ffbd59]/20" />

              {/* Admin Dropdown */}
              <li>
                <button
                  type="button"
                  onClick={() => setAdminOpen(!adminOpen)}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-3
                    rounded-[12px]
                    px-4
                    py-3
                    text-left
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[1.2px]
                    text-[#ffbd59]
                    transition-all
                    duration-200
                    hover:bg-[#ffbd59]/12
                    sm:text-[12px]
                  "
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-shield-halved text-[10px]" />
                    Admin
                  </span>
                  <i className={`fa-solid ${adminOpen ? "fa-chevron-up" : "fa-chevron-down"} text-[9px] opacity-80`} />
                </button>

                {adminOpen && (
                  <ul className="mt-1 ml-2 flex flex-col gap-1 border-l border-[#ffbd59]/25 pl-2">
                    <li>
                      <button
                        type="button"
                        onClick={() => goToRoute("/admin/login")}
                        className="
                          flex
                          w-full
                          items-center
                          gap-2
                          rounded-[10px]
                          px-3
                          py-2.5
                          text-left
                          text-[10px]
                          font-medium
                          uppercase
                          tracking-[1.1px]
                          text-white/90
                          transition-all
                          duration-200
                          hover:bg-[#ffbd59]/12
                          hover:text-[#ffbd59]
                          sm:text-[11px]
                        "
                      >
                        <i className="fa-solid fa-right-to-bracket text-[9px] opacity-80" />
                        <span>Login</span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => goToRoute("/admin/signup")}
                        className="
                          flex
                          w-full
                          items-center
                          gap-2
                          rounded-[10px]
                          px-3
                          py-2.5
                          text-left
                          text-[10px]
                          font-medium
                          uppercase
                          tracking-[1.1px]
                          text-white/90
                          transition-all
                          duration-200
                          hover:bg-[#ffbd59]/12
                          hover:text-[#ffbd59]
                          sm:text-[11px]
                        "
                      >
                        <i className="fa-solid fa-user-plus text-[9px] opacity-80" />
                        <span>Signup</span>
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* ================= CENTER CONTENT ================= */}

      {slides.map((slide, index) => {
        const isActive = index === current;

        return (
          <div
            key={index}
            className={`
              absolute
              left-1/2
              top-1/2
              z-10
              w-full
              -translate-x-1/2
              -translate-y-1/2
              px-6
              text-center
              text-white
              transition-opacity
              duration-[1800ms]
              ease-in-out
              pointer-events-none
              ${isActive ? "opacity-100" : "opacity-0"}
            `}
          >
            {slide.tagline && (
              <span
                className="
                  mb-1.5
                  inline-block
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[3px]
                  text-[#ffd79c]
                  drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]
                  max-w-[92vw]
                  overflow-hidden
                  text-ellipsis
                  whitespace-nowrap
                  sm:text-[11px]
                  sm:tracking-[5px]
                  lg:text-[13px]
                "
              >
                {slide.tagline}
              </span>
            )}

            {slide.titles && slide.titles.map((title, tIdx) => (
              <h1
                key={tIdx}
                className="
                  my-2
                  text-[clamp(1.9rem,8vw,3.5rem)]
                  font-bold
                  leading-[1.05]
                  drop-shadow-[0_4px_22px_rgba(0,0,0,0.45)]
                  break-words
                  sm:my-3
                  sm:text-5xl
                  lg:my-5
                  lg:text-[82px]
                "
              >
                {title}
              </h1>
            ))}

            {/* Gold Line */}

            <div
              className="
                mx-auto
                mt-6
                h-1.5
                w-20
                rounded-full
                bg-gradient-to-r
                from-[#ffbd59]
                to-[#ffd79c]
                shadow-[0_0_14px_rgba(255,189,89,0.45)]
                sm:w-24
                lg:mt-8
                lg:w-[120px]
              "
            />
          </div>
        );
      })}

      {/* ================= SLIDER DOTS ================= */}

      <div
        className="
          absolute
          right-3.5
          top-1/2
          z-10
          flex
          -translate-y-1/2
          flex-col
          gap-3
          sm:right-8
          sm:gap-4
          lg:right-[80px]
          lg:gap-[18px]
        "
      >
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goToSlide(index)}
            className={`
              h-3
              w-3
              rounded-full
              border-2
              transition-all
              duration-300
              hover:scale-110
              sm:h-4
              sm:w-4
              lg:h-[18px]
              lg:w-[18px]
              ${
                current === index
                  ? "border-[#ffbd59] bg-[#ffbd59] shadow-[0_0_12px_rgba(255,189,89,0.65)]"
                  : "border-[#ffd79c]/85 bg-transparent hover:border-[#ffbd59]"
              }
            `}
          />
        ))}
      </div>
    </section>
  );
}