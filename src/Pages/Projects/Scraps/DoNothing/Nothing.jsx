import React, {useState, useEffect} from 'react'

function Nothing() {

    const [timeStart, setTimeStart] = useState(null)
    const [timeElapsed, setTimeElapsed] = useState(0)
    const [hasLost, setHasLost] = useState(false)

    function realTime(ms) {
        const hour = Math.floor(ms/(1000 *60 *60))
        const minute = Math.floor(ms%(1000*60*60)/(1000*60))
        const second = Math.floor((ms%(1000*60))/1000)

        return {hour, minute, second}
    }

    const resetGame = () => {
        setTimeElapsed(0)
        setTimeStart(null)
        setHasLost(false)
    }
    
    const startGame = () => {
        console.log("started game onClick")
        const startTime = Date.now();
        console.log(timeStart)
        setTimeStart(startTime)
        console.log(Date.now())
    }


    useEffect(() => {
        if (!timeStart) return;

        const loseGame = () => {
            const timeElapsed = ((Date.now() - timeStart)/1000).toFixed(2)
            setTimeElapsed(timeElapsed)
            setHasLost(true)
        }

        const events = ['mousemove', 'click', 'scroll', 'keydown']

        setTimeout(() => {
                events.forEach(event => window.addEventListener(event, loseGame))
        }, 500)

        return () => {
            events.forEach(event => window.removeEventListener(event, loseGame))
        }
    }, [hasLost, timeStart])

    useEffect(() => {
        if (!timeStart) return
        
        const interval = setInterval(() => {
            setTimeElapsed(Date.now() - timeStart); 
        }, 1000)

        return ()  => clearInterval(interval)
    }, [timeStart, hasLost])

    const {hour, minute, second} = realTime(timeElapsed)

  return (
    <div className='m-8'>
        <div className='w-100 h-100 bg-black text-white flex justify-center p-4 flex-col'>
            <h1 className='text-2xl font-mono font-semibold'>
                IF YOU MOVE YOU LOSE
            </h1>
            { 
                !timeStart ? (
                    <>
                        <h2> time start turned true</h2>
                        <p>this this is the P</p>
                        <button 
                        onClick={startGame}
                        className='bg-white text-black text-mono p-4'>
                            PRESS TO START
                        </button>
                        
                    </>

                ): hasLost? (
                    <>
                        <p>has lost already</p>
                    </>

                ): (
                    <>
                    <p> still playing</p>
                    </>
                )
            }

           
        </div>

    </div>
  )
}

export default Nothing