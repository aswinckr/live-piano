"use client";

import React, { useState, useEffect } from "react";
import * as Tone from "tone";

const PianoKey = ({
  note,
  isBlack,
  onPress,
}: {
  note: string;
  isBlack: boolean;
  onPress: (note: string) => void;
}) => (
  <button
    className={`${
      isBlack
        ? "bg-black text-white w-8 h-32 -mx-4 z-20"
        : "bg-white text-black w-12 h-48 z-10"
    } border border-gray-300 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500 relative`}
    onClick={() => onPress(note)}
  >
    <span className="sr-only">{note}</span>
  </button>
);

const octave = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export function PianoInterfaceComponent() {
  const [lastPressed, setLastPressed] = useState<string | null>(null);
  const [sampler, setSampler] = useState<Tone.Sampler | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const newSampler = new Tone.Sampler({
      urls: {
        A0: "A0.mp3",
        C1: "C1.mp3",
        "D#1": "Ds1.mp3",
        "F#1": "Fs1.mp3",
        A1: "A1.mp3",
        C2: "C2.mp3",
        "D#2": "Ds2.mp3",
        "F#2": "Fs2.mp3",
        A2: "A2.mp3",
        C3: "C3.mp3",
        "D#3": "Ds3.mp3",
        "F#3": "Fs3.mp3",
        A3: "A3.mp3",
        C4: "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        A4: "A4.mp3",
        C5: "C5.mp3",
        "D#5": "Ds5.mp3",
        "F#5": "Fs5.mp3",
        A5: "A5.mp3",
        C6: "C6.mp3",
        "D#6": "Ds6.mp3",
        "F#6": "Fs6.mp3",
        A6: "A6.mp3",
        C7: "C7.mp3",
        "D#7": "Ds7.mp3",
        "F#7": "Fs7.mp3",
        A7: "A7.mp3",
        C8: "C8.mp3",
      },
      release: 1,
      baseUrl: "https://tonejs.github.io/audio/salamander/",
      onload: () => {
        setIsLoaded(true);
        console.log("Sampler loaded!");
      },
    }).toDestination();

    setSampler(newSampler);

    return () => {
      newSampler.dispose();
    };
  }, []);

  const handleKeyPress = (note: string) => {
    setLastPressed(note);
    if (sampler && isLoaded) {
      sampler.triggerAttackRelease(note, "2n");
    }
  };

  const totalKeys = octave.length * 4; // 12 notes * 4 octaves = 48 keys

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gradient-to-b from-[#1f1f1f] to-[#1a1a1a] relative">
      {/* Vertical lines */}
      {Array.from({ length: totalKeys + 1 }).map((_, index) => (
        <div
          key={`line-${index}`}
          className="absolute top-0 bottom-0 w-px bg-[#353535]"
          style={{ left: `${(index / totalKeys) * 100}%` }}
        ></div>
      ))}

      <div className="flex-grow flex items-start justify-center relative z-30">
        {lastPressed && (
          <p className="mt-4 text-xl font-semibold text-gray-300">
            Last key pressed: {lastPressed}
          </p>
        )}
      </div>
      <div className="w-full relative z-20">
        <div className="flex justify-center">
          {[0, 1, 2, 3].map((octaveIndex) =>
            octave.map((note, index) => (
              <PianoKey
                key={`${octaveIndex}-${note}`}
                note={`${note}${octaveIndex + 4}`}
                isBlack={note.includes("#")}
                onPress={handleKeyPress}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
