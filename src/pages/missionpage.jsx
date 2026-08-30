import { useState } from "react";

const MissionVision = () => {
  const values = [
    {
      number: "01",
      icon: "fa-hand-holding-heart",
      title: "Empowerment",
      description:
        "We believe people are capable of creating change when they have access to the right knowledge, resources and opportunities.",
    },
    {
      number: "02",
      icon: "fa-people-group",
      title: "Inclusion",
      description:
        "We create spaces where diverse voices are valued, respected and given the opportunity to contribute.",
    },
    {
      number: "03",
      icon: "fa-lightbulb",
      title: "Innovation",
      description:
        "We embrace new ideas, technology and creative approaches to solving challenges and creating impact.",
    },
    {
      number: "04",
      icon: "fa-leaf",
      title: "Sustainability",
      description:
        "We promote solutions that create lasting value for people, communities and the environment.",
    },
    {
      number: "05",
      icon: "fa-shield-heart",
      title: "Integrity",
      description:
        "We act with honesty, accountability and transparency in everything we do.",
    },
    {
      number: "06",
      icon: "fa-handshake",
      title: "Collaboration",
      description:
        "We believe sustainable impact is achieved by working together with communities, partners and stakeholders.",
    },
  ];

  return (
    <div id="about" className="min-h-screen bg-white text-[#1b1b1b] font-sans">
      {/* ================= HERO ================= */}
      <section
        className="relative flex min-h-[320px] items-center justify-center bg-cover bg-center px-4 text-center sm:min-h-[400px] sm:px-5 md:min-h-[470px]"
        style={{
          backgroundImage: "url('/images/mission-banner.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(4,66,31,0.9)] to-[rgba(0,0,0,0.55)]" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-[800px] text-white">
          <span className="mb-3 inline-block text-[11px] font-bold tracking-[3px] text-[#72d493] sm:mb-[18px] sm:text-[13px] sm:tracking-[4px]">
            WHO WE ARE
          </span>

          <h1 className="mb-4 text-[clamp(1.7rem,6vw,3rem)] font-bold leading-[1.08] sm:mb-5 sm:text-5xl md:text-[clamp(42px,6vw,68px)]">
            Mission, Vision & Core Values
          </h1>

          <p className="mx-auto max-w-[650px] text-[14px] leading-6 text-[#e8e8e8] sm:text-[15px] sm:leading-7 md:text-lg">
            Building a future where people, communities and opportunities
            thrive together.
          </p>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="bg-white py-[50px] sm:py-[75px] md:py-[110px]">
        <div className="mx-auto w-[92%] max-w-[1180px]">
          {/* Section Heading */}
          <div className="mx-auto mb-10 max-w-[750px] text-center sm:mb-[60px]">
            <span className="text-[11px] font-bold tracking-[2.5px] text-[#16803c] sm:text-[13px] sm:tracking-[3px]">
              OUR PURPOSE
            </span>

            <h2 className="my-2 text-[clamp(1.5rem,5vw,2.6rem)] font-bold leading-tight sm:my-3 sm:text-5xl">
              Driven by Purpose. Guided by Impact.
            </h2>

            <p className="text-[14px] leading-6 text-[#6b6b6b] sm:text-base sm:leading-7">
              At Yuumy Group Initiative, our work is rooted in a commitment to
              creating meaningful opportunities, strengthening communities and
              supporting sustainable development.
            </p>
          </div>

          {/* Purpose Cards */}
          <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-2">
            {/* Mission */}
            <div className="group flex min-h-[360px] flex-col gap-5 overflow-hidden rounded-[20px] border border-[#d9eddf] bg-[#f0f8f2] p-[30px] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] sm:p-[45px] md:flex-row md:gap-[30px]">
              <div className="flex h-[70px] min-h-[70px] w-[70px] min-w-[70px] items-center justify-center rounded-2xl bg-[#16803c] text-[27px] text-white">
                <i className="fa-solid fa-bullseye" />
              </div>

              <div>
                <span className="text-xs font-extrabold tracking-[2px] text-[#16803c]">
                  OUR MISSION
                </span>

                <h3 className="my-[10px] mb-[18px] text-[25px] font-bold leading-[1.3] sm:text-[28px]">
                  Empowering People, Transforming Communities
                </h3>

                <p className="leading-7 text-[#666]">
                  To empower individuals and communities through innovative
                  initiatives, inclusive opportunities, knowledge sharing and
                  sustainable solutions that create lasting social and economic
                  impact.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="group flex min-h-[360px] flex-col gap-5 overflow-hidden rounded-[20px] border border-[#e1e8e2] bg-[#f5f8f5] p-[30px] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] sm:p-[45px] md:flex-row md:gap-[30px]">
              <div className="flex h-[70px] min-h-[70px] w-[70px] min-w-[70px] items-center justify-center rounded-2xl bg-[#102f1d] text-[27px] text-white">
                <i className="fa-solid fa-eye" />
              </div>

              <div>
                <span className="text-xs font-extrabold tracking-[2px] text-[#16803c]">
                  OUR VISION
                </span>

                <h3 className="my-[10px] mb-[18px] text-[25px] font-bold leading-[1.3] sm:text-[28px]">
                  A More Inclusive and Sustainable Future
                </h3>

                <p className="leading-7 text-[#666]">
                  To become a leading force for positive change, creating
                  empowered communities where every individual has the
                  opportunity to participate, innovate and thrive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="bg-[#f7f9f7] py-[75px] sm:py-[110px]">
        <div className="mx-auto w-[90%] max-w-[1180px]">
          {/* Heading */}
          <div className="mx-auto mb-[55px] max-w-[750px] text-center">
            <span className="text-[13px] font-bold tracking-[3px] text-[#16803c]">
              WHAT GUIDES US
            </span>

            <h2 className="my-3 text-[34px] font-bold leading-tight sm:text-5xl">
              Our Core Values
            </h2>

            <p className="text-base leading-7 text-[#6b6b6b]">
              These principles shape how we work, how we serve communities and
              how we build partnerships.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 sm:gap-[25px]">
            {values.map((value) => (
              <div
                key={value.number}
                className="group relative overflow-hidden rounded-[18px] border border-[#e8e8e8] bg-white p-[30px] transition-all duration-300 hover:-translate-y-2 hover:border-[#16803c] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] sm:p-[35px]"
              >
                {/* Number */}
                <span className="absolute right-[25px] top-[18px] text-[40px] font-extrabold text-[#edf3ee]">
                  {value.number}
                </span>

                {/* Icon */}
                <div className="relative z-10 mb-[25px] flex h-[60px] w-[60px] items-center justify-center rounded-[14px] bg-[#eaf6ed] text-[22px] text-[#16803c]">
                  <i className={`fa-solid ${value.icon}`} />
                </div>

                <h3 className="relative z-10 mb-3 text-[23px] font-bold">
                  {value.title}
                </h3>

                <p className="relative z-10 text-[15px] leading-7 text-[#707070]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLOSING STATEMENT ================= */}
      <section className="bg-gradient-to-br from-[#0c5c2c] to-[#16803c] px-5 py-[75px] text-white sm:py-[110px]">
        <div className="mx-auto max-w-[850px] text-center">
          <div className="mx-auto mb-[30px] flex h-[65px] w-[65px] items-center justify-center rounded-full bg-[rgba(255,255,255,0.15)] text-[22px]">
            <i className="fa-solid fa-quote-left" />
          </div>

          <h2 className="mb-[25px] text-[32px] font-bold leading-tight sm:text-5xl">
            We don't just envision change.{" "}
            <span className="text-[#8ce0a5]">We work to make it happen.</span>
          </h2>

          <p className="mx-auto max-w-[700px] text-base leading-7 text-[#e5f5e9]">
            Through collaboration, innovation and community-driven action, YGI
            continues to build pathways toward a more inclusive and sustainable
            future.
          </p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#111111] text-white">
        <div className="mx-auto flex w-[90%] max-w-[1180px] flex-col items-center justify-between gap-[25px] py-[50px] md:flex-row md:text-left">
          {/* Footer Logo */}
          <a
            href="#"
            className="inline-flex items-center gap-[14px] py-1.5 leading-none transition-transform duration-300 hover:-translate-y-px"
            aria-label="Yuumy Group Initiative"
          >
            <img
              src="/favicon.svg"
              alt="YGI Logo"
              className="h-14 w-14 shrink-0 rounded-[14px] border-2 border-[#ffbd59] bg-white object-contain p-1.5 shadow-[0_6px_16px_rgba(0,0,0,0.35),0_0_14px_rgba(255,189,89,0.18)]"
            />

            <span className="min-h-12 w-[3px] shrink-0 self-stretch rounded-[3px] bg-gradient-to-b from-[#ffbd59] to-[rgba(255,189,89,0.15)]" />

            <span className="flex flex-col justify-center gap-[3px]">
              <span className="text-[26px] font-extrabold leading-none tracking-[0.5px] text-[#68c886]">
                YGI
              </span>

              <span className="text-[10px] font-semibold uppercase leading-none tracking-[1.2px] text-[#ffbd59]">
                YUUMY GROUP INITIATIVE
              </span>
            </span>
          </a>

          {/* Social Links */}
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#444] transition-all duration-300 hover:border-[#16803c] hover:bg-[#16803c]"
            >
              <i className="fab fa-facebook-f" />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#444] transition-all duration-300 hover:border-[#16803c] hover:bg-[#16803c]"
            >
              <i className="fab fa-instagram" />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#444] transition-all duration-300 hover:border-[#16803c] hover:bg-[#16803c]"
            >
              <i className="fab fa-linkedin-in" />
            </a>

            <a
              href="#"
              aria-label="YouTube"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#444] transition-all duration-300 hover:border-[#16803c] hover:bg-[#16803c]"
            >
              <i className="fab fa-youtube" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#292929] px-5 py-5 text-center text-[13px] text-[#777]">
          © 2026 Yuumy Group Initiative. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default MissionVision;