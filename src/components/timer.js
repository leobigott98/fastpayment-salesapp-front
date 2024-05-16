import { useState, useEffect } from "react";

const Timer = ({reset, setTimeElapsed})=>{
    const [deadline, setDeadline] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)

    useEffect(()=>{
        setDeadline(Date.now() + (20 * 1000));  

        const getTime = (deadline) => {
            const remainingTime = deadline - Date.now();
        
            setMinutes(Math.floor((remainingTime / 1000 / 60) ));
            setSeconds(Math.floor((remainingTime / 1000) %60));
          };
        
        const interval = setInterval(() => getTime(deadline), 1000);
        setTimeout(()=>{
            clearInterval(interval);
            setTimeElapsed(true)
        }, 19*1000)


    },[setDeadline, setMinutes, setMinutes, deadline, reset])

    return(
    <p> Puedes solicitar un nuevo código en: {minutes}:{seconds <10 ? `0${seconds}` : seconds}</p>
)
}

export default Timer;