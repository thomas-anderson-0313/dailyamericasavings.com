import { useEffect, useState } from "react";
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import './styles.scss'

export default function Visits() {
    const [visits, setVisits] = useState(0)
    const [views, setViews] = useState(0)
    const [calls, setCalls] = useState(0)
    const [positives, setPositives] = useState(0)
    const [negatives, setNegatives] = useState(0)

    const values = [
        "https://dailyamericasavings.com/engaca1",
        "https://dailyamericasavings.com/spanaca1",
        "https://dailyamericasavings.com/engaca2",
        "https://dailyamericasavings.com/spanaca2",
        "https://dailyamericasavings.com/engmed1",
        "https://dailyamericasavings.com/spanmed1",
        "https://dailyamericasavings.com/hbosolar",
        "https://dailyamericasavings.com/spandeb1",
    ]

    const [selected, setSelected] = useState("https://dailyamericasavings.com/engaca1");
    const [flag, setFlag] = useState(1)

    function handleChange(event:any) {
        setSelected(event.target.value);
        if(event.target.value === "https://dailyamericasavings.com/engaca1"){
            setFlag(1)
        }
        if(event.target.value === "https://dailyamericasavings.com/spanaca1"){
            setFlag(2)
        }
        if(event.target.value === "https://dailyamericasavings.com/engaca2"){
            setFlag(3)
        }
        if(event.target.value === "https://dailyamericasavings.com/spanaca2"){
            setFlag(4)
        }
        if(event.target.value === "https://dailyamericasavings.com/engmed1"){
            setFlag(5)
        }
        if(event.target.value === "https://dailyamericasavings.com/hbosolar"){
            setFlag(6)
        }
        if(event.target.value === "https://dailyamericasavings.com/spanmed1"){
            setFlag(7)
        }
        if(event.target.value === "https://dailyamericasavings.com/spandeb1"){
            setFlag(8)
        }
    }

    useEffect(() => {
        window.document.title="Statistic for Daily America Savings";
        axios
            .get(process.env.REACT_APP_PROXY + `/visits/${flag}`)
            .then(({ data }) => {
                const _visits = data[0].visits
                const _views = data[0].views
                const _calls = data[0].calls
                const _positives = data[0].positives
                const _negatives = data[0].negatives
                setVisits(_visits)
                setViews(_views)
                setCalls(_calls)
                setPositives(_positives)
                setNegatives(_negatives)
            })

    }, [selected, flag])


    return (
        <div>
            <div className='top-sticky' id='top'>USA Savings Journal Views</div>
            <div className="main-container" style = {{paddingTop:"30px"}}>
                <FormControl>
                    <InputLabel htmlFor="agent-simple">URL</InputLabel>
                    <Select
                        value={selected}
                        onChange={handleChange}
                        inputProps={{
                        name: "agent",
                        id: "age-simple"
                        }}
                    >
                        {values.map((value, index) => {
                        return <MenuItem value={value}>{value}</MenuItem>;
                        })}
                    </Select>
                </FormControl>
                <div className="boxes">
                    <div className="visit-box box-container">
                        <div className="box-sup">Total Visits</div>
                        <div>{visits}</div>
                    </div>
                    <div className="view-box box-container">
                        <div className="box-sup">Page Views</div>
                        <div className="box-sub">
                            <div>{views}</div>
                            <div className="box-sub-per">{views/visits*100}%</div>
                        </div>
                    </div>
                    <div className="positive-box box-container">
                        <div className="box-sup">Positive Answers</div>
                        <div className="box-sub">
                            <div>{positives}</div>
                            <div className="box-sub-per">{positives/(positives+negatives)*100}%</div>
                        </div>
                    </div>
                    <div className="negative-box box-container">
                        <div className="box-sup">Negative Answers</div>
                        <div className="box-sub">
                            <div>{negatives}</div>
                            <div className="box-sub-per">{negatives/(positives+negatives)*100}%</div>
                        </div>
                    </div>
                    <div className="calls-box box-container">
                        <div className="box-sup">Call requests</div>
                        <div className="box-sub">
                            <div>{calls}</div>
                            <div className="box-sub-per">{calls/views*100}%</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}