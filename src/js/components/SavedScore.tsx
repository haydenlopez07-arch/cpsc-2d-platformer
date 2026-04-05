import React, { useEffect, useState } from 'react'

interface Score {
    name: string,
          highestLevelAchieved: number,
          highScore: number,
}

const SavedScore = () => {
   const [scores, setScores] = useState(() => {
    const stored = localStorage.getItem("scores");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const handleScoresUpdate = () => {
      const stored = localStorage.getItem("scores");
      setScores(stored ? JSON.parse(stored) : []);
    };
    window.addEventListener("scoresUpdated", handleScoresUpdate);
    return () =>
      window.removeEventListener("scoresUpdated", handleScoresUpdate);
  }, []);
    return (
        <>
            <div className="container score-board">
        <div className="">
          <div className="row">
            <h2 className="score-title text-center">High Scores</h2>
          </div>
          {scores.length > 0 ? (
            scores.map((score: Score, index: number) => (
              <div
                key={score.name}
                className="score-item row mb-3  p-3 border rounded"
              >
                <div className="col-12 score-name text-warning fw-bold">
                  #{index + 1} {score.name}
                </div>
                <div className="row mt-2">
                  <div className="col-12 col-md-6 score-label">
                    Highest Level Reached:
                  </div>
                  <div className="col-12 col-md-6 score-value text-success">
                    {score.highestLevelAchieved}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-12 score-label">High Score:</div>
                  <div className="col-md-6 col-12 score-value text-primary fw-bold">
                    {score.highScore}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="row">
              <div className="col-12 text-center score-empty">
                No scores available yet. Play the game to set a high score!
              </div>
            </div>
          )}
        </div>
      </div>
        </>
    )
}

export default SavedScore;
