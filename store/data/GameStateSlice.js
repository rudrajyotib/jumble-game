import { createSlice } from "@reduxjs/toolkit";

export const GameStateSlice = createSlice(
    {
        name: 'gameState',
        initialState: {
            mode: 'offline',
            players: [],
            feed: {
                duels: {
                    duelList: [],
                    lastUpdate: Date.now(),
                    loaded: false
                },
                friends: {
                    friendList: [],
                    lastUpdate: Date.now(),
                    loaded: false
                }
            }
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
                state.mode = ''
                state.authenticatedUser = {}
            },
            setLoginDetails: (state, action) => {
                state.authenticatedUser = action.payload
            },
            updateDuels: (state, action) => {
                state.feed.duels.duelList = action.payload.duelList
                state.feed.duels.lastUpdate = Date.now()
                state.feed.duels.loaded = true
            },
            updateFriends: (state, action) => {
                state.feed.friends.friendList = action.payload.friendList
                state.feed.friends.lastUpdate = Date.now()
                state.feed.friends.loaded = true
            }
        }
    }
)


export const { setPlayers, resetGame, setGameModeOnline, setLoginDetails, setGameModeOffline, updateDuels, updateFriends } = GameStateSlice.actions
export const gameStateReducer = GameStateSlice.reducer