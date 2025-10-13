import React, { useState, useEffect, useRef } from 'react';

interface MusicPlayerProps {
  songs: string[];
  initialVolume?: number;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ songs, initialVolume = 0.3 }) => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showClickToPlay, setShowClickToPlay] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(new Audio(songs[0]));

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = songs[currentSong];
    audio.volume = initialVolume;
    
    const handleEnded = () => {
      setCurrentSong(prev => (prev + 1) % songs.length);
    };
    
    audio.addEventListener('ended', handleEnded);

    setIsPlaying(false);

    let hasScrolled = false;
    const handleScroll = () => {
      if (!hasScrolled) {
        hasScrolled = true;
        setTimeout(() => {
          audio.play().then(() => {
            setIsPlaying(true);
            setShowClickToPlay(false);
          }).catch(e => console.log("Audio play error:", e));
        }, 100);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
      window.removeEventListener('scroll', handleScroll);
      audio.currentTime = 0;
    };
  }, [currentSong, songs, initialVolume, setShowClickToPlay]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        setShowClickToPlay(false);
      }).catch(e => {
        console.log("Audio play error:", e);
        if (e.name === 'NotAllowedError') {
          alert('Please interact with the page first to enable audio playback');
        }
      });
    }
  };

  const playNext = () => {
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    setCurrentSong(prev => (prev + 1) % songs.length);

    setTimeout(() => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(e => console.log("Audio play error:", e));
    }, 10);
  };

  const playPrevious = () => {
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    setCurrentSong(prev => (prev - 1 + songs.length) % songs.length);

    setTimeout(() => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(e => console.log("Audio play error:", e));
    }, 10);
  };

  const currentSongTitle = currentSong === 0 ? "Lily Of The Valley" : "Grow As We Go";

  return (
    <div className="fixed bottom-4 right-4 bg-white bg-opacity-80 backdrop-blur-sm rounded-full p-3 shadow-lg z-50 flex items-center space-x-3">
      <button
        onClick={playPrevious}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m17 18-6-6 6-6"/><path d="M7 6v12"/></svg>
      </button>
      <div className="flex items-center space-x-2 min-w-0">
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">{currentSongTitle}</p>
          <p className="text-xs text-gray-500">Music</p>
        </div>
      </div>
      <button
        onClick={togglePlayPause}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="10" x2="10" y1="15" y2="9"/><line x1="14" x2="14" y1="15" y2="9"/></svg>
        ) : (
          
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"/><circle cx="12" cy="12" r="10"/></svg>
        )}
      </button>
      <button
        onClick={playNext}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 18 6-6-6-6"/><path d="M17 6v12"/></svg>
      </button>
      {showClickToPlay && !isPlaying && (
        <div className="absolute -top-8 right-2 bg-black text-white text-xs rounded py-1 px-2 animate-pulse">
          Click to play
        </div>
      )}
    </div>
    );
  };

export default MusicPlayer;