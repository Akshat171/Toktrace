"use client";
import React, { useEffect, useState } from 'react';

interface Point {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

export const AnimatedBackground = () => {
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    // Generate random points with varied animation durations
    const generatedPoints: Point[] = [];
    const isMobile = window.innerWidth < 640;
    const numPoints = isMobile ? 6 : 15;
    
    for (let i = 0; i < numPoints; i++) {
      generatedPoints.push({
        id: i,
        x: 5 + Math.random() * 90, // Keep points away from edges
        y: 5 + Math.random() * 90,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      });
    }
    
    setPoints(generatedPoints);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-indigo-50/50" />
      
      {/* Horizontal lines */}
      <div className="absolute inset-0">
        {[12, 24, 36, 48, 60, 72, 84].map((top, index) => (
          <div
            key={`h-${index}`}
            className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-slate-300/60 to-transparent"
            style={{ top: `${top}%` }}
          />
        ))}
      </div>

      {/* Vertical lines */}
      <div className="absolute inset-0">
        {[8, 20, 32, 44, 56, 68, 80, 92].map((left, index) => (
          <div
            key={`v-${index}`}
            className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-slate-300/60 to-transparent"
            style={{ left: `${left}%` }}
          />
        ))}
      </div>

      {/* Animated points */}
      {points.map((point) => (
        <div
          key={point.id}
          className="absolute"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
          }}
        >
          {/* Outer expanding ring */}
          <div 
            className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-400/20"
            style={{
              animation: `expandRing ${point.duration}s ease-out infinite`,
              animationDelay: `${point.delay}s`,
            }}
          />
          
          {/* Middle ring */}
          <div 
            className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400/5 border border-green-400/25"
            style={{
              animation: `pulseRing ${point.duration}s ease-in-out infinite`,
              animationDelay: `${point.delay}s`,
            }}
          />
          
          {/* Center glowing dot */}
          <div 
            className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/70 shadow-lg shadow-green-500/30"
            style={{
              animation: `pulseDot ${point.duration}s ease-in-out infinite`,
              animationDelay: `${point.delay}s`,
            }}
          />
        </div>
      ))}

      {/* Floating gradient orbs for depth */}
      <div className="absolute top-[15%] left-[8%] w-32 h-32 bg-blue-400/5 rounded-full blur-3xl animate-float" />
      <div className="absolute top-[45%] right-[12%] w-40 h-40 bg-indigo-400/5 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute bottom-[25%] left-[25%] w-36 h-36 bg-violet-400/5 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-[60%] right-[35%] w-28 h-28 bg-cyan-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

      <style jsx>{`
        @keyframes expandRing {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.8);
            opacity: 0;
          }
        }

        @keyframes pulseRing {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.4;
          }
        }

        @keyframes pulseDot {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0.7;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-25px);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
};
