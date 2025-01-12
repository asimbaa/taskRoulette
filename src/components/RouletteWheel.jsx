import React, { useEffect, useRef, useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import gsap from 'gsap';
import confetti from 'canvas-confetti';

function RouletteWheel() {
  const wheelRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const { tasks, selectRandomTask } = useTaskStore();
  
  useEffect(() => {
    if (!wheelRef.current || tasks.length === 0) return;
    
    const canvas = wheelRef.current;
    const ctx = canvas.getContext('2d');
    const wheelRadius = canvas.width / 2;
    const centerX = wheelRadius;
    const centerY = wheelRadius;

    // Draw wheel segments
    const drawWheel = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw segments
      tasks.forEach((task, index) => {
        const segmentAngle = (2 * Math.PI) / tasks.length;
        const startAngle = index * segmentAngle;
        const endAngle = startAngle + segmentAngle;
        
        // Create gradient for 3D effect
        const gradient = ctx.createConicGradient(startAngle, centerX, centerY);
        gradient.addColorStop(0, `hsl(${(index * 360) / tasks.length}, 70%, 60%)`);
        gradient.addColorStop(0.5, `hsl(${(index * 360) / tasks.length}, 70%, 40%)`);
        
        // Draw segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, wheelRadius - 20, startAngle, endAngle);
        ctx.lineTo(centerX, centerY);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = '#1e3a8a';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Add task text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + segmentAngle / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        ctx.font = '16px Inter';
        const truncatedTitle = task.title.length > 20 
          ? task.title.substring(0, 17) + '...'
          : task.title;
        ctx.fillText(truncatedTitle, wheelRadius - 40, 6);
        ctx.restore();
      });
      
      // Draw center circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
      ctx.fillStyle = '#1e40af';
      ctx.fill();
      ctx.strokeStyle = '#1e3a8a';
      ctx.lineWidth = 4;
      ctx.stroke();
    };

    drawWheel();
  }, [tasks]);

  const triggerCelebration = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const handleSpin = () => {
    if (isSpinning || tasks.length === 0) return;
    
    setIsSpinning(true);
    const wheel = wheelRef.current;
    
    // Immediately select a random task
    const randomIndex = Math.floor(Math.random() * tasks.length);
    const selectedTask = tasks[randomIndex];
    selectRandomTask(selectedTask.id);
    
    // Calculate the target angle based on the selected task
    const segmentSize = 360 / tasks.length;
    const targetSegment = randomIndex;
    const baseRotation = 360 - (targetSegment * segmentSize + segmentSize / 2);
    const totalRotation = baseRotation + (360 * 15); // Add multiple full rotations
    
    // Create timeline for spinning animation
    const tl = gsap.timeline({
      onComplete: () => {
        setIsSpinning(false);
        triggerCelebration();
      }
    });

    // Ultra-fast initial spin (3 seconds)
    tl.to(wheel, {
      rotation: totalRotation * 0.8,
      duration: 3,
      ease: "power1.in" // Linear acceleration for constant high speed
    })
    // Gradual slowdown (2.5 seconds)
    .to(wheel, {
      rotation: totalRotation,
      duration: 2.5,
      ease: "power4.out" // Strong deceleration curve
    });
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="wheel-container">
        <div className="wheel-tilt">
          <div className="wheel-shadow"></div>
          <canvas
            ref={wheelRef}
            className="transform-gpu roulette-wheel"
            width="400"
            height="400"
          />
          <div className="wheel-pointer" />
        </div>
        <div className="wheel-stand" />
      </div>
      
      <button
        onClick={handleSpin}
        disabled={isSpinning || tasks.length === 0}
        className={`
          btn btn-primary text-lg font-semibold px-8 py-3 rounded-full
          transform transition-all duration-200
          hover:scale-105 active:scale-95
          ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}
          ${tasks.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>
    </div>
  );
}

export default RouletteWheel;
