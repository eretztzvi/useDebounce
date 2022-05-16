import { useContext, useEffect, useRef, useState } from "react";
import useDebounce from "./hooks/useDebounce";
import Axios from 'axios'
import { ThemeContext } from "./contexts/colorContext";
import { SearchWordsContext } from "./contexts/searchContext";
import Timer from "./components/Timer";

function App() {

  const inputRef = useRef()

  const theme = useContext(ThemeContext)
  const words = useContext(SearchWordsContext)

  const [state, setState] = useState({
    current_value: "",
    data: null,
    is_loading: false,
    debounce_time: 1000,
    active_timer: false
  })

  const debounceValue = useDebounce(state.current_value, state.debounce_time)

  const handleChanges = e => {
    setState({ ...state, current_value: e.target.value, active_timer: !state.active_timer, debounce_time: state.debounce_time })
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  useEffect(() => {
    if (debounceValue) handleFetchData(debounceValue)
    if (!debounceValue) setState({ ...state, data: null })
  }, [debounceValue])


  const handleFetchData = value => {

    setState({ ...state, is_loading: true })

    words.add_word(value)

    Axios.get(`https://api.nationalize.io/?name=${value}`)
      .then(res => {
        setState({ ...state, data: res.data, is_loading: false })
      })
      .catch(err => {
        alert(err.message)
        setState({ ...state, is_loading: false })
      })
  }

  const handleChangeDebounceTime = time => {
    setState({ ...state, debounce_time: +time })
  }

  const handleInactiveTimer = () => {
    setState({
      ...state,
      active_timer: false
    })
  }

  return (
    <div className={theme.background === "black" ? "AppBlack" : "App"}>

      <div className="toggleBox">
        <button onClick={() => theme.onChangeBackground('black')}>{theme.background === "black" ? "🌕" : "🌚"}</button>
      </div>
      <h1>Predict the nationality of a name</h1>
      <h3>An API for predicting nationality from a name</h3>

      <br />

      <label>Name</label>
      <input ref={inputRef} value={state.current_value} onChange={handleChanges} placeholder="Enter any name..." />
      <br />

      <Timer active={state.active_timer} milliseconds={state.debounce_time} handleInactiveTimer={handleInactiveTimer} />

      <br />
      <label>Debounce time</label>
      <input type="number" value={state.debounce_time} onChange={e => handleChangeDebounceTime(e.target.value)} placeholder="Enter Debounce time in milliseconds..." />

      <table>
        <thead>
          <tr>
            <th>Current Value</th>
            <th>{state.current_value}</th>
          </tr>
          <tr>
            <th>Debounce Value</th>
            <th>{debounceValue}</th>
          </tr>
        </thead>

      </table>

      <table>

        <thead>
          <tr>
            <th className="regular">Country</th>
            <th className="regular">Probability</th>
          </tr>
        </thead>
        <tbody>
          {state.data && state.data.country?.map((country, index) => <tr key={index}>
            <td>{country.country_id}</td>
            <td>{Math.round(country.probability * 100)}%</td>
          </tr>)}
        </tbody>
      </table>

      {state.data && state.data.country.length === 0 && <p id="no-countries">No countries found</p>}

      {state.is_loading && <p>Loading data...</p>}

      <div>
        <p>-----------------------------</p>
        <p>Last searches:</p>
        <ol>
          {words.search_words?.map((word, index) => <li key={index}>{word}</li>)}
        </ol>
        <button className={theme.background === "black" ? "clearHistoryBlack" : "clearHistory"} onClick={() => words.clear()}>Clear Search History</button>
      </div>
    </div>
  );
}

export default App;
