import { createSlice } from "@reduxjs/toolkit";

export const GameStateSlice = createSlice(
    {
        name: 'gameState',
        initialState: {
            mode: 'offline',
            players: []
        },
        reducers: {
            setPlayers: (state, action) => {
                state.players = action.payload.players
            },
            setGameModeOnline: state => {
                state.mode = 'online'
            },
            setGameModeOffline: state => {
                state.mode = 'offline'
            },
            resetGame: state => {
                state.players = []
            },
            setLoginDetails: (state, action) => {
                state.authenticatedUser = action.payload
            }
        }
    }
)


export const { setPlayers, resetGame, setGameModeOnline, setLoginDetails } = GameStateSlice.actions
export const gameStateReducer = GameStateSlice.reducer