import { Link } from "react-router-dom";

export default function Home(){
return (
  <div className="min-h-screen bg-background flex items-center justify-center px-6">
    <div className="max-w-3xl text-center">
      <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
        CodeJudge
      </p>
      <h1 className="text-4xl md:text-5xl font-bold leading-tight text-primaryText">
        Dive into the World of
        <br />
        <span className="text-accent">Problem Solving.</span>
      </h1>
      <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-secondaryText">
        Practice coding challenges, execute your solutions instantly, and track
        every submission in one place.
      </p>
      <div className="mt-12">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-accentHover hover:-translate-y-0.5"
        >
          Start Solving
        </Link>
      </div>
    </div>
  </div>
);
}