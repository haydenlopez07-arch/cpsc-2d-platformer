import React, { useEffect, useState } from 'react'


const FirstTimePlaying = () => {
    
  const [show, setShow] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const boilerPlateScore = {
    name: "",
    highestLevelAchieved: 0,
    highScore: 0,
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (playerName.trim()) {
      localStorage.setItem("playerName", playerName.trim());

      const storedScores = localStorage.getItem("scores");
      if (!storedScores) {
        const scores = [
          {
            name: playerName.trim(),
            highestLevelAchieved: 0,
            highScore: 0,
          },
        ];
        localStorage.setItem("scores", JSON.stringify(scores));
      } else {
        const scores = JSON.parse(storedScores) as {
          name: string;
          highestLevelAchieved: number;
          highScore: number;
        }[];
        boilerPlateScore.name = playerName.trim();
        scores.push(boilerPlateScore);
        localStorage.setItem("scores", JSON.stringify(scores));
      }
      // Close overlay
      setShow(false);
      // Notify SavedScore to update
      window.dispatchEvent(new CustomEvent('scoresUpdated', { detail: { playerName: playerName.trim() } }));
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("hasPlayed")) {
      // Show the overlay for first-time players
      setShow(true);
      // Mark as played
      localStorage.setItem("hasPlayed", "true");
    }
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(10, 10, 15, 0.95)",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          borderRadius: '0.375rem',
          maxWidth: '90vw',
          maxHeight: '90vh',
          overflow: 'auto',
          padding: '1rem',
        }}
      >
        <div>
          <h5 className="text-white">
            Welcome to the Game!
          </h5>
        </div>
        <div className="text-white">
          <p>Welcome to our 2D Platformer! Here's a quick guide:</p>
          <ul>
            <li>Use arrow keys to move and jump.</li>
            <li>Collect coins and avoid enemies.</li>
            <li>Reach the highest level possible!</li>
          </ul>
          <p>Have fun playing!</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="playerName" className="form-label text-white">
                Enter your name:
              </label>
              <input
                type="text"
                className="form-control bg-dark"
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                required
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Let's Play!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FirstTimePlaying;
