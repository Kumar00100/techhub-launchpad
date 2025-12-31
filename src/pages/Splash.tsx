import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Wrench } from 'lucide-react';

const Splash = () => {
  const navigate = useNavigate();
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const taglineTimer = setTimeout(() => setShowTagline(true), 500);
    const navTimer = setTimeout(() => navigate('/', { replace: true }), 2500);

    return () => {
      clearTimeout(taglineTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-gradient-hero flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="relative animate-bounce-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center backdrop-blur-sm">
              <Smartphone className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
              <Wrench className="w-4 h-4 text-secondary-foreground" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-primary-foreground tracking-tight text-center">
          Tech<span className="text-secondary">Hub</span>
        </h1>
      </div>

      {/* Tagline */}
      <p
        className={`mt-4 text-primary-foreground/80 text-lg font-medium transition-all duration-500 ${
          showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        Buy Electronics. Repair Instantly.
      </p>

      {/* Loading dots */}
      <div className="mt-12 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary-foreground/60 animate-pulse-soft"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 rounded-full bg-primary-foreground/10 blur-3xl" />
      </div>
    </div>
  );
};

export default Splash;
