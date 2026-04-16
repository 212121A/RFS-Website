"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface GalleryHoverCarouselItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
  icon?: string;
  tags?: string[];
  comingSoon?: boolean;
}

export default function GalleryHoverCarousel({
  heading = "Featured Projects",
  items = [],
}: {
  heading?: string;
  demoUrl?: string;
  items?: GalleryHoverCarouselItem[];
}) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) return;
    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    update();
    carouselApi.on("select", update);
    return () => {
      carouselApi.off("select", update);
    };
  }, [carouselApi]);

  return (
    <section className="py-4 bg-transparent">
      <div className="container mx-auto px-0">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div className="max-w-3xl">
            <h3 className="text-lg sm:text-xl lg:text-3xl font-medium text-white leading-relaxed">
              {heading}
            </h3>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="h-10 w-10 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="h-10 w-10 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="w-full max-w-full">
          <Carousel
            setApi={setCarouselApi}
            opts={{ align: "start", dragFree: true, containScroll: "trimSnaps" }}
            className="relative w-full max-w-full"
            onWheel={(event) => {
              if (!carouselApi) return;
              const dominantDelta =
                Math.abs(event.deltaX) > Math.abs(event.deltaY)
                  ? event.deltaX
                  : event.deltaY;

              if (Math.abs(dominantDelta) < 8) return;

              event.preventDefault();
              if (dominantDelta > 0) {
                carouselApi.scrollNext();
              } else {
                carouselApi.scrollPrev();
              }
            }}
          >
            <CarouselContent className="w-full max-w-full md:ml-4 md:-mr-4">
              {items.map((item) => (
                <CarouselItem key={item.id} className="ml-6 md:basis-[360px]">
                  <a
                    href={item.url}
                    className="group block relative w-full h-[360px] md:h-[390px]"
                  >
                    <Card className="overflow-hidden h-full w-full rounded-3xl border-white/10 bg-black/40">
                      <div className="relative h-full w-full transition-all duration-500 group-hover:h-1/2">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover object-center"
                          loading="lazy"
                        />
                        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent" />
                      </div>

                      <div className="absolute bottom-0 left-0 w-full px-4 py-4 transition-all duration-500 group-hover:h-1/2 group-hover:flex flex-col justify-center bg-black/85 backdrop-blur-sm">
                        <div className="mb-2 flex items-center gap-2">
                          {item.icon && <span className="text-2xl">{item.icon}</span>}
                          <h3 className="text-lg font-medium md:text-xl text-white">
                            {item.title}
                          </h3>
                          {item.comingSoon && (
                            <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-md border border-white/20 bg-white/10 text-white/70">
                              Coming Soon
                            </span>
                          )}
                        </div>
                        <p className="text-white/65 text-sm md:text-base line-clamp-3">
                          {item.summary}
                        </p>
                        {item.tags && item.tags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-0.5 rounded-md border border-[#c1ff72]/20 bg-[#c1ff72]/10 text-[#c1ff72]/85"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute bottom-3 right-3 border border-white/20 bg-black/30 hover:-rotate-45 transition-all duration-500 rounded-full mt-2 px-0 flex items-center gap-1 text-white hover:text-white"
                        >
                          <ArrowRight className="size-4" />
                        </Button>
                      </div>
                    </Card>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
