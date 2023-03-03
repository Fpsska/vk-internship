import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Irow } from '../../types/boardTypes';

// /. imports

interface IboardSlice {
    boardData: Irow[][];
    boardSize: number;
    bombsCount: number;
    isGameOver: boolean;
    isGameWon: boolean;
    currentEmoji: string;
}

const initialState: IboardSlice = {
    boardData: [],
    boardSize: 2,
    bombsCount: 1,
    isGameOver: false,
    isGameWon: false,
    currentEmoji: 'happy'
};

const boardSlice = createSlice({
    name: 'boardSlice',
    initialState,
    reducers: {
        setBoardData(state, action: PayloadAction<Irow[][]>) {
            state.boardData = action.payload;
        },
        switchFlippedStatus(state, action: PayloadAction<{ id: string }>) {
            const { id } = action.payload;
            // /. payload

            const rowsData = state.boardData.flat(1);
            const targetField = rowsData.find(field => field.id === id);
            if (targetField) {
                targetField.isFlipped = true;
            }
        },
        switchFlaggedStatus(
            state,
            action: PayloadAction<{ id: string; status: boolean }>
        ) {
            const { id, status } = action.payload;
            // /. payload

            const rowsData = state.boardData.flat(1);
            const targetField = rowsData.find(field => field.id === id);
            if (targetField) {
                targetField.isFlagged = status;
            }
        },
        switchWarnedStatus(
            state,
            action: PayloadAction<{ id: string; status: boolean }>
        ) {
            const { id, status } = action.payload;
            // /. payload

            const rowsData = state.boardData.flat(1);
            const targetField = rowsData.find(field => field.id === id);
            if (targetField) {
                targetField.isWarned = status;
            }
        },
        switchDefusedStatus(
            state,
            action: PayloadAction<{ id: string; status: boolean }>
        ) {
            const { id, status } = action.payload;
            // /. payload

            const rowsData = state.boardData.flat(1);
            const targetField = rowsData.find(field => field.id === id);
            if (targetField) {
                targetField.isDefused = status;
            }
        },
        setCurrentCellValue(
            state,
            action: PayloadAction<{ id: string; value: string | number }>
        ) {
            const { id, value } = action.payload;
            console.log(value);
            // /. payload

            const rowsData = state.boardData.flat(1);
            const targetField = rowsData.find(field => field.id === id);
            if (targetField) {
                targetField.value = value;
            }
        },
        switchGameOverStatus(
            state,
            action: PayloadAction<{ status: boolean }>
        ) {
            const { status } = action.payload;
            // /. payload
            state.isGameOver = status;
        },
        switchGameWonStatus(state, action: PayloadAction<{ status: boolean }>) {
            const { status } = action.payload;
            // /. payload
            console.log(status);
            state.isGameWon = status;
        },
        switchEmojiStatuses(state, action: PayloadAction<string>) {
            state.currentEmoji = action.payload;
        },
        openBombsMap(state, action: PayloadAction<{ id: string }>) {
            const { id } = action.payload;
            // /. payload

            const bombsData = state.boardData
                .flat(1)
                .filter(field => field.isBomb);

            bombsData.map(field => {
                if (field.id === id) {
                    field.isFlipped = true;
                    field.isExploded = true;
                } else {
                    field.isFlipped = true;
                }
            });
        },
        calcBombsCount(state) {
            const bombsData = state.boardData
                .flat(1)
                .filter(field => field.isBomb);
            const activeBombs = bombsData.filter(field => !field.isDefused);
            state.bombsCount = activeBombs.length;
        },
        decrementBombsCount(state) {
            state.bombsCount -= 1;
        }
    }
});

export const {
    setBoardData,
    switchFlippedStatus,
    switchFlaggedStatus,
    switchWarnedStatus,
    switchDefusedStatus,
    setCurrentCellValue,
    switchGameOverStatus,
    switchGameWonStatus,
    switchEmojiStatuses,
    openBombsMap,
    calcBombsCount,
    decrementBombsCount
} = boardSlice.actions;

export default boardSlice.reducer;
