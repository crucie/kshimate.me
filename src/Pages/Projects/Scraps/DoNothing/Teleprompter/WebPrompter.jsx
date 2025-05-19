import { useState, useEffect, useRef } from 'react';

export default function Teleprompter() {
  // Theme toggle
  const [darkMode, setDarkMode] = useState(false);
  const [text, setText] = useState('');
  const [savedText, setSavedText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(2); // Words per second
  const [position, setPosition] = useState(0);
  const [fontSize, setFontSize] = useState('text-2xl');
  const prompterRef = useRef(null);
  const containerRef = useRef(null);

  // Handle text change in the textarea
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Save the text to be displayed in the teleprompter
  const handleSave = () => {
    setSavedText(text);
    setPosition(0);
  };

  // Toggle play/pause state
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Reset position to the top
  const handleReset = () => {
    setPosition(0);
    setIsPlaying(false);
  };

  // Handle font size change
  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  // Handle speed change
  const handleSpeedChange = (e) => {
    setSpeed(parseFloat(e.target.value));
  };

  // Auto-scroll effect when playing
  useEffect(() => {
    let animationId;
    
    if (isPlaying && prompterRef.current && containerRef.current) {
      const animate = () => {
        setPosition(prev => {
          const newPosition = prev + speed * 0.05;
          
          // Stop at the end
          if (prompterRef.current && 
              newPosition > prompterRef.current.scrollHeight - containerRef.current.clientHeight) {
            setIsPlaying(false);
            return prev;
          }
          
          return newPosition;
        });
        
        animationId = requestAnimationFrame(animate);
      };
      
      animationId = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPlaying, speed]);

  // Update scroll position
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = position;
    }
  }, [position]);

  // Font size options
  const fontSizeOptions = [
    { value: 'text-lg', label: 'Small' },
    { value: 'text-2xl', label: 'Medium' },
    { value: 'text-4xl', label: 'Large' },
    { value: 'text-6xl', label: 'Extra Large' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto p-6 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center">Teleprompter</h1>
      
      {/* Text Input Section */}
      <div className="space-y-4">
        <textarea 
          value={text} 
          onChange={handleTextChange} 
          placeholder="Enter your script here..."
          className="min-h-32 w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 resize-y"
          rows={6}
        />
        <button 
          onClick={handleSave} 
          className="w-full py-2 bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md font-medium transition-colors"
        >
          Save Script
        </button>
      </div>

      {/* Controls Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Scrolling Speed: {speed.toFixed(1)} lines/sec</p>
          <input 
            type="range" 
            value={speed} 
            min={0.5} 
            max={10} 
            step={0.1} 
            onChange={handleSpeedChange}
            className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Font Size</p>
          <select 
            value={fontSize} 
            onChange={handleFontSizeChange}
            className="w-full p-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {fontSizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button 
          onClick={togglePlay} 
          className={`px-6 py-4 rounded-md text-white transition-colors ${isPlaying ? 'bg-gray-600' : 'bg-gray-800'} hover:bg-gray-700 dark:hover:bg-gray-600`}
        >
          {isPlaying ? 'Pause' : 'Start'}
        </button>
        <button 
          onClick={handleReset} 
          className="px-6 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Teleprompter Display */}
      {savedText && (
        <div className="mt-10 relative">
          <div 
            ref={containerRef}
            className="w-full border-t-4 border-b-4 border-gray-800 dark:border-gray-600 h-screen overflow-hidden relative"
          >
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-gray-50 via-transparent to-gray-50 dark:from-gray-900 dark:to-gray-900 z-10" />
            
            <div 
              ref={prompterRef}
              className={`p-6 pt-12 pb-12 ${fontSize} font-medium text-center whitespace-pre-wrap`}
            >
              {savedText}
            </div>
          </div>
          
          {/* Center line indicator */}
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 border-t-2 border-red-500 pointer-events-none" />
        </div>
      )}
    </div>
  );
}