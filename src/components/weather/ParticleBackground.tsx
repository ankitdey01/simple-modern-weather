import { useEffect, useRef } from 'react';
import type { WeatherCondition } from '@/types/weather';

interface ParticleBackgroundProps {
  condition: WeatherCondition;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ condition }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles based on condition
    const initParticles = () => {
      const particleCount = condition === 'clear' ? 30 : condition === 'rain' ? 100 : 50;
      particlesRef.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle(condition, canvas));
      }
    };

    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        // Reset particle if out of bounds or expired
        if (
          particle.x < -10 ||
          particle.x > canvas.width + 10 ||
          particle.y < -10 ||
          particle.y > canvas.height + 10 ||
          particle.life > particle.maxLife
        ) {
          particlesRef.current[index] = createParticle(condition, canvas);
        }

        // Draw particle
        drawParticle(ctx, particle, condition);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [condition]);

  const createParticle = (condition: WeatherCondition, canvas: HTMLCanvasElement): Particle => {
    const baseParticle: Particle = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: 0,
      vy: 0,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      life: 0,
      maxLife: Math.random() * 200 + 100,
    };

    switch (condition) {
      case 'rain':
      case 'drizzle':
        return {
          ...baseParticle,
          x: Math.random() * canvas.width,
          y: -10,
          vx: (Math.random() - 0.5) * 0.5,
          vy: Math.random() * 5 + 8,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.3,
        };
      case 'snow':
        return {
          ...baseParticle,
          x: Math.random() * canvas.width,
          y: -10,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 2 + 1,
          size: Math.random() * 3 + 2,
        };
      case 'clear':
        return {
          ...baseParticle,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.3 + 0.1,
        };
      case 'cloudy':
      case 'partly-cloudy':
        return {
          ...baseParticle,
          vx: Math.random() * 0.5 + 0.2,
          vy: 0,
          size: Math.random() * 50 + 30,
          opacity: Math.random() * 0.05 + 0.02,
        };
      case 'fog':
        return {
          ...baseParticle,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 80 + 50,
          opacity: Math.random() * 0.08 + 0.03,
        };
      default:
        return baseParticle;
    }
  };

  const drawParticle = (
    ctx: CanvasRenderingContext2D,
    particle: Particle,
    condition: WeatherCondition
  ) => {
    ctx.save();

    switch (condition) {
      case 'rain':
      case 'drizzle':
        ctx.strokeStyle = `rgba(10, 132, 255, ${particle.opacity})`;
        ctx.lineWidth = particle.size;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particle.x + particle.vx * 2, particle.y - particle.vy * 2);
        ctx.stroke();
        break;

      case 'snow':
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'clear':
        // Floating dust/pollen particles
        ctx.fillStyle = `rgba(255, 214, 10, ${particle.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(255, 214, 10, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'cloudy':
      case 'partly-cloudy':
        // Soft cloud patches
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'fog':
        // Fog patches
        const fogGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        fogGradient.addColorStop(0, `rgba(200, 200, 200, ${particle.opacity})`);
        fogGradient.addColorStop(1, 'rgba(200, 200, 200, 0)');
        ctx.fillStyle = fogGradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'thunderstorm':
        // Rain with occasional flash
        ctx.strokeStyle = `rgba(100, 100, 100, ${particle.opacity})`;
        ctx.lineWidth = particle.size;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particle.x + particle.vx * 2, particle.y - particle.vy * 2);
        ctx.stroke();
        break;

      default:
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
  };

  // Don't render canvas for conditions that don't need particles
  if (condition === 'clear') {
    return (
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,214,10,0.08) 0%, transparent 50%)',
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
};

export default ParticleBackground;
