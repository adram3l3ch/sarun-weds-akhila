"use client";
import "./PetalFall.css";

const petals = Array.from({ length: 22 }, (_, i) => ({
   id: i,
   left: `${(i * 47 + 13) % 100}%`,
   delay: `${-((i * 1.7) % 18)}s`,
   duration: `${14 + ((i * 7) % 10)}s`,
   size: `${7 + ((i * 3) % 7)}px`,
   drift: `${((i * 19) % 90) - 45}px`,
   rotation: `${(i * 37) % 360}deg`,
   opacity: 0.35 + ((i * 13) % 45) / 100,
   gold: i % 6 === 0,
}));

export default function PetalFall() {
   return (
      <div className="petalContainer" aria-hidden="true">
         {petals.map(petal => (
            <span
               key={petal.id}
               className={`petal ${petal.gold ? "gold" : ""}`}
               style={
                  {
                     "--left": petal.left,
                     "--delay": petal.delay,
                     "--duration": petal.duration,
                     "--size": petal.size,
                     "--drift": petal.drift,
                     "--rotation": petal.rotation,
                     "--opacity": petal.opacity,
                  } as React.CSSProperties
               }
            />
         ))}
      </div>
   );
}
