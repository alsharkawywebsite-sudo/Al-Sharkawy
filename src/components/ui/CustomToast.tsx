import { useEffect, useState, useRef } from 'react';
import { usePublicToast } from '@/store/toast';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export function CustomToaster() {
  const { toasts, removeToast } = usePublicToast();

  return (
    <div className="fixed top-4 left-0 right-0 z-[100] flex flex-col items-center pointer-events-none gap-2 px-4">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: any; onRemove: () => void }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Mount animation
    requestAnimationFrame(() => setMounted(true));
    // Auto dismiss
    const timer = setTimeout(() => {
      setMounted(false);
      setTimeout(onRemove, 300); // Wait for unmount animation
    }, 2500);
    return () => clearTimeout(timer);
  }, [onRemove]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - startPos.current.x;
    const diffY = currentY - startPos.current.y;
    
    // Allow horizontal (left/right) and upward vertical drag
    if (Math.abs(diffX) > Math.abs(diffY)) {
       setOffset({ x: diffX, y: 0 });
    } else if (diffY < 0) {
       setOffset({ x: 0, y: diffY });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (Math.abs(offset.x) > 60 || offset.y < -40) {
      setMounted(false);
      setTimeout(onRemove, 300);
    } else {
      setOffset({ x: 0, y: 0 }); // snap back
    }
  };

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-xl border border-black/5 touch-none transition-all duration-300 ease-out will-change-transform ${
        mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95"
      }`}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${isDragging ? 0.98 : 1})`,
        transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={() => {
        setMounted(false);
        setTimeout(onRemove, 300);
      }}
    >
      {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
      {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
      {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
      <span className="text-sm font-semibold text-gray-800">{toast.message}</span>
    </div>
  );
}
