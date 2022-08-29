import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { PlayArrow, Pause, ReplayRounded, VerticalAlignCenter } from "@material-ui/icons";
import { useEffect, useState } from "react";

function Timer(props: any) {

    const workMin = props.workMinutes;
    const breakMin = props.breakMinutes;
    const total = workMin + breakMin;
    const [minutes, setMinutes] = useState(total-1);
    const [seconds, setSeconds] = useState(59)
    const [play, setPlay] = useState(true);
    const [reset, setReset] = useState(false);
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const timerMins = minutes < 10 ? `0${minutes}` : minutes;
    const [mode, setMode] = useState("work");

    const handleReset = () => {
        setMinutes(total - 1);
        setSeconds(59);
        setReset(false);
        setMode("work")
    }

    useEffect(() => {
        let interval = setInterval(() => {
            clearInterval(interval);
            if (reset === true) 
                    handleReset();
            if (play) {
                if (seconds === 0 ) {
                    if (minutes === 0) {
                        return;
                    }
                    if ( minutes === workMin && mode === "work")
                        setMode("break");
                   
                    setSeconds(59);
                    setMinutes(minutes - 1);
                    
                }
                else
                    setSeconds(seconds - 1);
                }
            else 
                return ;
            }, 10)
        }, [seconds, reset, play])

    return (
        <div className = "Test"  style={{margin: "0 auto", paddingTop: "50px", maxWidth: "340px", textAlign: "center", verticalAlign: 'middle'}} >
                <CircularProgressbar 
                        value = {minutes*60 + seconds}
                        minValue = {0}
                        maxValue = {total*60}
                        text = {timerMins + ":" + timerSeconds}
                        styles={
                            buildStyles({
                            strokeLinecap: 'round',
                            pathColor: mode === "work" ? "green" : "red",
                            textColor: '#f88',
                            trailColor: '#d6d6d6',
                            backgroundColor: '#3e98c7',
                    })}/>
              { play ? <Pause onClick = {() => setPlay(false)} /> : <PlayArrow onClick = {() => setPlay(true)}/> }
              <ReplayRounded onClick = {() => setReset(true)}/>
        </div>
    );
}

export default Timer;