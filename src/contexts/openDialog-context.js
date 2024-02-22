import {createContext} from 'react';

export const OpenDialogContext = createContext({
    openDialog: false,
    setOpenDialog: ()=>{},
    openSuccessModal: false,
    setOpenSuccessModal: ()=>{}
});