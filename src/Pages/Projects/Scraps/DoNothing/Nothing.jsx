import React, {useState, useEffect} from 'react'

function Nothing() {

    const [timeStart, setTimeStart] = useState(null)
    const [timeElapsed, setTimeElapsed] = useState(0)
    const [hasLost, setHasLost] = useState(false)

    function realTime(ms) {
        const hour = Math.floor(ms/(1000 *60 *60))
        const minutes = Math.floor(ms%(1000*60*60)/(1000*60))
        const seconds = Math.floor((ms%(1000*60))/1000)

        return {hour, minute, seconds}
    }

    const resetGame = () => {
        setTimeElapsed(0)
        setTimeStart(null)
        setHasLost(false)
    } 


    useEffect(() => {
        if (!timeStart) return;

        const loseGame = () => {
            const timeElapsed = ((Date.now() - timeStart)/1000).toFixed(2)
            setTimeElapsed(timeElapsed)
            setHasLost(true)
        }

        const events = ['mousemove', 'click', 'scroll', 'getkeydown']

        events.forEach(event => window.addEventListener(event, losegame))


        return () => {
            events.forEach(event => window.removeEventListener(event, loseGame))
        }
    }, [])

    useEffect(() => {
        if (!timeStart) return
        
        const 

    }, [])



  return (
    <div>Nothing</div>
  )
}

export default Nothing