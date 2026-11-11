import { useEffect, useRef, useState } from "react";
import moodVideo from "../assets/video/Mood.mp4";
import euroImage1 from "../assets/images/euro-image1.jpg";
import euroImage2 from "../assets/images/europageimage2.jpg";
import euroImage3 from "../assets/images/euroimage3.jpg";
import empowermentPic from "../assets/images/empoerment.jpg";
import leaderImage from "../assets/images/leaderimage.jpg";

const Media = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [playingVideo, setPlayingVideo] = useState(null);

  // Admin state (persisted across refreshes via localStorage as a demo
  // since we don't have a real auth backend yet).
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem("ygi_admin_mode") === "1";
    } catch {
      return false;
    }
  });

  // Keep admin login state in sync with login page by watching a flag.
  useEffect(() => {
    const syncAdmin = () => {
      try {
        setIsAdmin(localStorage.getItem("ygi_admin_mode") === "1");
      } catch { /* ignore */ }
    };
    window.addEventListener("storage", syncAdmin);
    // If the admin just logged in via the login page, a sessionStorage flag
    // may have been set. Read it once and apply.
    try {
      if (sessionStorage.getItem("ygi_admin_just_logged_in") === "1") {
        localStorage.setItem("ygi_admin_mode", "1");
        sessionStorage.removeItem("ygi_admin_just_logged_in");
        setIsAdmin(true);
      }
    } catch { /* ignore */ }
    return () => window.removeEventListener("storage", syncAdmin);
  }, []);

  const videoRefs = useRef({});
  const fileInputRef = useRef(null);

  const filters = [
    { name: "All", value: "all" },
    { name: "Photos", value: "photos" },
    { name: "Videos", value: "videos" },
    { name: "Events", value: "events" },
    { name: "Community", value: "community" },
  ];

  const [mediaItems, setMediaItems] = useState([
    {
      id: 1,
      type: "photos",
      category: "events",
      categoryLabel: "Events",
      image: euroImage1,
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
      image: euroImage2,
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
      video: moodVideo,
      title: "YGI Community Impact",
      description:
        "Watch highlights from our community initiatives.",
    },

    {
      id: 5,
      type: "photos",
      category: "community",
      categoryLabel: "Community",
      image: empowermentPic,
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
  ]);

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

  // ============== ADMIN ACTIONS ==============
  const deleteMediaItem = (id) => {
    if (!window.confirm("Delete this media item? This cannot be undone.")) return;
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Add-modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    type: "photos",
    category: "events",
    title: "",
    description: "",
    alt: "",
    file: null,
    filePreviewUrl: "",
  });

  const resetAddForm = () => {
    setNewItem({
      type: "photos",
      category: "events",
      title: "",
      description: "",
      alt: "",
      file: null,
      filePreviewUrl: "",
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openAddModal = () => {
    resetAddForm();
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    if (newItem.filePreviewUrl) {
      try { URL.revokeObjectURL(newItem.filePreviewUrl); } catch { /* ignore */ }
    }
    resetAddForm();
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // Revoke any previous preview URL
    if (newItem.filePreviewUrl) {
      try { URL.revokeObjectURL(newItem.filePreviewUrl); } catch { /* ignore */ }
    }

    const isVideo = file.type.startsWith("video/");
    const previewUrl = URL.createObjectURL(file);

    setNewItem((prev) => ({
      ...prev,
      file,
      filePreviewUrl: previewUrl,
      type: isVideo ? "videos" : "photos",
    }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newItem.title.trim()) {
      alert("Please enter a title.");
      return;
    }
    if (!newItem.file) {
      alert("Please select a photo or video to upload.");
      return;
    }

    const categoryLabelMap = {
      events: "Events",
      community: "Community",
      videos: "Video",
    };

    const itemToAdd = {
      id: Date.now(),
      type: newItem.type,
      category: newItem.type === "videos" ? "videos" : newItem.category,
      categoryLabel:
        newItem.type === "videos"
          ? "Video"
          : categoryLabelMap[newItem.category] || newItem.category,
      title: newItem.title.trim(),
      description: newItem.description.trim() || "No description.",
      ...(newItem.type === "photos"
        ? { image: newItem.filePreviewUrl, alt: newItem.alt.trim() || newItem.title }
        : { video: newItem.filePreviewUrl }),
    };

    setMediaItems((prev) => [itemToAdd, ...prev]);
    alert("Media item added successfully!");
    closeAddModal();
  };

  // Toggle admin mode from floating button (for demo)
  const toggleAdminMode = () => {
    if (isAdmin) {
      // Log out
      try {
        localStorage.removeItem("ygi_admin_mode");
        sessionStorage.removeItem("ygi_admin_just_logged_in");
      } catch { /* ignore */ }
      setIsAdmin(false);
    } else {
      // Prompt for admin pin (demo) — in production this uses the login page.
      const pin = window.prompt("Enter admin PIN to enable admin mode (demo: 1234)", "");
      if (pin === null) return;
      if (pin !== "1234") {
        alert("Invalid PIN.");
        return;
      }
      try { localStorage.setItem("ygi_admin_mode", "1"); } catch { /* ignore */ }
      setIsAdmin(true);
    }
  };

  return (
    <div id="media" className="min-h-screen bg-white font-sans leading-[1.6] text-[#1b1b1b]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="relative flex min-h-[320px] items-center bg-cover bg-center px-4 sm:min-h-[440px] sm:px-0"
        style={{
          backgroundImage: `url(${leaderImage})`,
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
                className="group relative overflow-hidden rounded-2xl border border-[#eeeeee] bg-white transition duration-[350ms] hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.09)]"
              >

                {/* ADMIN: DELETE BUTTON */}
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => deleteMediaItem(item.id)}
                    aria-label="Delete media item"
                    className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-red-500/95 text-white shadow-[0_10px_25px_rgba(239,68,68,0.35)] transition-all duration-200 hover:scale-110 hover:bg-red-600"
                  >
                    <i className="fa-solid fa-trash" />
                  </button>
                )}

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

            {/* ADMIN: ADD NEW MEDIA CARD */}
            {isAdmin && (
              <button
                type="button"
                onClick={openAddModal}
                className="group flex min-h-[360px] flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border-2 border-dashed border-[#16803c]/45 bg-[#f2faf4] p-6 text-[#16803c] transition-all duration-300 hover:-translate-y-2 hover:border-[#16803c] hover:bg-white hover:shadow-[0_20px_45px_rgba(22,128,60,0.18)]"
              >
                <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[#16803c] text-[34px] text-white shadow-[0_14px_34px_rgba(22,128,60,0.35)] transition-transform duration-300 group-hover:scale-110">
                  <i className="fa-solid fa-plus" />
                </div>
                <div className="text-center">
                  <span className="text-lg font-bold">Add New Media</span>
                  <p className="mt-1 text-sm text-[#3d7d57]">
                    Upload photos, videos, events or community stories
                  </p>
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-[#3d7d57]">
                  <span className="rounded-full bg-[#16803c]/10 px-3 py-1 font-semibold"><i className="fa-solid fa-camera mr-1"/>Photos</span>
                  <span className="rounded-full bg-[#16803c]/10 px-3 py-1 font-semibold"><i className="fa-solid fa-video mr-1"/>Videos</span>
                  <span className="rounded-full bg-[#16803c]/10 px-3 py-1 font-semibold"><i className="fa-solid fa-calendar mr-1"/>Events</span>
                  <span className="rounded-full bg-[#16803c]/10 px-3 py-1 font-semibold"><i className="fa-solid fa-people-group mr-1"/>Community</span>
                </div>
              </button>
            )}

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
              src={moodVideo}
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
          FLOATING ADMIN TOGGLE (gear icon)
      ===================================================== */}
      <button
        type="button"
        onClick={toggleAdminMode}
        className={`fixed bottom-6 right-6 z-50 flex h-[58px] w-[58px] items-center justify-center rounded-full border-2 shadow-[0_18px_48px_rgba(0,0,0,0.32)] transition-all duration-300 hover:-translate-y-1 sm:bottom-8 sm:right-8 sm:h-[66px] sm:w-[66px] ${
          isAdmin
            ? "border-[#ffbd59] bg-[#ffbd59] text-[#1a1208]"
            : "border-white/20 bg-[#140c00]/90 text-white backdrop-blur-md hover:bg-[#1a1208]"
        }`}
        aria-label={isAdmin ? "Admin mode active — tap to logout" : "Enable admin mode"}
        title={isAdmin ? "Admin mode: ON (tap to logout)" : "Enable admin mode"}
      >
        <i className={`fa-solid ${isAdmin ? "fa-user-shield" : "fa-gear"} text-[18px] sm:text-[20px]`} />
      </button>

      {/* Small admin indicator badge */}
      {isAdmin && (
        <div className="fixed bottom-[98px] right-6 z-50 hidden items-center gap-2 rounded-full border border-[#ffbd59]/45 bg-[#140c00]/85 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[1.2px] text-[#ffbd59] shadow-[0_10px_28px_rgba(0,0,0,0.35)] backdrop-blur-md sm:flex sm:bottom-[112px] sm:right-8">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ffbd59] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ffbd59]" />
          </span>
          Admin Mode
        </div>
      )}


      {/* =====================================================
          ADD MEDIA MODAL
      ===================================================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-8 sm:px-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/65 backdrop-blur-[3px]"
            onClick={closeAddModal}
            aria-hidden="true"
          />

          {/* Modal card */}
          <div className="relative w-full max-w-[580px] max-h-[92vh] overflow-y-auto rounded-[22px] border border-[#16803c]/25 bg-white p-[24px] shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-[34px]">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[2.5px] text-[#16803c] sm:text-[12px]">
                  Admin · Media Manager
                </span>
                <h3 className="mt-1.5 text-[clamp(1.35rem,4.5vw,1.8rem)] font-bold leading-tight text-[#140c00]">
                  Add New Media
                </h3>
                <p className="mt-1.5 text-sm text-[#666]">
                  Upload a photo or video and assign it to a category.
                </p>
              </div>
              <button
                type="button"
                onClick={closeAddModal}
                aria-label="Close"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1f1f1] text-[#555] transition-colors hover:bg-[#e7e7e7] hover:text-[#111]"
              >
                <i className="fa-solid fa-xmark text-[16px]" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="flex flex-col gap-4.5">
              {/* TYPE (auto-set based on file, but allow explicit toggle too) */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setNewItem((p) => ({ ...p, type: "photos" }))}
                  className={`flex items-center justify-center gap-2 rounded-[14px] border-2 px-4 py-3 text-sm font-semibold transition-all ${
                    newItem.type === "photos"
                      ? "border-[#16803c] bg-[#16803c] text-white"
                      : "border-[#e4e4e4] bg-white text-[#444] hover:border-[#16803c]/50"
                  }`}
                >
                  <i className="fa-solid fa-camera" />
                  Photo
                </button>
                <button
                  type="button"
                  onClick={() => setNewItem((p) => ({ ...p, type: "videos" }))}
                  className={`flex items-center justify-center gap-2 rounded-[14px] border-2 px-4 py-3 text-sm font-semibold transition-all ${
                    newItem.type === "videos"
                      ? "border-[#16803c] bg-[#16803c] text-white"
                      : "border-[#e4e4e4] bg-white text-[#444] hover:border-[#16803c]/50"
                  }`}
                >
                  <i className="fa-solid fa-video" />
                  Video
                </button>
              </div>

              {/* CATEGORY */}
              {newItem.type === "photos" && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="newCategory" className="text-[11px] font-semibold uppercase tracking-[1.4px] text-[#16803c] sm:text-[12px]">
                    Category
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-folder pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-[#999]" />
                    <select
                      id="newCategory"
                      value={newItem.category}
                      onChange={(e) => setNewItem((p) => ({ ...p, category: e.target.value }))}
                      className="w-full appearance-none rounded-[14px] border border-[#e1e1e1] bg-white py-3.5 pl-11 pr-11 text-[14px] text-[#111] outline-none transition-all focus:border-[#16803c] focus:shadow-[0_0_0_3px_rgba(22,128,60,0.12)]"
                    >
                      <option value="events">Events</option>
                      <option value="community">Community</option>
                    </select>
                    <i className="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[11px] text-[#999]" />
                  </div>
                </div>
              )}

              {/* TITLE */}
              <div className="flex flex-col gap-2">
                <label htmlFor="newTitle" className="text-[11px] font-semibold uppercase tracking-[1.4px] text-[#16803c] sm:text-[12px]">
                  Title
                </label>
                <div className="relative">
                  <i className="fa-solid fa-heading pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-[#999]" />
                  <input
                    id="newTitle"
                    type="text"
                    required
                    value={newItem.title}
                    onChange={(e) => setNewItem((p) => ({ ...p, title: e.target.value }))}
                    placeholder="e.g. Youth Empowerment Summit 2025"
                    className="w-full rounded-[14px] border border-[#e1e1e1] bg-white py-3.5 pl-11 pr-4 text-[14px] text-[#111] placeholder-[#aaa] outline-none transition-all focus:border-[#16803c] focus:shadow-[0_0_0_3px_rgba(22,128,60,0.12)]"
                  />
                </div>
              </div>

              {/* ALT TEXT (for photos) */}
              {newItem.type === "photos" && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="newAlt" className="text-[11px] font-semibold uppercase tracking-[1.4px] text-[#16803c] sm:text-[12px]">
                    Alt Text (Accessibility)
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-image pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-[#999]" />
                    <input
                      id="newAlt"
                      type="text"
                      value={newItem.alt}
                      onChange={(e) => setNewItem((p) => ({ ...p, alt: e.target.value }))}
                      placeholder="Describe the photo in one sentence"
                      className="w-full rounded-[14px] border border-[#e1e1e1] bg-white py-3.5 pl-11 pr-4 text-[14px] text-[#111] placeholder-[#aaa] outline-none transition-all focus:border-[#16803c] focus:shadow-[0_0_0_3px_rgba(22,128,60,0.12)]"
                    />
                  </div>
                </div>
              )}

              {/* DESCRIPTION */}
              <div className="flex flex-col gap-2">
                <label htmlFor="newDesc" className="text-[11px] font-semibold uppercase tracking-[1.4px] text-[#16803c] sm:text-[12px]">
                  Description
                </label>
                <div className="relative">
                  <i className="fa-solid fa-align-left pointer-events-none absolute left-4 top-[18px] text-[13px] text-[#999]" />
                  <textarea
                    id="newDesc"
                    rows={3}
                    value={newItem.description}
                    onChange={(e) => setNewItem((p) => ({ ...p, description: e.target.value }))}
                    placeholder="Brief description of the story behind this media…"
                    className="w-full resize-none rounded-[14px] border border-[#e1e1e1] bg-white py-3.5 pl-11 pr-4 text-[14px] leading-6 text-[#111] placeholder-[#aaa] outline-none transition-all focus:border-[#16803c] focus:shadow-[0_0_0_3px_rgba(22,128,60,0.12)]"
                  />
                </div>
              </div>

              {/* FILE UPLOAD + PREVIEW */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[1.4px] text-[#16803c] sm:text-[12px]">
                  Upload {newItem.type === "photos" ? "Photo" : "Video"}
                </span>
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[16px] border-2 border-dashed border-[#16803c]/40 bg-[#f2faf4] px-5 py-6 text-center transition-all hover:border-[#16803c]/70 hover:bg-[#e7f5eb]">
                  {newItem.filePreviewUrl ? (
                    <div className="w-full">
                      <div className="mx-auto mb-3 max-w-[280px] overflow-hidden rounded-[14px] border border-[#16803c]/25 bg-black">
                        {newItem.type === "photos" ? (
                          <img src={newItem.filePreviewUrl} alt="Preview" className="max-h-[200px] w-full object-cover" />
                        ) : (
                          <video
                            src={newItem.filePreviewUrl}
                            muted
                            playsInline
                            className="max-h-[200px] w-full object-cover"
                          />
                        )}
                      </div>
                      <span className="text-[13px] font-semibold text-[#16803c]">
                        {newItem.file?.name || "File ready"}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (newItem.filePreviewUrl) {
                            try { URL.revokeObjectURL(newItem.filePreviewUrl); } catch { /* ignore */ }
                          }
                          resetAddForm();
                        }}
                        className="mt-2 text-xs font-semibold text-red-500 hover:underline"
                      >
                        <i className="fa-solid fa-xmark mr-1"/> Remove and choose another
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#16803c] text-xl text-white shadow-[0_10px_24px_rgba(22,128,60,0.3)]">
                        <i className={`fa-solid ${newItem.type === "photos" ? "fa-cloud-arrow-up" : "fa-film"}`} />
                      </div>
                      <div>
                        <span className="text-[14px] font-semibold text-[#1b1b1b]">
                          Click to select a {newItem.type === "photos" ? "photo" : "video"}
                        </span>
                        <p className="mt-1 text-[12px] text-[#666]">
                          or drag & drop — JPG, PNG, MP4, WEBM supported
                        </p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept={newItem.type === "photos" ? "image/*" : "video/*"}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </>
                  )}
                </label>
                {/* Hidden input in case preview shown but user wants to swap (the label above covers it) */}
                {newItem.filePreviewUrl && (
                  <input
                    type="file"
                    accept={newItem.type === "photos" ? "image/*" : "video/*"}
                    onChange={handleFileChange}
                    className="hidden"
                    id="replace-file-hidden"
                  />
                )}
              </div>

              {/* ACTIONS */}
              <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="rounded-[14px] border border-[#e1e1e1] bg-white px-6 py-3 text-sm font-semibold text-[#555] transition-colors hover:bg-[#f6f6f6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-[14px] bg-[#16803c] px-6 py-3 text-sm font-bold uppercase tracking-[1.5px] text-white shadow-[0_12px_30px_rgba(22,128,60,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#0e5f2b]"
                >
                  <i className="fa-solid fa-plus mr-1.5" />
                  Add Media
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Media;