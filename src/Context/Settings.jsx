import React, {useState, useEffect} from 'react';

export const SettingsContext = React.createContext();

// eslint-disable-next-line react/prop-types
const SettingsProvider = ({children}) => {

const[showCompleted, setShowCompleted] = useState(false);

const[pageItems, setPageItems] = useState(3);

const[sort, setSort] = useState('difficulty');

let values = {
    showCompleted, setShowCompleted, pageItems, setPageItems, sort, setSort
};

return(<SettingsContext.Provider value = {values}>{children}</SettingsContext.Provider>)

}

export default SettingsProvider
