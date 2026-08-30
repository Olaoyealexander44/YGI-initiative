import { useState } from "react";
import {
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
  FaArrowRight,
  FaPeopleGroup,
  FaFacebookF,
} from "react-icons/fa6";
import leaderImage from "../assets/images/leaderimage.jpg";
import euroImage1 from "../assets/images/euro-image1.jpg";
import euroImage2 from "../assets/images/europageimage2.jpg";
import euroImage3 from "../assets/images/euroimage3.jpg";
import empowermentPic from "../assets/images/empoerment.jpg";

const leadershipTeam = [
  {
    name: "Alexander Olaoye",
    role: "Founder & Executive Director",
    image: leaderImage,
    description:
      "Provides strategic leadership and drives the initiative's vision, partnerships and community development programmes.",
    socials: ["linkedin", "twitter", "instagram"],
  },
  {
    name: "Team Member Name",
    role: "Programme Director",
    image: euroImage1,
    description:
      "Oversees programmes and ensures that projects are effectively implemented and aligned with our mission.",
    socials: ["linkedin", "instagram"],
  },
  {
    name: "Team Member Name",
    role: "Operations Director",
    image: euroImage2,
    description:
      "Coordinates organisational operations and helps ensure effective delivery of our programmes and activities.",
    socials: ["linkedin", "instagram"],
  },
];

const programmeTeam = [
  {
    name: "Team Member Name",
    role: "Project Coordinator",
    image: euroImage3,
    description:
      "Coordinates projects and works closely with communities and stakeholders.",
    socials: ["linkedin", "instagram"],
  },
  {
    name: "Team Member Name",
    role: "Communications Lead",
    image: empowermentPic,
    description:
      "Leads communication, storytelling, media and public engagement activities.",
    socials: ["linkedin", "instagram"],
  },
  {
    name: "Team Member Name",
    role: "Community Engagement Officer",
    image: euroImage1,
    description:
      "Builds relationships with communities, volunteers and local partners.",
    socials: ["linkedin", "instagram"],
  },
];

const SocialIcon = ({ type }) => {
  if (type === "linkedin") return <FaLinkedinIn />;
  if (type === "instagram") return <FaInstagram />;
  if (type === "twitter") return <FaXTwitter />;
  return null;
};

const TeamCard = ({ member }) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#e5ebe7] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(18,47,32,0.12)]">
      {/* Image */}
      <div className="relative h-[300px] overflow-hidden bg-[#dce9e1] sm:h-[340px] md:h-[360px]">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Socials */}
        <div
          className="
            absolute bottom-5 left-1/2 flex -translate-x-1/2 translate-y-5 gap-2
            opacity-0 transition-all duration-300
            group-hover:translate-y-0 group-hover:opacity-100
            max-sm:translate-y-0 max-sm:opacity-100
          "
        >
          {member.socials.map((social) => (
            <a
              key={social}
              href="#"
              aria-label={social}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#16834b] transition-colors duration-300 hover:bg-[#16834b] hover:text-white"
            >
              <SocialIcon type={social} />
            </a>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-[27px]">
        <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.8px] text-[#16834b]">
          {member.role}
        </span>

        <h3 className="mb-3 text-[23px] font-bold text-[#17231d]">
          {member.name}
        </h3>

        <p className="mb-5 text-sm leading-6 text-[#6b7770]">
          {member.description}
        </p>

        <a
          href="#"
          className="group/link inline-flex items-center gap-2 text-sm font-bold text-[#16834b]"
        >
          View Profile
          <FaArrowRight className="transition-transform duration-300 group-hover/link:translate-x-1" />
        </a>
      </div>
    </article>
  );
};

const TeamSection = ({ label, title, description, members, light = false }) => {
  return (
    <section className={`py-[50px] pb-[65px] sm:py-[70px] sm:pb-[100px] ${light ? "bg-[#f6f9f7]" : "bg-white"}`}>
      <div className="mx-auto w-[92%] max-w-[1180px]">
        {/* Section heading */}
        <div className="mb-10 flex items-end justify-between gap-12 max-md:block">
          <div>
            <span className="mb-2 block text-xs font-extrabold tracking-[2px] text-[#16834b]">
              {label}
            </span>

            <h2 className="text-[32px] font-bold leading-tight text-[#17231d] max-md:text-[27px]">
              {title}
            </h2>
          </div>

          <p className="max-w-[450px] text-[15px] leading-6 text-[#6b7770] max-md:mt-4">
            {description}
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-7">
          {members.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Team() {
  return (
    <div id="team" className="min-h-screen bg-white font-sans text-[#17231d]">

      {/* ================= HERO ================= */}
      <section
        className="
          relative flex min-h-[340px] items-center bg-cover bg-center px-4
          bg-[linear-gradient(rgba(7,50,30,0.88),rgba(7,50,30,0.82)),linear-gradient(135deg,#0e6338,#16834b)]
          sm:min-h-[420px]
          sm:px-0
          md:min-h-[470px]
        "
      >
        <div className="mx-auto w-[92%] max-w-[1180px]">
          <div className="relative z-10 text-white">
            <span className="mb-3 inline-block text-[11px] font-extrabold tracking-[1.8px] text-[#9de0b8] sm:mb-[18px] sm:text-[13px] sm:tracking-[2px]">
              MEET OUR TEAM
            </span>

            <h1 className="mb-4 max-w-[700px] text-[clamp(1.9rem,7vw,3.5rem)] font-bold leading-[1.05] sm:mb-[22px] md:text-[clamp(42px,6vw,68px)]">
              The People Behind{" "}
              <span className="text-[#76d69f]">Our Mission</span>
            </h1>

            <p className="mb-6 max-w-[650px] text-[14px] leading-6 text-[#e0eee6] sm:mb-[30px] sm:text-[15px] md:text-[17px] md:leading-7">
              Meet the passionate people working together to create
              opportunities, empower communities and drive meaningful
              change.
            </p>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[13px] sm:gap-2.5 sm:text-sm">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-[#78d59f] transition hover:text-[#9de0b8]"
              >
                Home
              </button>

              <FaArrowRight className="text-[8px] text-[#c5d5cc] sm:text-[9px]" />

              <span>Our Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="py-[55px] pb-8 sm:py-[70px] sm:pb-10 md:py-[100px] md:pb-[60px]">
        <div className="mx-auto w-[92%] max-w-[1180px]">
          <div className="mx-auto max-w-[760px] text-center">
            <span className="mb-3 block text-xs font-extrabold tracking-[2px] text-[#16834b]">
              OUR PEOPLE
            </span>

            <h2 className="mb-5 text-[clamp(32px,4vw,46px)] font-bold leading-[1.15]">
              Passionate People,{" "}
              <strong className="text-[#16834b]">Shared Purpose</strong>
            </h2>

            <p className="text-base leading-7 text-[#6b7770]">
              Our team brings together people with diverse experiences,
              skills and perspectives. Together, we work to build
              sustainable solutions and create lasting impact in the
              communities we serve.
            </p>
          </div>
        </div>
      </section>

      {/* ================= LEADERSHIP ================= */}
      <TeamSection
        label="LEADERSHIP"
        title="Leadership Team"
        description="Our leadership team provides strategic direction and ensures that our mission remains at the heart of everything we do."
        members={leadershipTeam}
      />

      {/* ================= PROGRAMME TEAM ================= */}
      <TeamSection
        label="OUR TEAM"
        title="Programme & Project Team"
        description="The people responsible for turning ideas into practical programmes and community impact."
        members={programmeTeam}
        light
      />

      {/* ================= JOIN ================= */}
      <section id="contact" className="bg-[#0e6338] py-[90px] text-white">
        <div className="mx-auto w-[92%] max-w-[1180px]">
          <div className="flex items-center gap-[35px] max-md:flex-col max-md:items-start">

            {/* Icon */}
            <div className="flex h-[90px] w-[90px] shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.12] text-[32px]">
              <FaPeopleGroup />
            </div>

            {/* Content */}
            <div>
              <span className="mb-2 block text-xs font-extrabold tracking-[2px] text-[#9de0b8]">
                JOIN THE MOVEMENT
              </span>

              <h2 className="mb-2.5 text-[38px] font-bold max-sm:text-[30px]">
                Be Part of Our Team
              </h2>

              <p className="mb-6 max-w-[720px] text-[#d6e8dd]">
                Do you want to contribute your skills, ideas and passion
                to our mission? Join our growing community of volunteers
                and changemakers.
              </p>

              <a
                href="/contact"
                className="inline-flex items-center gap-2.5 rounded-[7px] bg-white px-[22px] py-[13px] text-sm font-extrabold text-[#0e6338] transition hover:-translate-y-0.5 hover:bg-[#dff3e7]"
              >
                Become a Volunteer
                <FaArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#101a15] text-white">
        <div className="mx-auto flex min-h-[170px] w-[92%] max-w-[1180px] items-center justify-between gap-8 max-md:flex-col max-md:items-start max-md:py-[45px]">

          <div>
            <h3 className="mb-2 text-[17px] font-bold">
              YUUMY GROUP INITIATIVE
            </h3>

            <p className="max-w-[450px] text-sm text-[#9ba8a1]">
              Empowering people. Strengthening communities. Creating
              sustainable impact.
            </p>
          </div>

          {/* Socials */}
          <div className="flex gap-2">
            <a
              href="#"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#1c2922] transition hover:bg-[#16834b]"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#1c2922] transition hover:bg-[#16834b]"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#1c2922] transition hover:bg-[#16834b]"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="#"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#1c2922] transition hover:bg-[#16834b]"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>

        <div className="border-t border-[#26342c] px-5 py-5 text-center text-[13px] text-[#7e8a83]">
          © 2026 Yuumy Group Initiative. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}