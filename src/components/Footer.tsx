import { Link } from "@tanstack/react-router";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import type * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const slideUpVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const scaleXVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
      delay: 0.2,
    },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
      delay: 0.3,
    },
  },
};

export default function Footer() {
  const locale = getLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer
      ref={ref}
      className="border-border/60 bg-background/95 border-t px-6 py-12 backdrop-blur-md md:py-16"
    >
      <div className="mx-auto max-w-6xl">
        {/* Main Footer Content - Three Zone Layout with staggered entrance */}
        <motion.div
          className="grid gap-12 lg:grid-cols-12 lg:gap-8"
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Zone 1: Brand + Newsletter (Left, 4 cols) */}
          <motion.div className="space-y-6 lg:col-span-4" variants={slideUpVariants}>
            {/* Brand */}
            <div className="space-y-3">
              <Link to="/{-$locale}" params={{ locale }} className="group inline-block select-none">
                <span className="text-foreground group-hover:text-primary relative text-2xl font-black tracking-tighter transition-colors duration-200 ease-out">
                  Autoværdi
                  <span
                    className="bg-primary absolute -bottom-0.5 left-0 h-0.5 w-0 transition-all duration-300 ease-out group-hover:w-full"
                    aria-hidden="true"
                  />
                </span>
              </Link>
              <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
                {m.footer_tagline()}
              </p>
            </div>

            {/* Newsletter */}
            <div className="space-y-3">
              <p className="text-foreground text-sm font-medium">{m.footer_newsletter_label()}</p>
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="relative flex-1">
                  <Input
                    type="email"
                    placeholder={m.footer_newsletter_placeholder()}
                    className="flex-1 transition-all duration-150 ease-out focus:scale-[1.02] focus:shadow-sm"
                    nativeInput
                  />
                </div>
                <Button
                  type="submit"
                  size="sm"
                  className="transition-all duration-150 ease-out hover:shadow-sm active:scale-[0.97]"
                >
                  {m.footer_newsletter_button()}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Zone 2: Navigation (Center, 5 cols) */}
          <motion.div className="grid grid-cols-3 gap-6 lg:col-span-5" variants={slideUpVariants}>
            {/* Product */}
            <div className="space-y-3">
              <h4 className="text-foreground text-sm font-semibold">{m.footer_nav_product()}</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/{-$locale}"
                    params={{ locale }}
                    className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors duration-200 ease-out"
                  >
                    {m.footer_link_valuation()}
                    <ArrowIcon className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/{-$locale}/blog"
                    params={{ locale }}
                    className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors duration-200 ease-out"
                  >
                    {m.footer_link_blog()}
                    <ArrowIcon className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/{-$locale}/blog/bil-vurdering-guide"
                    params={{ locale }}
                    className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors duration-200 ease-out"
                  >
                    {m.footer_link_guide()}
                    <ArrowIcon className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-3">
              <h4 className="text-foreground text-sm font-semibold">{m.footer_nav_company()}</h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-muted-foreground inline-flex items-center gap-1 text-sm">
                    {m.footer_link_about()}
                  </span>
                </li>
                <li>
                  <a
                    href="mailto:jens.bech.lauritsen@gmail.com"
                    className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors duration-200 ease-out"
                  >
                    {m.footer_link_contact()}
                    <ArrowIcon className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-3">
              <h4 className="text-foreground text-sm font-semibold">{m.footer_nav_legal()}</h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-muted-foreground inline-flex items-center gap-1 text-sm">
                    {m.footer_link_privacy()}
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground inline-flex items-center gap-1 text-sm">
                    {m.footer_link_terms()}
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Zone 3: CTAs (Right, 3 cols) */}
          <motion.div className="space-y-4 lg:col-span-3" variants={slideUpVariants}>
            {/* For Dealers CTA */}
            <div className="group border-border bg-muted/40 hover:border-primary/30 hover:bg-muted/60 relative overflow-hidden rounded-xl border p-4 transition-all duration-200 ease-out hover:shadow-sm">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 ease-out group-hover:scale-110">
                  <BuildingIcon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <h4 className="text-foreground text-sm font-semibold">
                    {m.footer_for_dealers()}
                  </h4>
                  <p className="text-muted-foreground line-clamp-2 text-xs">
                    {m.footer_dealers_desc()}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-3 h-8 w-full justify-between px-2 text-xs transition-all duration-150 ease-out active:scale-[0.98]"
                render={
                  <a
                    href="mailto:jens.bech.lauritsen@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={m.footer_dealers_cta()}
                  />
                }
              >
                {m.footer_dealers_cta()}
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
              </Button>
            </div>

            {/* API CTA */}
            <div className="group border-border bg-muted/40 hover:border-primary/30 hover:bg-muted/60 relative overflow-hidden rounded-xl border p-4 transition-all duration-200 ease-out hover:shadow-sm">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 ease-out group-hover:scale-110">
                  <CodeIcon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <h4 className="text-foreground text-sm font-semibold">{m.footer_api()}</h4>
                  <p className="text-muted-foreground line-clamp-2 text-xs">
                    {m.footer_api_desc()}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-3 h-8 w-full justify-between px-2 text-xs transition-all duration-150 ease-out active:scale-[0.98]"
                render={
                  <a
                    href="mailto:jens.bech.lauritsen@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={m.footer_api_cta()}
                  />
                }
              >
                {m.footer_api_cta()}
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider with subtle animation */}
        <motion.div
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate={isInView ? "visible" : "hidden"}
          variants={scaleXVariants}
          style={{ originX: 0 }}
        >
          <Separator className="my-10" />
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="flex flex-col items-center justify-between gap-6 md:flex-row"
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInVariants}
        >
          {/* Copyright */}
          <p className="text-muted-foreground text-sm">{m.footer_copyright()}</p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <SocialButton
              href="https://www.facebook.com/profile.php?id=61570977021984"
              label="Facebook"
              icon={<FacebookIcon className="h-4 w-4" />}
            />
            <SocialButton
              href="https://www.linkedin.com"
              label="LinkedIn"
              icon={<LinkedInIcon className="h-4 w-4" />}
            />
            <SocialButton
              href="https://www.instagram.com"
              label="Instagram"
              icon={<InstagramIcon className="h-4 w-4" />}
            />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

// Subcomponents
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
      />
    </svg>
  );
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
      />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function SocialButton({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group border-border bg-muted/40 text-muted-foreground hover:border-foreground/30 hover:bg-muted/60 hover:text-foreground flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-150 ease-out hover:scale-105 hover:shadow-sm active:scale-95"
      aria-label={label}
    >
      {icon}
    </a>
  );
}
