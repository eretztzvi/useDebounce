import { useEffect, useRef, useState } from "react";
import useDebounce from "./hooks/useDebounce";
import Axios from 'axios'

function App() {

  const inputRef = useRef()

  const [state, setState] = useState({
    current_value: "",
    data: null,
    is_loading: false,
    debounce_time: 1000
  })

  const debounceValue = useDebounce(state.current_value, state.debounce_time)

  const handleChanges = e => {
    setState({ ...state, current_value: e.target.value })
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

    Axios.get(`https://api.nationalize.io/?name=${value}`)
      .then(res => {
        console.log(res.data)
        setState({ ...state, data: res.data, is_loading: false })
      })
      .catch(err => {
        alert(err.message)
        setState({ ...state, is_loading: false })
      })
  }

  const handleChangeDebounceTime = time => {
    setState({ ...state, debounce_time: time })
  }

  return (
    <div className="App">

      <h1>Predict the nationality of a name</h1>
      <h3>An API for predicting nationality from a name</h3>

      <br />

      <label>Name</label>
      <input ref={inputRef} value={state.current_value} onChange={handleChanges} placeholder="Enter any name..." />
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
    </div>
  );
}

export default App;
