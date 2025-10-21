import React, { useState } from "react";
import { Music, Clock, User, Disc, X, Play } from "lucide-react";

const Alert = ({ children }) => (
  <div className="fixed top-4 left-4 bg-green-100 border border-green-600 text-green-800 p-4 rounded-lg shadow-lg animate-fade-in">
    {children}
  </div>
);

const TrackCard = ({
  title,
  artist,
  album,
  duration,
  genre,
  releaseYear,
  coverImage,
  additionalDetails = [],
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [touchTimer, setTouchTimer] = useState(null);
  const [isHolding, setIsHolding] = useState(false);

  const handleTouchStart = () => {
    if (window.innerWidth <= 768) {
      setIsHolding(true);
      const timer = setTimeout(() => {
        setIsExpanded(true);
        setIsHolding(false);
      }, 1500);
      setTouchTimer(timer);
    }
  };

  const handleTouchEnd = () => {
    if (touchTimer) {
      clearTimeout(touchTimer);
      setTouchTimer(null);
    }
    setIsHolding(false);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  return (
    <div
      className="relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {isHolding && (
        <div className="absolute inset-0 bg-black bg-opacity-10 rounded-2xl flex items-center justify-center z-10">
          <div className="bg-white rounded-full p-3 shadow-lg">
            <Music className="h-8 w-8 text-green-600 animate-pulse" />
          </div>
        </div>
      )}

      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-lg text-gray-600 mb-6">{artist}</p>

      <div className="space-y-4">
        <div className="flex items-center space-x-4 group">
          <div className="bg-green-50 p-3 rounded-full group-hover:bg-green-100 transition-colors">
            <Clock className="h-6 w-6 text-green-600" />
          </div>
          <span className="text-lg text-gray-600">{duration}</span>
        </div>

        <div className="flex items-center space-x-4 group">
          <div className="bg-green-50 p-3 rounded-full group-hover:bg-green-100 transition-colors">
            <Disc className="h-6 w-6 text-green-600" />
          </div>
          <span className="text-lg text-gray-600">{album}</span>
        </div>
      </div>

      <div className="md:hidden mt-4 text-center">
        <div className="text-xs text-green-600 font-medium flex items-center justify-center">
          <span className="inline-block w-3 h-3 bg-green-100 rounded-full mr-1 animate-pulse"></span>
          Hold card to know more about this track
        </div>
      </div>

      {isExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 md:hidden">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>

            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-lg overflow-hidden mb-4 border-4 border-green-100">
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.parentNode.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-green-50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600">
                          <path d="M9 18V5l12-2v13"></path>
                          <circle cx="6" cy="18" r="3"></circle>
                          <circle cx="18" cy="16" r="3"></circle>
                        </svg>
                      </div>`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-green-50">
                    <Music className="h-12 w-12 text-green-600" />
                  </div>
                )}
              </div>

              <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-lg text-gray-600 mb-4">{artist}</p>

              {(additionalDetails.length > 0 || genre || releaseYear) && (
                <div className="w-full bg-green-50 rounded-lg p-4 mb-4">
                  <ul className="space-y-2">
                    {genre && (
                      <li className="text-gray-700 flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2"></span>
                        Genre: {genre}
                      </li>
                    )}
                    {releaseYear && (
                      <li className="text-gray-700 flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2"></span>
                        Released: {releaseYear}
                      </li>
                    )}
                    {additionalDetails.map((detail, index) => (
                      <li
                        key={index}
                        className="text-gray-700 flex items-start"
                      >
                        <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-4 w-full">
                <div className="flex items-center justify-center space-x-3 bg-green-50 p-4 rounded-lg text-green-700 font-medium">
                  <Clock className="h-5 w-5" />
                  <span>{duration}</span>
                </div>

                <div className="flex items-center justify-center space-x-3 bg-green-50 p-4 rounded-lg text-green-700 font-medium">
                  <Disc className="h-5 w-5" />
                  <span>{album}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TracksLanding = () => {
  const [showAlert, setShowAlert] = useState(false);

  const sampleTracks = [
    {
      title: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      duration: "5:55",
      genre: "Rock",
      releaseYear: "1975",
      coverImage: null,
      additionalDetails: [
        "Written by Freddie Mercury",
        "6 weeks at UK #1",
        "Grammy Hall of Fame inductee",
      ],
    },
    {
      title: "Imagine",
      artist: "John Lennon",
      album: "Imagine",
      duration: "3:03",
      genre: "Pop/Rock",
      releaseYear: "1971",
      coverImage: null,
      additionalDetails: [
        "Co-written with Yoko Ono",
        "Best-selling single of career",
        "Ranked #3 on Rolling Stone's 500 Greatest Songs",
      ],
    },
    {
      title: "Billie Jean",
      artist: "Michael Jackson",
      album: "Thriller",
      duration: "4:54",
      genre: "Pop/R&B",
      releaseYear: "1983",
      coverImage: null,
      additionalDetails: [
        "7 weeks at Billboard #1",
        "Grammy Award winner",
        "Iconic moonwalk debut performance",
      ],
    },
    {
      title: "Smells Like Teen Spirit",
      artist: "Nirvana",
      album: "Nevermind",
      duration: "5:01",
      genre: "Grunge/Alternative",
      releaseYear: "1991",
      coverImage: null,
      additionalDetails: [
        "Anthem of Generation X",
        "Named Greatest Song of All Time by NME",
        "Inducted into Grammy Hall of Fame",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-4 px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-green-50 p-2 rounded-full">
                <Music className="text-green-600 h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-gray-800">
                Music Tracks
              </span>
            </div>
          </div>
        </div>
      </nav>

      {showAlert && <Alert>Action completed successfully!</Alert>}

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Amazing{" "}
            <span className="text-green-600 inline-block">Music Tracks</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Explore our curated collection of iconic tracks from legendary
            artists. Hold any card to learn more about the music you love.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-t from-green-50/50 to-transparent py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Tracks
            </h2>
            <p className="text-xl text-gray-600">
              A collection of timeless classics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {sampleTracks.map((track, index) => (
              <TrackCard key={index} {...track} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TracksLanding;
