import React from "react";
import { Route, Routes } from "react-router";
import MainMenu from "./components/MainMenu";
import LevelOne from "./components/LevelOne";
import CharacterSelect from "./components/CharacterSelect";
import ShopPage from "./components/ShopPage";
import CreditsScreen from "./components/CreditsScreen";

const PageController = () => {
	return (
		<Routes>
			<Route path="/" index={true} element={<MainMenu />} />
			<Route path="/level-one" element={<LevelOne />} />
			<Route path="/character-select" element={<CharacterSelect />} />
			<Route path="/shop" element={<ShopPage />}/>
			<Route path="/credits" element={<CreditsScreen />}/>
			<Route path="*" element={<h1>Page Not Found</h1>} />
		</Routes>
	);
}

export default PageController;