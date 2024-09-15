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
        ? "bg-black text-white w-8 h-32 -mx-4 z-10"
        : "bg-white text-black w-12 h-48"
    } border border-gray-300 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
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

  useEffect(() => {
    const newSampler = new Tone.Sampler({
      urls: {
        C4: "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        A4: "A4.mp3",
      },
      baseUrl: "https://tonejs.github.io/audio/salamander/",
      onload: () => {
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
    if (sampler && sampler.loaded) {
      sampler.triggerAttackRelease(note, "2n");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl">
        <div className="flex">
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
      {lastPressed && (
        <p className="mt-4 text-xl font-semibold text-gray-700">
          Last key pressed: {lastPressed}
        </p>
      )}
    </div>
  );
}
