import { toggleGodMode } from "../systems/godMode";
import { setAttackPressed } from "../main";
import { getCurrentLevel } from "../maps/render";

interface SettingsProps {
    isGodModeOn: boolean;
    setGodMode: React.Dispatch<React.SetStateAction<boolean>>;
    setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

function SettingsScreen( {isGodModeOn, setGodMode, setShowSettings }: SettingsProps) {

    const onTeleport = () => {
        window.dispatchEvent(new Event("teleportToBossPortal"));
    }

    return (
        <div style={styles.overlay}>
            <div style={styles.card}>

                <h2 style={styles.title}>SETTINGS</h2>

                <div style={styles.summary}>

                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            checked={isGodModeOn}
                            onChange={() => {
                                toggleGodMode();
                                setAttackPressed();
                                setGodMode(prev => !prev);
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckDefault"
                        >
                            Turn on Invulnerability
                        </label>
                    </div>

                    <div style={styles.actions}>
                        <button 
                            style={{
                                ...styles.button, 
                                ...(getCurrentLevel() === 1 ? styles.disabledButton : {})
                            }}
                            onClick={onTeleport}
                            disabled={getCurrentLevel() === 1}
                        >
                            Teleport to Portal
                        </button>
                    </div>

                    <div style={styles.actions}>
                        <button style={styles.button} onClick={ () => setShowSettings(prev => !prev)}>
                            Back
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}


const styles = {
    overlay: {
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 30,
        padding: 16,
    } as React.CSSProperties,
    card: {
        width: "min(560px, 95vw)",
        background: "#131313",
        border: "2px solid #d3b574",
        color: "#f7efda",
        borderRadius: 8,
        padding: "20px 18px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.45)",
        fontFamily: "'Press Start 2P', monospace",
    } as React.CSSProperties,
    title: {
        margin: 0,
        fontSize: 16,
        lineHeight: 1.6,
    } as React.CSSProperties,
    summary: {
        marginTop: 14,
        fontSize: 10,
        lineHeight: 1.9,
        color: "#e2d0a9",
    } as React.CSSProperties,
    actions: {
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        marginTop: 18,
    } as React.CSSProperties,
    button: {
        border: "1px solid #d3b574",
        background: "#222",
        color: "#f7efda",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: 10,
        padding: "10px 12px",
        cursor: "pointer",
    } as React.CSSProperties,
    disabledButton: {
        opacity: 0.45,
        cursor: "not-allowed",
    } as React.CSSProperties,
};

export default SettingsScreen;