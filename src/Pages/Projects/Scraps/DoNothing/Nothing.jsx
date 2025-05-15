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
        
        <div className='w-100 h-100 bg-black text-white flex p-4 flex-col justify-start items-center'>
        <h1 className='text-4xl  font-mono font-semibold flex w-full justify-center'>
                DO NOTHING...
        </h1>
            <div className='m-auto h-full flex flex-col justify-center items-center'> 
            { 
                !timeStart ? (
                    <>
                        <h2 className='mx-auto p-4 font-bold text-2xl'>YES! DON'T DO ANYTHING</h2>
                        <p>Game Rules: press start and leave your system idle, if you touch, move or click anything you loseee</p>
                        <button 
                        onClick={startGame}
                        className='bg-white text-black text-mono p-4 m-2'>
                            PRESS TO START
                        </button>
                        
                    </>

                ): hasLost? (
                    <div className='w-full justify-center h-full flex flex-col'>
                        <p className='text-xl font-light text-center w-full  justify-end '>YOU MOVED: so addicted you are...duhhh~</p>
                        <button 
                        onClick={resetGame} 
                        className='bg-white text-black p-4 items-center m-2'>RESET GAME</button>
                    </div>

                ): (
                    <>
                    <p> still playing</p>
                    </>
                )
            }
            </div>
           
        </div>

    </div>
  )
}

export default Nothing