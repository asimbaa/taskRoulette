return (
  <div className="flex flex-col items-center space-y-4">
    <div className="wheel-container">
      <div className="wheel-tilt">
        <div className="wheel-shadow"></div>
        <canvas
          ref={wheelRef}
          className="transform-gpu roulette-wheel"
          style={{ width: '400px', height: '400px' }}
        />
        <div className="wheel-pointer" />
      </div>
      <div className="wheel-stand" />
    </div>
    
    <button
      onClick={handleSpin}
      disabled={isSpinning || tasks.length === 0}
      className={`
        btn btn-primary
        ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}
        ${tasks.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
    </button>
  </div>
);
