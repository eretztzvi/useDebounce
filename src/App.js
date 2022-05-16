import { useEffect, useRef, useState } from "react";
import useDebounce from "./hooks/useDebounce";
import Axios from 'axios'

function App() {

  const inputRef = useRef()

  const [state, setState] = useState({
    current_value: "",
    data: null
  })

  const debounceValue = useDebounce(state.current_value)

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
    Axios.get(`https://api.nationalize.io/?name=${value}`)
      .then(res => {
        console.log(res.data)
        setState({ ...state, data: res.data })
      })
      .catch(err => {
        alert(err.message)
      })
  }

  return (
    <div className="App">

      <input ref={inputRef} value={state.current_value} onChange={handleChanges} />

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

        <thead>
          <tr>
            <th className="regular">country</th>
            <th className="regular">prob</th>
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

    </div>
  );
}

export default App;
