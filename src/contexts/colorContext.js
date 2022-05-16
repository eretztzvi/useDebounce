import { createContext, useState } from 'react';

const initialState = {
    background: 'white',
    onChangeBackground: () => { }
}

const ThemeContext = createContext(initialState)

const ThemeProvider = ({ children }) => {
    const [state, setState] = useState({
        background: 'white'
    })

    const onChangeBackground = (color) => {
        setState({
            ...state,
            background: state.background === "black" ? "white" : "black"
        })
    }

    return (
        <ThemeContext.Provider value={{ ...state, onChangeBackground }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext }