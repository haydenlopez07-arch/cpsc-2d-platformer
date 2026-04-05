import React, { useState } from "react";
import "../../css/main-menu-style.css"
import "../../css/styles.css"
import backgroundImage from '../../assets/backgrounds/temp-menu-clouds-background.jpg';
import titleImage from '../../assets/sprites/ui/temp-transparent-title.png';
import SavedScore from "./SavedScore";
import FirstTimePlaying from "./FirstTimePlaying";

interface MainMenuProps {
  onSendShownComponent: (data: any) => void;
}


const MainMenu: React.FC<MainMenuProps> = ({onSendShownComponent}) => {
    const [componentToShow, setComponentToShow] = useState("")

    const handleChange = ((componentName: string) => {
        // setComponentToShow(componentName)
        onSendShownComponent(componentName)
    })
	return (
        <>
    {/* Main Container For Grid */}
    <div style={{ 
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 80%',
      backgroundAttachment: "fixed"
    }}>
  
    <div className="container min-vh-100 min-vw-100">
      <div className="row h-100">
        <div className="col-md-6 vh-100 px-2 h-100">
          <div
            className="h-100 d-flex flex-column bg-dark justify-content-around"
            >
            <div className="row">
              <div
                className="col-6 col-md-5 col-lg-4 col-xl-3 offset-1 offset-sm-0"
                >
                <div className="pt-5"></div>
              </div>
            </div>

            {/* Picture for game title */}
            <div className="row justify-content-center">
              <div className="col-6 w-75 col-md-5 col-lg-4 col-xl-3">
                <img
                  src={titleImage}
                  alt="Game Title"
                  className="img-fluid rounded-2 mb-5 text-center w-100"
                  />
              </div>
            </div>

            {/* Where all the buttons go */}
            <div
              className="row justify-content-center w-100 pb-5 px-5 px-md-4 px-lg-5"
              >
              {/* the px- are for when using -around
              Used a flexbox to arrage buttons */}
              <div className="d-flex flex-column align-items-center">
                {/* try this, align-items-around, instead of -center for another option */}
                <button onClick={() => handleChange("levelOne")} className=" btn-custom-color btn  rounded-1 mb-3 fs-4 fs-custom-sm"><i className="bi bi-suit-diamond-fill pe-1"></i>Start New Game<i className="bi bi-suit-diamond-fill ps-1"></i></button>
                {/* TODO add component with tall z-index that shows up when this button is clicked. The button should only be visible on small screens. */}
                {/* <button className=" btn-custom-color btn  rounded-1 mb-3 fs-4 fs-custom-sm"><i className="bi bi-trophy-fill pe-1"></i>View Scores<i className="bi bi-trophy-fill ps-1"></i></button> */}
                <button onClick={() => handleChange("changeCharacter")} className=" btn-custom-color btn  rounded-1 mb-3 fs-4 fs-custom-sm"><i className="bi bi-person-standing pe-1"></i>Change Character<i className="bi bi-person-standing ps-1"></i></button>
                <button className=" btn-custom-color btn  rounded-1 mb-3 fs-4 fs-custom-sm"><i className="bi bi-suit-diamond-fill pe-1"></i>Settings<i className="bi bi-suit-diamond-fill ps-1"></i></button>
                <button className=" btn-custom-color btn  rounded-1 mb-3 fs-4 fs-custom-sm"><i className="bi bi-suit-diamond-fill pe-1"></i>Credits<i className="bi bi-suit-diamond-fill ps-1"></i></button>
                {/* <a
                  href="level_one.html"
                  className="btn btn-custom-color btn-hover rounded-1 mb-3 fs-4 fs-custom-sm"
                  >
                  <i className="bi bi-suit-diamond-fill"></i> Start New Game
                  <i className="bi bi-suit-diamond-fill"></i>
                </a>
                <button
                  type="button"
                  className="btn btn-custom-color btn-hover rounded-1 mb-3 fs-4 fs-custom-sm d-md-none"
                  data-bs-toggle="modal"
                  data-bs-target="#scoresModal"
                  >
                  <i className="bi bi-trophy-fill"></i> View Scores
                  <i className="bi bi-trophy-fill"></i>
                </button>
                <a
                  href="character-selection.html"
                  className="btn btn-custom-color btn-hover rounded-1 mb-3 fs-4 fs-custom-sm"
                  >
                  <i className="bi bi-person-standing"></i> Change Character
                  <i className="bi bi-person-standing"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-custom-color btn-hover rounded-1 mb-3 fs-4 fs-custom-sm"
                  >
                  <i className="bi bi-suit-diamond-fill"></i> Settings
                  <i className="bi bi-suit-diamond-fill"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-custom-color btn-hover rounded-1 mb-2 fs-4 fs-custom-sm"
                  >
                  <i className="bi bi-suit-diamond-fill"></i> Credits
                  <i className="bi bi-suit-diamond-fill"></i>
                </a> */}
              </div>
            </div>

            {/* If we want to add stuff below the buttons.
            <div className="row justify-content-center w-100">
            <div className="w-75">
            Stuff goes here
            </div>
            </div> */}
          </div>
        </div>

        {/* Right column where scores stuff is displayed */}
        <div
          className="col-md-6 vh-100 d-none d-md-flex justify-content-center align-items-center"
          >
          <div className="w-100"><SavedScore /></div>
        </div>
      </div>
    </div>

    {/* Scores Modal */}
    {/* <div
      className="modal fade"
      id="scoresModal"
      tabIndex={-1}
      aria-labelledby="scoresModalLabel"
      aria-hidden="true"
      >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
              ></button>
          </div>
          <div className="modal-body">
            <div id="saved_score_modal_inject"></div>
          </div>
        </div>
      </div>
    </div> */}

    {/* First Time Playing Inject */}
    <div>
        <FirstTimePlaying />
    </div>
              </div>
              </>
	)
}

export default MainMenu;