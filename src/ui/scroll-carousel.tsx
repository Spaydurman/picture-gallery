import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import the local place images
import AprilImage from "../assets/images/places/April.jpeg";
import AprilImage1 from "../assets/images/places/April.jpg";
import AugustImage from "../assets/images/places/August.jpg";
import DecemberImage from "../assets/images/places/December.jpg";
import FebruaryImage from "../assets/images/places/Ferbruary.jpg"; // Note: "Ferbruary" in filename
import FebruaryImage1 from "../assets/images/places/February.jpeg";
import January1Image from "../assets/images/places/January-1.jpg";
import JanuaryImage from "../assets/images/places/January.jpg";
import July1Image from "../assets/images/places/July-1.jpg";
import JulyImage from "../assets/images/places/July.jpg";
import June1Image from "../assets/images/places/June-1.jpg";
import JuneImage from "../assets/images/places/June.jpg";
import March1Image from "../assets/images/places/March-1.jpg";
import MarchImage from "../assets/images/places/March.jpg";
import MayImage from "../assets/images/places/May.jpg";
import MayImage1 from "../assets/images/places/May1.jpg";
import SeptemberImage from "../assets/images/places/September.jpg";
import OctoberImage from "../assets/images/places/october.jpg";

gsap.registerPlugin(ScrollTrigger);

type Slide = {
  image: string;
  month: string;
  place: string;
};

const slides: Slide[] = [
  { image: DecemberImage, month: "December", place: "YP Christmas Party" },
  { image: JanuaryImage, month: "January", place: "Rave, Pasig" },
  { image: January1Image, month: "January", place: "Kapehingahan, Angono Rizal" },
  { image: FebruaryImage, month: "February", place: "Eastridge Orverlooking Angono Rizal" },
  { image: FebruaryImage1, month: "February", place: "Cabin's View, San Mateo" },
  { image: MarchImage, month: "March", place: "Bridgetowne, Pasig" },
  { image: March1Image, month: "March", place: "Casa Peregrine, Tanay" },
  { image: AprilImage, month: "April", place: "Picnic Grove, Tagaytay" },
  { image: AprilImage1, month: "April", place: "Camaya, Bataan" },
  { image: MayImage, month: "May", place: "SM East Ortigas" },
  { image: MayImage1, month: "May", place: "Viewscape, Tanay" },
  { image: JuneImage, month: "June", place: "Arcovia, Pasig" },
  { image: June1Image, month: "June", place: "Sm Megamall" },
  { image: JulyImage, month: "July", place: "Sm Aura" },
  { image: July1Image, month: "July", place: "Sm Aura" },
  { image: AugustImage, month: "August", place: "Manila" },
  { image: SeptemberImage, month: "September", place: "Hinulugang Taktak, Antipolo" },
  { image: OctoberImage, month: "October", place: "Coming Soon" },
];

const SlideItem: React.FC<Slide> = ({ image, month, place }) => (
  <div className="slide w-screen h-screen flex-shrink-0 relative">
    <img src={image} alt={place} className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center text-white text-center p-6">
      <h2 className="text-5xl font-bold">{month}</h2>
      <p className="text-2xl mt-2">{place}</p>
    </div>
  </div>
);

export default function ScrollCarousel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const slidesCount = track.querySelectorAll(".slide").length;
    console.log("Slides count:", slidesCount);
    if (slidesCount <= 1) return;

    // animation function
    const createAnimation = () => {
      const totalDistance = window.innerWidth * (slidesCount - 1);

      gsap.to(track, {
        x: () => -totalDistance,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalDistance}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: 1 / (slidesCount - 1),
          // markers: true, // <- enable for debugging
        },
      });
    };

    createAnimation();
    ScrollTrigger.refresh();

    const handleResize = () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.set(track, { clearProps: "all" });
      createAnimation();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden">
      <div ref={trackRef} className="flex h-full will-change-transform">
        {slides.map((s, i) => (
          <SlideItem key={i} {...s} />
        ))}
      </div>
    </section>
  );
}
