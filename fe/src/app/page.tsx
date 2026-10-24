"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const opportunities = [
  {
    eyebrow: "01 / OPPORTUNITY",
    title: "Scholarships for curious minds.",
    text: "Find support, mentors, and the confidence to take your next big step.",
    image: "circuit",
  },
  {
    eyebrow: "02 / OPPORTUNITY",
    title: "Workshops that move ideas forward.",
    text: "Learn by doing with people who are just as excited to build the future.",
    image: "workshop",
  },
  {
    eyebrow: "03 / OPPORTUNITY",
    title: "Mentorship for your next chapter.",
    text: "Get practical guidance from a community that wants to see you thrive.",
    image: "coding",
  },
];

const classes = [
  {
    number: "01",
    name: "Science Lab",
    detail: "Experiment / Discover",
    image: "science",
  },
  {
    number: "02",
    name: "Creative Coding",
    detail: "Make / Play / Build",
    image: "coding",
  },
  {
    number: "03",
    name: "STEM Workshop",
    detail: "Design / Test / Share",
    image: "workshop",
  },
];

export default function Home() {
  const [opportunityIndex, setOpportunityIndex] = useState(0);
  const opportunity = opportunities[opportunityIndex];
  const shiftOpportunity = (step: number) =>
    setOpportunityIndex(
      (current) =>
        (current + step + opportunities.length) % opportunities.length,
    );
  const opportunityFile =
    opportunity.image === "circuit"
      ? "stem-circuit"
      : opportunity.image === "workshop"
        ? "stem-workshop"
        : "coding-class";

  return (
    <main className="pt-0">
      <header className="fixed left-0 right-0 top-0 z-50 bg-[#1C2533] text-[#FFF9EF] flex items-center justify-between px-4 md:px-8 py-3.5 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm">
        <Link className="brand" href="/" aria-label="Youth in STEM home">
          <Image
            src="/YIS_Logo_Dark_Version.jpeg"
            alt="Youth in STEM Indonesia"
            width={92}
            height={62}
            priority
          />
          <span>
            YOUTH IN STEM <i>INDONESIA</i>
          </span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="flex items-center gap-6 text-sm ">
          <Link href="/home" className="hidden sm:inline">
            Portal
          </Link>
          <Link href="/sign-up">Sign-up</Link>
          <Link href="/login">Login</Link>
        </nav>
      </header>
      <div id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <h1>
              Make your
              <br />
              <span>next move</span>
              <br />
              count.
            </h1>
            <p className="hero-lede">
              A place for young people to explore science, technology,
              engineering, and mathematics through real opportunities.
            </p>
            <div className="flex items-center gap-3">
              <Link className="primary-link" href="/sign-up">
                Get Started <span>↗</span>
              </Link>
              <Link
                className="primary-link !bg-transparent !text-[#FFF9EF] border border-[#FFF9EF]/40 hover:!bg-[#FFF9EF]/10"
                href="/home">
                Enter Portal <span>→</span>
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image">
              <Image
                src="/visuals/stem-workshop.jpg"
                alt="Students collaborating in a STEM workshop"
                fill
                priority
                sizes="(max-width: 700px) 90vw, 48vw"
              />
            </div>
          </div>
        </section>

        <section id="opportunities" className="opportunity-section">
          <div className="section-heading">
            <p className="kicker">01 / START HERE</p>
            <h2>
              There is more
              <br />
              <em>out there.</em>
            </h2>
            <p>
              Whether you are looking for a first spark or your next challenge,
              find a path that feels like yours.
            </p>
          </div>
          <div className="opportunity-feature">
            <div className={`opportunity-image ${opportunity.image}`}>
              <Image
                src={`/visuals/${opportunityFile}.jpg`}
                alt={opportunity.title}
                fill
                sizes="(max-width: 700px) 92vw, 55vw"
              />
              <span className="image-index">0{opportunityIndex + 1}</span>
            </div>
            <div className="opportunity-info">
              <p className="kicker">{opportunity.eyebrow}</p>
              <h3>{opportunity.title}</h3>
              <p>{opportunity.text}</p>
              <Link href="/home">
                See what is possible <span>↗</span>
              </Link>
              <div className="feature-controls">
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  aria-label="Previous opportunity"
                  onClick={() => shiftOpportunity(-1)}>
                  ←
                </Button>
                <div>
                  {opportunities.map((item, index) => (
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      key={item.eyebrow}
                      type="button"
                      aria-label={`Show ${item.title}`}
                      className={index === opportunityIndex ? "selected" : ""}
                      onClick={() => setOpportunityIndex(index)}
                    />
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  aria-label="Next opportunity"
                  onClick={() => shiftOpportunity(1)}>
                  →
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="competition-section">
          <div className="section-heading light">
            <p className="kicker">02 / TAKE THE CHALLENGE</p>
            <h2>
              Ready to put
              <br />
              <em>ideas in motion?</em>
            </h2>
          </div>
          <div className="competition-grid">
            <article>
              <div className="competition-image">
                <Image
                  src="/visuals/stem-circuit.jpg"
                  alt="Circuit board for offline competition"
                  fill
                  sizes="(max-width: 700px) 90vw, 40vw"
                />
              </div>
              <div>
                <span>01</span>
                <h3>Offline competitions</h3>
                <p>Show up, work together, and make an impact in the room.</p>
                <Link href="/home">View challenges ↗</Link>
              </div>
            </article>
            <article>
              <div className="competition-image">
                <Image
                  src="/visuals/coding-class.jpg"
                  alt="Coding workspace for online competition"
                  fill
                  sizes="(max-width: 700px) 90vw, 40vw"
                />
              </div>
              <div>
                <span>02</span>
                <h3>Online competitions</h3>
                <p>Bring your boldest ideas to a wider digital stage.</p>
                <Link href="/home">View challenges ↗</Link>
              </div>
            </article>
          </div>
        </section>
        <section className="community-section">
          <div className="community-image">
            <Image
              src="/visuals/stem-workshop.jpg"
              alt="Students connecting at a community event"
              fill
              sizes="(max-width: 700px) 90vw, 45vw"
            />
          </div>
          <div className="community-copy">
            <p className="kicker">03 / FIND YOUR PEOPLE</p>
            <h2>
              Big ideas are better <em>together.</em>
            </h2>
            <p>
              Join a growing community of young people who are learning out
              loud, sharing generously, and making room for each other.
            </p>
            <Link className="primary-link dark-link" href="/sign-up">
              Join the community <span>↗</span>
            </Link>
          </div>
        </section>
        <section id="classes" className="classes-section">
          <div className="classes-heading">
            <div>
              <p className="kicker">04 / KEEP GROWING</p>
              <h2>
                Learn something
                <br />
                <em>worth making.</em>
              </h2>
            </div>
            <p>
              Hands-on classes for the skills, questions, and ideas you want to
              take further.
            </p>
          </div>
          <div className="class-grid">
            {classes.map((item) => {
              const file =
                item.image === "science"
                  ? "science-lab"
                  : item.image === "coding"
                    ? "coding-class"
                    : "stem-workshop";
              return (
                <Link href="/home" className="class-card group" key={item.name}>
                  <Image
                    src={`/visuals/${file}.jpg`}
                    alt={item.name}
                    fill
                    sizes="(max-width: 700px) 90vw, 30vw"
                  />
                  <div>
                    <span>{item.number}</span>
                    <small>{item.detail}</small>
                  </div>
                  <h3>{item.name}</h3>
                  <b className="group-hover:translate-x-1 transition-transform">
                    ↗
                  </b>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
      <footer id="contact" className="site-footer">
        <div className="footer-brand">
          <Image
            src="/YIS Logo Transparent.png"
            alt="Youth in STEM"
            width={92}
            height={62}
          />
          <span>
            YOUTH IN STEM
            <br />
            <small>INDONESIA</small>
          </span>
        </div>
        <div className="contact-info">
          <Link href="/login">Portal Login ↗</Link>
          <Link href="/sign-up">Join Community ↗</Link>
          <span>Instagram ↗</span>
        </div>
        <p className="copyright">© 2026 YIS INDONESIA</p>
      </footer>
    </main>
  );
}
