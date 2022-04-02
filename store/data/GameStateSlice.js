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
            resetGame: state => {
                state.players = []
            }
        }
    }
)


export const { setPlayers, resetGame, setGameModeOnline } = GameStateSlice.actions
export const gameStateReducer = GameStateSlice.reducer