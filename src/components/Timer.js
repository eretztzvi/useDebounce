import React, { useEffect, memo, useState } from 'react'

export default function Timer({ milliseconds, active, handleInactiveTimer }) {

    const [state, setState] = useState({
        inner_width: '0%',
        milliseconds
    })

    useEffect(() => {
        setState({
            ...state,
            milliseconds: milliseconds
        })
    }, [milliseconds])

    let count = 0

    const styles = {
        root: {
            border: '1px solid grey',
            height: '30px',
            width: '30%',
            display: 'flex',
            alignItems: 'center',
            padding: '0 5px'
        },
        inner: {
            // border: '1px solid',
            margin: 'auto',
            width: `0%`,
            height: '20px',
            background: 'green',
            transition: '.2s'
        }
    }

    useEffect(() => {

        let time;

        time = setInterval(() => {
            count = count + 100

            setState({
                ...state,
                inner_width: `${count / state.milliseconds * 100}%`
            })

            if (count >= state.milliseconds) {
                clearInterval(time)
            }
        }, 100)

        return () => {
            count = 0
            handleInactiveTimer()
            clearInterval(time)
        }

    }, [active])

    return (
        <div style={styles.root}>
            <div style={{ ...styles.inner, width: state.inner_width }}></div>
        </div>
    )
}
