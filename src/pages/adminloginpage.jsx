import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ygiLogo from "../assets/images/Blue Orange And Red Modern People Network Logo.svg";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder - replace with actual auth logic
    console.log("Admin login:", formData);

    // Activate admin mode for the Media page (front-end demo until backend auth).
    try {
      localStorage.setItem("ygi_admin_mode", "1");
      sessionStorage.setItem("ygi_admin_just_logged_in", "1");
    } catch {
      // localStorage/sessionStorage may be disabled; ignore.
    }

    alert("Signed in successfully! Welcome back.");
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#140c00] via-[#1a1208] to-[#0f0a04] font-[Poppins] text-white">
      {/* Top Nav / Logo */}
      <div className="relative z-10 px-4 py-5 sm:px-8 sm:py-8">
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between">
          {/* Logo */}
          <button
            onClick={goHome}
            className="flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="relative flex items-center justify-center">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full bg-white/20 blur-xl"
              />
              <img
                src={ygiLogo}
                alt="YGI Logo"
                className="relative z-10 h-12 w-12 object-contain brightness-110 saturate-125 drop-shadow-[0_8px_22px_rgba(255,255,255,0.3)] sm:h-16 sm:w-16"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-extrabold tracking-[1.2px] text-white sm:text-2xl">YGI</span>
              <span className="text-[8px] font-medium uppercase tracking-[1px] text-[#ffd79c] sm:text-[9px]">
                YUUMY GROUP INITIATIVE
              </span>
            </div>
          </button>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="hidden text-[11px] sm:block">
            <ol className="flex items-center gap-2 text-white/70">
              <li>
                <button
                  onClick={goHome}
                  className="transition-colors hover:text-[#ffbd59]"
                >
                  Home
                </button>
              </li>
              <li className="text-[#ffbd59]">/</li>
              <li className="text-[#ffbd59]">Admin</li>
              <li className="text-[#ffbd59]">/</li>
              <li className="text-white">Login</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Card */}
      <section className="relative z-10 flex items-center justify-center px-4 pb-20 pt-5 sm:px-6 sm:pt-10">
        <div className="w-full max-w-[460px]">
          {/* Heading */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-[62px] w-[62px] items-center justify-center rounded-[18px] border border-[#ffbd59]/45 bg-[#ffbd59]/10 text-[26px] text-[#ffbd59] shadow-[0_0_24px_rgba(255,189,89,0.18)] backdrop-blur">
              <i className="fa-solid fa-shield-halved" />
            </div>
            <span className="mb-2 inline-block text-[10px] font-bold uppercase tracking-[3.5px] text-[#ffd79c] sm:text-[11px]">
              ADMIN PORTAL
            </span>
            <h1 className="mb-2 text-[clamp(1.7rem,5vw,2.3rem)] font-bold leading-tight sm:text-[34px]">
              Welcome Back
            </h1>
            <p className="text-[13px] leading-6 text-white/60 sm:text-[14px]">
              Sign in to manage YGI initiatives, content and community.
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-[22px] border border-[#ffbd59]/25 bg-[rgba(255,255,255,0.04)] p-[26px] shadow-[0_22px_60px_rgba(0,0,0,0.45)] backdrop-blur-[14px] sm:p-[34px]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-[1.4px] text-[#ffd79c] sm:text-[12px]">
                  Email Address
                </label>
                <div className="relative">
                  <i className="fa-solid fa-envelope pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-white/40" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@ygi.org"
                    className="w-full rounded-[14px] border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-[14px] text-white placeholder-white/30 outline-none transition-all duration-200 focus:border-[#ffbd59]/70 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(255,189,89,0.12)]"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-[11px] font-semibold uppercase tracking-[1.4px] text-[#ffd79c] sm:text-[12px]">
                  Password
                </label>
                <div className="relative">
                  <i className="fa-solid fa-lock pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-white/40" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full rounded-[14px] border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-12 text-[14px] text-white placeholder-white/30 outline-none transition-all duration-200 focus:border-[#ffbd59]/70 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(255,189,89,0.12)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1.5 text-[13px] text-white/40 transition-colors hover:text-[#ffbd59]"
                  >
                    <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between gap-3 text-[12px]">
                <label className="flex cursor-pointer items-center gap-2 text-white/70">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/20 bg-white/5 accent-[#ffbd59]"
                  />
                  <span>Remember me</span>
                </label>
                <button type="button" className="font-medium text-[#ffbd59] transition-opacity hover:opacity-80">
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-1 w-full rounded-[14px] bg-gradient-to-r from-[#ffbd59] to-[#ffd79c] py-3.5 text-[13px] font-bold uppercase tracking-[2px] text-[#1a1208] shadow-[0_10px_30px_rgba(255,189,89,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_38px_rgba(255,189,89,0.40)] sm:text-[14px]"
              >
                Sign In
              </button>

              {/* Divider */}
              <div className="my-1 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] uppercase tracking-[2px] text-white/40">or</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-[13px] text-white/65">
                Don't have an admin account?{" "}
                <Link to="/admin/signup" className="font-semibold text-[#ffbd59] transition-opacity hover:opacity-85">
                  Create one
                </Link>
              </p>
            </form>
          </div>

          {/* Back hint */}
          <button
            onClick={goHome}
            className="mx-auto mt-8 flex items-center gap-2 text-[12px] text-white/50 transition-colors hover:text-[#ffbd59]"
          >
            <i className="fa-solid fa-arrow-left text-[10px]" />
            Back to YGI homepage
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdminLoginPage;
