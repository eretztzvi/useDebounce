import React, { useEffect, useState } from 'react'

export default function useDebounce(value, time = 1000) {

    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        let timer;

        timer = setTimeout(() => {
            setDebounceValue(value)
        }, time)

        return () => {
            console.log('clear timer')
            clearTimeout(timer)
        }
    }, [value])

    return debounceValue
}
