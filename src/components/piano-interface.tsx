'use client'

import React, { useState } from 'react'

const PianoKey = ({ note, isBlack, onPress }: { note: string; isBlack: boolean; onPress: (note: string) => void }) => (
  <button
    className={`${
      isBlack
        ? 'bg-black text-white w-8 h-32 -mx-4 z-10'
        : 'bg-white text-black w-12 h-48'
    } border border-gray-300 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
    onClick={() => onPress(note)}
  >
    <span className="sr-only">{note}</span>
  </button>
)

const octave = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export function PianoInterfaceComponent() {
  const [lastPressed, setLastPressed] = useState<string | null>(null)

  const handleKeyPress = (note: string) => {
    setLastPressed(note)
    // Here you would typically trigger a sound for the pressed key
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl">
        <div className="flex">
          {[0, 1, 2, 3].map((octaveIndex) =>
            octave.map((note, index) => (
              <PianoKey
                key={`${octaveIndex}-${note}`}
                note={`${note}${octaveIndex + 4}`}
                isBlack={note.includes('#')}
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
  )
}