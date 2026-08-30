import { useRef, useState } from "react";

const Media = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [playingVideo, setPlayingVideo] = useState(null);

  const videoRefs = useRef({});

  const filters = [
    { name: "All", value: "all" },
    { name: "Photos", value: "photos" },
    { name: "Videos", value: "videos" },
    { name: "Events", value: "events" },
    { name: "Community", value: "community" },
  ];

  const mediaItems = [
    {
      id: 1,
      type: "photos",
      category: "events",
      categoryLabel: "Events",
      image: "/images/nurse.jpg",
      alt: "YGI community event",
      title: "Community Engagement Programme",
      description:
        "Bringing communities together through meaningful engagement.",
    },

    {
      id: 2,
      type: "photos",
      category: "community",
      categoryLabel: "Community",
      image: "/images/Periop pic.jpg",
      alt: "Community empowerment",
      title: "Empowering Local Communities",
      description:
        "Supporting people and creating opportunities for sustainable development.",
    },

    {
      id: 3,
      type: "photos",
      category: "events",
      categoryLabel: "Events",
      image: "/images/Periop pic.jpg",
      alt: "YGI workshop",
      title: "Youth Development Workshop",
      description:
        "Creating platforms for young people to learn, connect and grow.",
    },

    {
      id: 4,
      type: "videos",
      category: "videos",
      categoryLabel: "Video",
      video: "/videos/Mood.mp4",
      title: "YGI Community Impact",
      description:
        "Watch highlights from our community initiatives.",
    },

    {
      id: 5,
      type: "photos",
      category: "community",
      categoryLabel: "Community",
      image: "/images/pharmacy 2.jpg",
      alt: "YGI volunteers",
      title: "Volunteers Making a Difference",
      description:
        "Our volunteers remain at the heart of our community work.",
    },

    {
      id: 6,
      type: "videos",
      category: "videos",
      categoryLabel: "Video",
      video: "/videos/Mood.mp4",
      title: "Green Economy in Lagos",
      description:
        "Highlights from our Green Economy Bridge Series.",
    },
  ];

  const filteredItems =
    activeFilter === "all"
      ? mediaItems
      : mediaItems.filter((item) => {
          if (activeFilter === "photos") {
            return item.type === "photos";
          }

          if (activeFilter === "videos") {
            return item.type === "videos";
          }

          return item.category === activeFilter;
        });

  const toggleVideo = (id) => {
    const video = videoRefs.current[id];

    if (!video) return;

    if (video.paused) {
      // Pause any other playing video
      Object.entries(videoRefs.current).forEach(([videoId, ref]) => {
        if (videoId !== String(id) && ref && !ref.paused) {
          ref.pause();
        }
      });

      video.play();
      setPlayingVideo(id);
    } else {
      video.pause();
      setPlayingVideo(null);
    }
  };

  const handleVideoEnded = () => {
    setPlayingVideo(null);
  };

  return (
    <div id="media" className="min-h-screen bg-white font-sans leading-[1.6] text-[#1b1b1b]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="relative flex min-h-[320px] items-center bg-cover bg-center px-4 sm:min-h-[440px] sm:px-0"
        style={{
          backgroundImage:
            "url('/images/media/media-banner.jpg')",
        }}
      >
        {/* HERO OVERLAY */}

        <div className="absolute inset-0 bg-[rgba(0,0,0,0.62)]" />

        <div className="relative z-10 mx-auto w-[92%] max-w-[1180px] text-center text-white">

          <span className="mb-3 inline-block text-[11px] font-bold tracking-[2.5px] text-[#68c886] sm:mb-[15px] sm:text-[13px] sm:tracking-[3px]">
            YUUMY GROUP INITIATIVE
          </span>

          <h1 className="mb-4 text-[clamp(2rem,9vw,4.2rem)] leading-[1.08] sm:mb-5 sm:text-[clamp(45px,7vw,75px)]">
            Our Media
          </h1>

          <p className="mx-auto max-w-[680px] text-[14px] leading-6 text-[#eeeeee] sm:text-[15px] sm:leading-7 md:text-lg">
            Explore the moments, people and stories behind our
            work to empower communities and create sustainable
            impact.
          </p>
        </div>
      </section>


      {/* =====================================================
          MEDIA INTRO
      ===================================================== */}

      <section className="py-[55px] sm:py-[70px] md:py-[100px]">
        <div className="mx-auto w-[90%] max-w-[1180px]">

          {/* SECTION HEADING */}

          <div className="mx-auto mb-[45px] max-w-[720px] text-center">

            <span className="text-[13px] font-bold tracking-[3px] text-[#16803c]">
              MEDIA GALLERY
            </span>

            <h2 className="my-3 text-[clamp(32px,5vw,48px)] leading-[1.2]">
              Stories That Inspire Change
            </h2>

            <p className="text-[#666]">
              Take a look at some of the moments captured during
              our programmes, community engagements, workshops
              and initiatives.
            </p>

          </div>


          {/* =================================================
              FILTERS
          ================================================= */}

          <div className="mb-8 flex flex-wrap justify-start gap-2 sm:mb-[50px] sm:justify-center sm:gap-[10px]">

            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={`rounded-[50px] border px-6 py-[11px] text-sm transition duration-300 ${
                  activeFilter === filter.value
                    ? "border-[#16803c] bg-[#16803c] text-white"
                    : "border-[#ddd] bg-white text-[#333] hover:border-[#16803c] hover:bg-[#16803c] hover:text-white"
                }`}
              >
                {filter.name}
              </button>
            ))}

          </div>


          {/* =================================================
              MEDIA GRID
          ================================================= */}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-7 lg:gap-7">

            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-[#eeeeee] bg-white transition duration-[350ms] hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.09)]"
              >

                {/* MEDIA IMAGE */}

                <div className="relative h-[240px] overflow-hidden sm:h-[260px] md:h-[270px]">

                  {item.type === "photos" ? (
                    <>
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
                      />

                      {/* IMAGE OVERLAY */}

                      <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.35)] opacity-0 transition duration-300 group-hover:opacity-100">

                        <button
                          type="button"
                          className="flex h-[55px] w-[55px] items-center justify-center rounded-full border-0 bg-white text-lg text-[#16803c] transition duration-300 hover:scale-110"
                          aria-label={`View ${item.title}`}
                        >
                          <i className="fa-solid fa-expand" />
                        </button>

                      </div>
                    </>
                  ) : (
                    <div className="relative h-full w-full">

                      <video
                        ref={(element) => {
                          videoRefs.current[item.id] = element;
                        }}
                        src={item.video}
                        muted
                        playsInline
                        preload="metadata"
                        onEnded={handleVideoEnded}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
                      />

                      {/* VIDEO PLAY BUTTON */}

                      <button
                        type="button"
                        onClick={() => toggleVideo(item.id)}
                        className="absolute left-1/2 top-1/2 flex h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-white text-[22px] text-[#16803c] shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition duration-300 hover:scale-110"
                        aria-label={
                          playingVideo === item.id
                            ? "Pause video"
                            : "Play video"
                        }
                      >
                        <i
                          className={`fa-solid ${
                            playingVideo === item.id
                              ? "fa-pause"
                              : "fa-play"
                          }`}
                        />
                      </button>
                    </div>
                  )}
                </div>


                {/* MEDIA INFO */}

                <div className="p-6">

                  <span className="text-xs font-bold uppercase tracking-[1.5px] text-[#16803c]">
                    {item.categoryLabel}
                  </span>

                  <h3 className="my-2 text-xl">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#777]">
                    {item.description}
                  </p>

                </div>
              </div>
            ))}

          </div>
        </div>
      </section>


      {/* =====================================================
          FEATURED VIDEO
      ===================================================== */}

      <section className="bg-[#f4f8f5] py-[100px] max-[600px]:py-[70px]">

        <div className="mx-auto grid w-[90%] max-w-[1180px] grid-cols-[1fr_1.2fr] items-center gap-[70px] max-[900px]:grid-cols-1 max-[900px]:gap-10">

          {/* CONTENT */}

          <div>

            <span className="mb-[15px] inline-block text-[13px] font-bold tracking-[3px] text-[#68c886]">
              FEATURED STORY
            </span>

            <h2 className="my-[10px] mb-5 text-[clamp(32px,5vw,52px)] leading-[1.15]">
              Creating Impact Through Action
            </h2>

            <p className="mb-[30px] max-w-[500px] text-[#666]">
              Discover how Yuumy Group Initiative is working
              with communities, young people and stakeholders
              to create meaningful and sustainable change.
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-[10px] rounded-md bg-[#16803c] px-[25px] py-[14px] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#0e5f2b]"
            >
              Watch Video

              <i className="fa-solid fa-arrow-right" />
            </a>

          </div>


          {/* FEATURED VIDEO */}

          <div className="relative h-[420px] overflow-hidden rounded-[20px] max-[600px]:h-[300px]">

            <video
              ref={(element) => {
                videoRefs.current.featured = element;
              }}
              src="/videos/Mood.mp4"
              muted
              playsInline
              preload="metadata"
              onEnded={() => setPlayingVideo(null)}
              className="h-full w-full object-cover"
            />

            <button
              type="button"
              onClick={() => toggleVideo("featured")}
              className="absolute left-1/2 top-1/2 flex h-[85px] w-[85px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-white text-[22px] text-[#16803c] shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition duration-300 hover:scale-110"
              aria-label={
                playingVideo === "featured"
                  ? "Pause featured video"
                  : "Play featured video"
              }
            >
              <i
                className={`fa-solid ${
                  playingVideo === "featured"
                    ? "fa-pause"
                    : "fa-play"
                }`}
              />
            </button>

          </div>

        </div>
      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section id="news" className="bg-[#16803c] px-5 py-[100px] text-center text-white max-[600px]:py-[70px]">

        <div className="mx-auto w-[90%] max-w-[1180px]">

          <h2 className="mb-[15px] text-[clamp(32px,5vw,50px)]">
            Be Part of the Story
          </h2>

          <p className="mx-auto mb-[30px] max-w-[650px] text-[#e7f5eb]">
            Follow our journey and discover how you can contribute
            to building stronger and more sustainable communities.
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-[10px] rounded-md bg-white px-[25px] py-[14px] font-semibold text-[#16803c] transition duration-300 hover:-translate-y-0.5 hover:bg-[#eeeeee]"
          >
            Get Involved
          </a>

        </div>
      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-[#111] text-white">

        <div className="mx-auto flex w-[90%] max-w-[1180px] items-center justify-between py-[50px] max-[600px]:flex-col max-[600px]:gap-[25px] max-[600px]:text-center">

          {/* FOOTER LOGO */}

          <a
            href="/"
            aria-label="Yuumy Group Initiative"
            className="inline-flex items-center gap-[14px] py-[6px] leading-none transition duration-300 hover:-translate-y-px"
          >
            <img
              src="/favicon.svg"
              alt="YGI Logo"
              className="h-14 w-14 shrink-0 rounded-[14px] border-2 border-[#ffbd59] bg-white object-contain p-[6px] shadow-[0_6px_16px_rgba(0,0,0,0.35),0_0_14px_rgba(255,189,89,0.18)]"
            />

            <span className="min-h-12 w-[3px] shrink-0 self-stretch rounded-[3px] bg-gradient-to-b from-[#ffbd59] to-[rgba(255,189,89,0.15)]" />

            <span className="flex flex-col justify-center gap-[3px]">
              <span className="text-[26px] font-extrabold tracking-[0.5px] text-[#68c886]">
                YGI
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[1.2px] text-[#ffbd59]">
                YUUMY GROUP INITIATIVE
              </span>
            </span>
          </a>


          {/* SOCIAL LINKS */}

          <div className="flex gap-3">

            <a
              href="#"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#444] transition duration-300 hover:border-[#16803c] hover:bg-[#16803c]"
            >
              <i className="fab fa-facebook-f" />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#444] transition duration-300 hover:border-[#16803c] hover:bg-[#16803c]"
            >
              <i className="fab fa-instagram" />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#444] transition duration-300 hover:border-[#16803c] hover:bg-[#16803c]"
            >
              <i className="fab fa-linkedin-in" />
            </a>

            <a
              href="#"
              aria-label="YouTube"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#444] transition duration-300 hover:border-[#16803c] hover:bg-[#16803c]"
            >
              <i className="fab fa-youtube" />
            </a>

          </div>
        </div>


        {/* COPYRIGHT */}

        <div className="border-t border-[#292929] px-5 py-5 text-center text-[13px] text-[#777]">
          © 2026 Yuumy Group Initiative. All Rights Reserved.
        </div>

      </footer>

    </div>
  );
};

export default Media;