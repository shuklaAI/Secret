import {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
  ReactNode,
} from "react";

interface AudioContextType {
  isPlaying: boolean;
  toggle: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

// YouTube video ID from https://youtu.be/GVizJ_jpUnw
const YT_VIDEO_ID = "GVizJ_jpUnw";
// Start at 3:49 = 229 seconds
const YT_START_SECONDS = 229;

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Create hidden container for YT player
    const div = document.createElement("div");
    div.id = "yt-audio-player";
    div.style.position = "fixed";
    div.style.top = "-9999px";
    div.style.left = "-9999px";
    div.style.width = "1px";
    div.style.height = "1px";
    div.style.opacity = "0";
    div.style.pointerEvents = "none";
    document.body.appendChild(div);
    containerRef.current = div;

    const initPlayer = () => {
      playerRef.current = new window.YT.Player("yt-audio-player", {
        videoId: YT_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          start: YT_START_SECONDS,
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(18); // very soft — only she'll hear it
            setIsReady(true);
          },
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0
            setIsPlaying(event.data === 1);
            // When video ends (state 0), loop back to 3:49
            if (event.data === 0) {
              event.target.seekTo(YT_START_SECONDS, true);
              event.target.playVideo();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
      if (!document.getElementById("yt-api-script")) {
        const script = document.createElement("script");
        script.id = "yt-api-script";
        script.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(script);
      }
    }

    return () => {
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch {}
        playerRef.current = null;
      }
      if (containerRef.current) {
        document.body.removeChild(containerRef.current);
        containerRef.current = null;
      }
    };
  }, []);

  const toggle = () => {
    if (!playerRef.current || !isReady) return;
    try {
      const state = playerRef.current.getPlayerState();
      if (state === 1) {
        playerRef.current.pauseVideo();
      } else {
        // If ended or at wrong position, seek back to 3:49
        const currentTime = playerRef.current.getCurrentTime();
        if (currentTime < YT_START_SECONDS - 2 || currentTime === 0) {
          playerRef.current.seekTo(YT_START_SECONDS, true);
        }
        playerRef.current.playVideo();
      }
    } catch (err) {
      console.log("YT player error:", err);
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggle }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
  return ctx;
}
