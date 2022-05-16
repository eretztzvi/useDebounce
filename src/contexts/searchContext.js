import { createContext, useState } from "react";

const initialState = {
    search_words: [],
    add_word: () => { },
    clear: () => { }
}

const SearchWordsContext = createContext(initialState)


const SearchWordsProvider = ({ children }) => {
    const [state, setState] = useState({
        search_words: []
    })

    const add_word = word => {
        setState({
            ...state,
            search_words: [...state.search_words, word]
        })
    }

    const clear = () => {
        setState({
            ...state,
            search_words: []
        })
    }

    return (
        <SearchWordsContext.Provider value={{ ...state, add_word, clear }}>
            {children}
        </SearchWordsContext.Provider>
    )
}

export { SearchWordsProvider, SearchWordsContext }