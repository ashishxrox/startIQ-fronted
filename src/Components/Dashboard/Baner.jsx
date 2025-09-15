import React, { useState } from "react";
import YouTube from "react-youtube";

const Banner = ({ videoUrl, startupName }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    // Extract videoId (supports both "watch?v=" and "youtu.be" formats)
    let videoId = "";
    if (videoUrl.includes("watch?v=")) {
        videoId = videoUrl.split("v=")[1]?.split("&")[0];
    } else if (videoUrl.includes("youtu.be")) {
        videoId = videoUrl.split("youtu.be/")[1]?.split("?")[0];
    } else if (videoUrl.includes("embed/")) {
        videoId = videoUrl.split("embed/")[1]?.split("?")[0];
    }

    const opts = {
        width: "100%",
        height: "100%",
        playerVars: {
            autoplay: 0,
            controls: 1,
        },
    };

    const handleStateChange = (event) => {
        if (event.data === 1) setIsPlaying(true);   // playing
        if (event.data === 2) setIsPlaying(false);  // paused
    };

    return (
        <div className="w-full h-56 lg:h-120 relative rounded-b-2xl overflow-hidden shadow-md mb-5">
            {/* 🎥 YouTube Video */}
            <YouTube
                videoId={videoId}
                opts={opts}
                className="w-full h-full"
                onStateChange={handleStateChange}
            />

            {/* 🔹 Overlay text (hidden when playing) */}
            {!isPlaying && (
                <div className="absolute bottom-0 py-[20px] w-full pl-[30px] bg-white "
                style={{transition:"all 2s ease-in-out"}}
                >
                    <h1 className="text-3xl lg:text-5xl font-extrabold bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-mid1)] via-[var(--gradient-mid2)] to-[var(--gradient-end)] bg-clip-text text-transparent">
                        {startupName}
                    </h1>
                    <div className="h-1 w-24 mt-2 bg-gradient-to-r from-[#FFD500] via-[#FF7A00] to-[#FF3C00] rounded-full"></div>
                </div>
            )}
        </div>
    );
};

export default Banner;




{/* 🔹 Overlay text */ }



