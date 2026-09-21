import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Waves, Video, Monitor, Volume2, VolumeX } from 'lucide-react';

interface MaritimeHeroVideoProps {
  className?: string;
  onVideoEnd?: () => void;
}

export const MaritimeHeroVideo: React.FC<MaritimeHeroVideoProps> = ({ className = '' }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Video sources: High quality public domain verified maritime shipping loops
  // 1. Port shipping canal / Port Said bulk passage (Suez corridor)
  // 2. Heavy bulk coal freighter (Kohlefrachter) on water corridor
  const videoSources = [
    {
      id: 'port_passage',
      title: 'Port Maritime Passage',
      url: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/d/d2/The_water_passage_between_Port_Fouad_and_port_said.webm/The_water_passage_between_Port_Fouad_and_port_said.webm.480p.vp9.webm'
    },
    {
      id: 'coal_carrier',
      title: 'Bulk Coal Carrier Loop',
      url: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/1/18/Leichtern_des_Kohlefrachters_Maranta_auf_der_Deutzer_Platte_auf_dem_Rhein_bei_K%C3%B6ln.webm/Leichtern_des_Kohlefrachters_Maranta_auf_der_Deutzer_Platte_auf_dem_Rhein_bei_K%C3%B6ln.webm.480p.vp9.webm'
    }
  ];

  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Synchronize play/pause with video element
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted before interaction; muted handles this in 99% cases
      });
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, currentVideoIdx]);

  // Dynamic canvas fallback / ambient animation:
  // Calm ocean waters at dawn with two anchored bulk carrier vessels,
  // gentle water swells, subtle ship bobbing, and sunlight reflections.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      if (!ctx || !canvas) return;
      time += 0.015;

      const w = canvas.width;
      const h = canvas.height;
      const horizonY = h * 0.58;

      // 1. Sky Gradient (Golden Dawn / Twilight Ocean)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
      skyGrad.addColorStop(0, '#040E1E');
      skyGrad.addColorStop(0.45, '#0B2344');
      skyGrad.addColorStop(0.75, '#193F6D');
      skyGrad.addColorStop(0.95, '#BD6D48');
      skyGrad.addColorStop(1, '#E69C70');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, horizonY);

      // Subtle Golden Sun Glow on Horizon
      const sunX = w * 0.62;
      const sunGlow = ctx.createRadialGradient(sunX, horizonY, 5, sunX, horizonY, w * 0.35);
      sunGlow.addColorStop(0, 'rgba(255, 237, 190, 0.35)');
      sunGlow.addColorStop(0.3, 'rgba(247, 183, 135, 0.20)');
      sunGlow.addColorStop(1, 'rgba(11, 35, 68, 0)');
      ctx.fillStyle = sunGlow;
      ctx.fillRect(0, 0, w, horizonY);

      // 2. Calm Sea Water Gradient
      const waterGrad = ctx.createLinearGradient(0, horizonY, 0, h);
      waterGrad.addColorStop(0, '#2D4E6B');
      waterGrad.addColorStop(0.15, '#1A3B5C');
      waterGrad.addColorStop(0.5, '#0F2744');
      waterGrad.addColorStop(1, '#051326');
      ctx.fillStyle = waterGrad;
      ctx.fillRect(0, horizonY, w, h - horizonY);

      // 3. Draw Anchored Bulk Carrier Ships
      const shipBob = Math.sin(time * 0.8) * 2;
      const shipX = w * 0.52;
      const shipY = horizonY - 4 + shipBob;

      const drawCarrier = (
        bx: number, 
        by: number, 
        scale: number, 
        hullColor: string, 
        superColor: string, 
        trimColor: string
      ) => {
        ctx.save();
        ctx.translate(bx, by);
        ctx.scale(scale, scale);

        // Vessel Shadow
        ctx.fillStyle = 'rgba(5, 15, 30, 0.4)';
        ctx.beginPath();
        ctx.ellipse(0, 16, 95, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Hull
        ctx.fillStyle = hullColor;
        ctx.beginPath();
        ctx.moveTo(-90, 4);
        ctx.lineTo(-75, 16);
        ctx.lineTo(75, 16);
        ctx.lineTo(95, 4);
        ctx.lineTo(90, -4);
        ctx.lineTo(-88, -4);
        ctx.closePath();
        ctx.fill();

        // Trim band
        ctx.fillStyle = trimColor;
        ctx.fillRect(-73, 14, 146, 2.5);

        // Superstructure
        ctx.fillStyle = superColor;
        ctx.fillRect(-70, -28, 38, 24);
        ctx.fillRect(-66, -38, 28, 10);
        ctx.fillRect(-62, -45, 18, 7);

        // Bridge Windows Glow
        ctx.fillStyle = '#67E8F9';
        ctx.fillRect(-60, -36, 16, 3);

        // Mast
        ctx.strokeStyle = '#CBD5E1';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-53, -45);
        ctx.lineTo(-53, -56);
        ctx.stroke();

        // Beacon
        const blink = Math.sin(time * 3) > 0.3;
        ctx.fillStyle = blink ? '#F59E0B' : 'rgba(245, 158, 11, 0.2)';
        ctx.beginPath();
        ctx.arc(-53, -57, 2, 0, Math.PI * 2);
        ctx.fill();

        // Cargo Hatches
        ctx.fillStyle = '#0B1E36';
        for (let i = -20; i <= 65; i += 18) {
          ctx.fillRect(i, -6, 12, 3);
        }

        ctx.restore();
      };

      // Two bulk carrier silhouettes
      drawCarrier(shipX - 65, shipY - 6, 0.92, '#152C4A', '#294B73', '#0284C7');
      drawCarrier(shipX + 45, shipY - 4, 0.88, '#26354A', '#384B63', '#E11D48');

      // Surface Water Glimmer
      ctx.save();
      for (let y = horizonY + 2; y < h; y += 4) {
        const progress = (y - horizonY) / (h - horizonY);
        const bandWidth = (20 + progress * 240);
        const waveOffset = Math.sin(time * 1.5 + y * 0.08) * 12;
        const waveAlpha = (0.22 - progress * 0.18) * (0.8 + Math.sin(time * 2 + y * 0.2) * 0.2);

        if (waveAlpha > 0) {
          ctx.fillStyle = `rgba(255, 237, 190, ${Math.max(0, waveAlpha)})`;
          ctx.fillRect(sunX - bandWidth / 2 + waveOffset, y, bandWidth, 2);
        }
      }
      ctx.restore();

      if (isPlaying) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (isPlaying) {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  return (
    <div className={`relative w-full h-full overflow-hidden select-none bg-[#001733] ${className}`}>
      
      {/* 1. Underlying Atmospheric Canvas (Always runs smoothly as base or fallback) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 2. Real High-Quality Maritime Ship/Port Video Loop */}
      <video
        ref={videoRef}
        key={videoSources[currentVideoIdx].url}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        onCanPlay={() => setIsVideoLoaded(true)}
        onError={() => setVideoError(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded && !videoError ? 'opacity-70' : 'opacity-0'
        }`}
      >
        <source src={videoSources[currentVideoIdx].url} type="video/webm" />
      </video>

      {/* 3. Deep Maritime Dark Overlays & Gradient Scrims:
          Crucial: Guarantees high-contrast, bold, crystal-clear readability for all typography */}
      {/* Heavy base dark scrim */}
      <div className="absolute inset-0 bg-[#001733]/85 pointer-events-none" />

      {/* Subtle deep ocean gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#001733] via-[#002147]/75 to-[#001226]/90 pointer-events-none" />

      {/* Radial vignette centering the gaze on the bold text */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,18,38,0.85)_100%)] pointer-events-none" />

      {/* Subtle bottom fade transition into operational workspace */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#001733] to-transparent pointer-events-none" />

      {/* 4. Ambient Video & Atmosphere Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-sky-500/30 text-[11px] text-slate-300 shadow-xl">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <span className="font-semibold text-white hidden sm:inline">Maritime Feed:</span>

        {/* Video selector toggle */}
        <button
          onClick={() => {
            setIsVideoLoaded(false);
            setVideoError(false);
            setCurrentVideoIdx(prev => (prev + 1) % videoSources.length);
          }}
          className="text-sky-300 hover:text-white font-bold px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 transition-all cursor-pointer text-[10px]"
          title="Switch maritime video scene"
        >
          {videoSources[currentVideoIdx].title}
        </button>

        <span className="text-slate-600">|</span>

        {/* Play/Pause */}
        <button
          onClick={() => setIsPlaying(p => !p)}
          className="flex items-center gap-1 font-bold text-sky-300 hover:text-white transition-colors cursor-pointer"
          title={isPlaying ? 'Pause background video' : 'Play background video'}
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-emerald-400" />}
        </button>
      </div>

    </div>
  );
};
