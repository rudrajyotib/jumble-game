import { configureStore } from "@reduxjs/toolkit";
import { gameStateReducer } from "./data/GameStateSlice";

export default configureStore({
    reducer: {
        gameState: gameStateReducer
    }
})