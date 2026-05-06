import React from "react";
import { useNavigate } from "react-router";
import "../../css/CreditsScreen.css";

const DEFAULT_TEAM_NAMES = ["Jay: Integration Manager", "Anthony: Scrum Liason", "Ryan: Developer", "Tanner: Developer", "Hayden: Developer", "Evan Varozza: Developer"];

function CreditsScreen() {
  const navigate = useNavigate();

  return (
    <div className="credits-screen">
      <div className="credits-screen__panel">
        <div className="credits-screen__header">
          <div>
            <h1 className="credits-screen__title">CREDITS</h1>
          </div>
          <button
            type="button"
            className="credits-screen__back-button"
            onClick={() => navigate("/")}
          >
            BACK TO MENU
          </button>
        </div>

        <section className="credits-screen__card credits-screen__card--full">
          <h2 className="credits-screen__section-title">CPSC 208 Platformer Team</h2>
          <div className="credits-screen__preview-box">
            <div className="credits-screen__preview-list">
              {DEFAULT_TEAM_NAMES.map((name, index) => (
                <div className="credits-screen__preview-name" key={`preview-${index}`}>
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CreditsScreen;