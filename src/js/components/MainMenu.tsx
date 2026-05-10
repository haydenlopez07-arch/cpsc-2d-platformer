import React, { useState } from "react";
import "../../css/main-menu-style.css"
import "../../css/styles.css"
import backgroundImage from '../../assets/backgrounds/temp-menu-clouds-background.jpg';
import titleImage from '../../assets/sprites/ui/title_card.png';
import SavedScore from "./SavedScore";
import FirstTimePlaying from "./FirstTimePlaying";
import { useNavigate } from "react-router";
import { stopBGMusic } from "../systems/soundsManager";




const MainMenu = () => {
  stopBGMusic();
  const [componentToShow, setComponentToShow] = useState("")

  const navigate = useNavigate()

  return (
    <>
      <div style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 80%',
        backgroundAttachment: "fixed"
      }}
        className="min-vw-100">

        {/* Main Container For Grid */}
        <div className="container min-vh-100 root">
          <div className="row h-100">

            <div className="col-md-6 vh-100 px-2 h-100">
              <div className="transparent-edges h-100 d-flex flex-column justify-content-around">

                {/* Top for padding */}
                <div className="row">
                  <div className="col-6 col-md-5 col-lg-4 col-xl-3 offset-1 offset-sm-0">
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
                <div className="row justify-content-center w-100 pb-5 px-5 px-md-4 px-lg-5">
                  <div className="d-flex flex-column align-items-center">
                    <button onClick={() => { navigate("/level-one") }} className=" btn-custom-color btn  rounded-1 mb-3 fs-4 fs-custom-sm">
                      <i className="bi bi-suit-diamond-fill pe-1"></i>
                      Start New Game
                      <i className="bi bi-suit-diamond-fill ps-1"></i>
                    </button>
                    {/* TODO add component with tall z-index that shows up when this button is clicked. The button should only be visible on small screens. */}
                    <button onClick={() => { navigate("/character-select") }} className=" btn-custom-color btn  rounded-1 mb-3 fs-4 fs-custom-sm">
                      <i className="bi bi-person-standing pe-1"></i>
                      Change Character
                      <i className="bi bi-person-standing ps-1"></i>
                    </button>
                    <button onClick={() => { navigate("/shop") }} className=" btn-custom-color btn  rounded-1 mb-3 fs-4 fs-custom-sm">
                      <i className="bi bi-cart2 pe-1"></i>
                      Shop
                      <i className="bi bi-cart2 ps-1"></i>
                    </button>
                    <button className=" btn-custom-color btn  rounded-1 mb-3 fs-4 fs-custom-sm">
                      <i className="bi bi-suit-diamond-fill pe-1"></i>
                      Settings
                      <i className="bi bi-suit-diamond-fill ps-1"></i>
                    </button>
                    <button onClick={() => { navigate("/credits") }} className=" btn-custom-color btn  rounded-1 mb-3 fs-4 fs-custom-sm">
                      <i className="bi bi-suit-diamond-fill pe-1"></i>
                      Credits
                      <i className="bi bi-suit-diamond-fill ps-1"></i>
                    </button>
                  </div>
                </div>

                {/*
              If we want to add stuff below the buttons.
              <div class="row justify-content-center w-100">
                <div class="w-75">
                  Stuff goes here
                </div>
              </div>
              */}

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

        {/* First Time Playing Inject */}
        <div>
          <FirstTimePlaying />
        </div>
      </div>
    </>
  )
}

export default MainMenu;