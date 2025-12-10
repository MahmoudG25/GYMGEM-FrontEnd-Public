import {
  HiArrowCircleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import cards from "../../js/cardData";
import "../../index.css";
import { useRef } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

function WhatWeOffer() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.15 });
  const swiperRef = useRef(null);

  return (
    <section ref={sectionRef} className="w-full bg-gradient-to-br from-background via-purple-50/20 to-background py-16">
      <div className="mx-auto w-[80%]  ">
        <div
          className={`text-center transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <h2 className="font-bebas text-3xl tracking-tight text-foreground sm:text-4xl text-[#FF8211]">
            What we offer
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg text-[#555555]">
            Discover calm, purposeful ways to stay fit and connected to your
            community.
          </p>
        </div>

        <div
          className={`mt-12 w-full transition-all duration-700 delay-200 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <Swiper
            className="offers-swiper"
            modules={[Navigation, Pagination, Autoplay, FreeMode]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            speed={700}
            freeMode
            loop
            grabCursor
            freeModeMomentum={false}
            breakpoints={{
              640: { slidesPerView: 1.1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {cards.map((item, index) => (
              <SwiperSlide key={index}>
                {/* Color scheme: warm (0), cool (1), vibrant (2), warm (3), cool (4), etc. */}
                {(() => {
                  const colorSchemes = [
                    "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-orange-200/50",
                    "bg-gradient-to-br from-blue-50 to-cyan-100 border-cyan-200 hover:shadow-cyan-200/50",
                    "bg-gradient-to-br from-purple-50 to-pink-100 border-pink-200 hover:shadow-pink-200/50",
                    "bg-gradient-to-br from-green-50 to-teal-100 border-teal-200 hover:shadow-teal-200/50",
                    "bg-gradient-to-br from-indigo-50 to-blue-100 border-indigo-200 hover:shadow-indigo-200/50",
                  ];
                  const scheme = colorSchemes[index % colorSchemes.length];
                  return (
                    <article className={`relative flex h-72 flex-col overflow-hidden rounded-2xl border-2 ${scheme} shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:scale-[1.02]`}>
                      <div className="absolute inset-y-4 left-4 w-32 overflow-hidden rounded-xl ">
                        <img
                          loading="lazy"
                          src={item.img}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-[9rem] flex h-full flex-col justify-between p-5">
                        <div>
                          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground text-[#FF8211]">
                            {item.title}
                            <HiArrowCircleRight className="text-primary" />
                          </h3>
                          <p className="mt-3 text-sm text-muted-foreground">
                            {item.desc}
                          </p>
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">
                          Tailored support • Flexible access • Measurable results
                        </span>
                      </div>
                    </article>
                  );
                })()}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default WhatWeOffer;
