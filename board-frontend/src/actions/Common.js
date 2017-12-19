import {
    DATA_LOADING
    , DATA_LOADING_COMPLETE
} from './ActionTypes';

export function dataLoading(){
    return {
        type : DATA_LOADING
    };
}

export function dataLoadingComplete(){
    return {
        type : DATA_LOADING_COMPLETE
    };
}