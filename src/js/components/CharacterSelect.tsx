import React from "react";
import { useMemo, useState } from "react";
import "../../css/CharacterSelect.css";
import { useNavigate } from "react-router";
import CharacterCard from "./CharacterCard";
import {
  CHARACTER_OPTIONS,
  getCharacterOption,
} from "./characterCatalog";
import { getOwnedSkins, isSkinOwned } from "../systems/scoresManager";

function CharacterSelect() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState<number | null>(() => {
    const chosenCharacter = localStorage.getItem("chosenCharacter");
    const activeCharacter = CHARACTER_OPTIONS.find(
      (character) => character.skinName === chosenCharacter,
    );
    return activeCharacter?.id ?? 1;
  });
  const ownedSkins = useMemo(() => getOwnedSkins(), []);
  const character = CHARACTER_OPTIONS.find((entry) => entry.id === selected) ?? CHARACTER_OPTIONS[0];
  const selectedCharacterOwned = isSkinOwned(character.skinName);
  const selectedCharacterLabel = getCharacterOption(character.skinName)?.label ?? character.label;

  function handleConfirm() {
    if (!selectedCharacterOwned) return;

    localStorage.setItem("chosenCharacter", character.skinName);
    window.dispatchEvent(
      new CustomEvent("characterChanged", {
        detail: { chosenCharacter: character.skinName },
      }),
    );
    navigate("/");
  }

  return (
    <div className="page">
      <div className="retro-wrap">
        <div className="retro-title">SELECT YOUR CHARACTER</div>
        <div className="retro-sub">— equip owned skins —</div>
        <div className="char-grid three-columns">
          {CHARACTER_OPTIONS.map((entry) => {
            const owned = ownedSkins.includes(entry.skinName);

            return (
              <CharacterCard
                key={entry.id}
                character={entry}
                owned={owned}
                selected={selected === entry.id}
                onClick={() => setSelected(entry.id)}
                helperText={
                  owned
                    ? "ready to equip"
                    : `unlock in shop for ${entry.price} gold`
                }
                disabled={false}
              />
            );
          })}
        </div>
        <div className="selected-bar">
          {character ? (
            <>
              <img src={character.source} alt={selectedCharacterLabel} className="selected-preview" />
              <span style={{ color: "#ffdd00" }}>
                {selectedCharacterLabel}
                {selectedCharacterOwned ? " selected" : " locked"}
              </span>
            </>
          ) : (
            <span className="no-selection">
              no character selected
              <span className="cursor-blink" />
            </span>
          )}
        </div>
        <button
          className="confirm-btn"
          disabled={!selectedCharacterOwned}
          onClick={handleConfirm}
        >
          {selectedCharacterOwned ? "> CONFIRM SELECTION" : "> BUY IN SHOP FIRST"}
        </button>
        <button className="shop-link-btn" onClick={() => navigate("/shop")}>
          {"> VISIT SHOP"}
        </button>
      </div>
    </div>
  );
}

export default CharacterSelect;
