import type { CSSProperties } from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { Sparkles } from "@/components/ui/sparkles";

type CustomerLogo = {
  company: string;
  logo: string;
  logoStyle?: CSSProperties;
  text: string;
  location: string;
  category: string;
};

type TestimonialsSparklesDemoProps = {
  testimonials: CustomerLogo[];
};

export function TestimonialsSparklesDemo({
  testimonials,
}: TestimonialsSparklesDemoProps) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
      <div className="mx-auto mt-12 w-full max-w-4xl px-6">
        <div className="relative h-[100px] w-full">
          <InfiniteSlider
            className="flex h-full w-full items-center"
            duration={30}
            gap={48}
          >
            {testimonials.map(({ company, logo, logoStyle }) => (
              <div
                key={company}
                className="w-36 h-16 rounded-xl border border-white/10 bg-black/50 flex items-center justify-center p-3"
              >
                <img
                  src={logo}
                  alt={company}
                  className="max-h-full max-w-full object-contain"
                  style={logoStyle}
                />
              </div>
            ))}
          </InfiniteSlider>
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 left-0 h-full w-[160px]"
            direction="left"
            blurIntensity={0.8}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 right-0 h-full w-[160px]"
            direction="right"
            blurIntensity={0.8}
          />
        </div>
      </div>

      <div className="relative -mt-16 h-72 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,var(--gradient-color),transparent_70%)] before:opacity-35" />
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-white/15 bg-black/85" />
        <Sparkles
          density={1200}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
          color="var(--sparkles-color)"
        />
      </div>

      <div className="relative z-20 px-6 pb-8 -mt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={`review-${t.company}`}
              className="p-8 rounded-2xl flex flex-col gap-5 border border-[#c1ff72]/30 bg-black/70"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#c1ff72">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <p className="text-white/70 text-base leading-relaxed flex-1">
                „{t.text}"
              </p>

              <div className="flex items-center gap-4 pt-2 border-t border-white/10">
                <div className="h-10 w-20 flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center bg-white/5">
                  <img
                    src={t.logo}
                    alt={t.company}
                    className="h-full w-full object-contain p-1"
                    style={t.logoStyle}
                  />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.company}</div>
                  <div className="text-white/40 text-xs mt-0.5">
                    {t.category} · {t.location}
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c1ff72" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="text-xs font-medium text-[#c1ff72]">Verifiziert</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
