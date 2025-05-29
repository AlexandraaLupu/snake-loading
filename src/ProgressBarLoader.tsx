import React, { useEffect, useState } from 'react';
import SnakeGame from './SnakeGame';
import { useNavigate } from 'react-router-dom';

const ProgressBarLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [snakeRunning, setSnakeRunning] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (progress >= 100) return;
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 1, 100));
    }, 100);
    return () => clearInterval(interval);
  }, [progress]);

  const handleClick = () => {
    if (progress >= 100) {
      setSnakeRunning(false);
      navigate('/new-content');
    }
  };

  return (
    <div className="relative w-full max-w-xl flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-semibold text-center text-gray-100">
        Play Snake while you wait for your content to load
      </h1>

      <div className="w-[400px] h-[400px] relative">
        <SnakeGame isRunning={snakeRunning} />
      </div>

      <div className="mt-16 flex flex-col items-center gap-4 w-full">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-green-500 h-4 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          onClick={handleClick}
          className={`bg-blue-600 text-white px-4 py-2 rounded transition-opacity duration-700 ${
            progress >= 100 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          See Loaded Content
        </button>
      </div>
    </div>
  );
};

export default ProgressBarLoader;
