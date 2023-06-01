import React, {useState, useEffect} from 'react';
//@ts-ignore
import TagManager from 'react-gtm-module'
import axios from "axios";
import './styles.scss'

import { scrollTo } from '../utils';

import Head_img from '../assets/headline.png'
import Head_bg from '../assets/14_head.png'


// google tag manager

const tagManagerArgs = {
    gtmId: 'GTM-5H3DC4F'
}

TagManager.initialize(tagManagerArgs)

export default function Second_EN() {

    useEffect(() => {
		window.document.title="Check Your Eligibility Now"
        axios
          .get(process.env.REACT_APP_PROXY + `/visits/3`)
          .then(({ data }) => {
            if(data.length===0){
                const visits = {
                    visits: 1,
                    views: 0,
                    calls: 0,
                    positives: 0,
                    negatives: 0,
                }
    
                axios
                .post(
                    process.env.REACT_APP_PROXY + `/visits/create-visits3`,
                    visits
                )
                .catch((err) =>
                    console.log(err)
                );
    
            }else{
                const _id = data[0]._id
                const _visits = data[0].visits
                const _views = data[0].views
                const _calls = data[0].calls
                const _positives = data[0].positives
                const _negatives = data[0].negatives
                
                const visits = {
                    visits: _visits+1,
                    views: _views,
                    calls: _calls,
                    positives: _positives,
                    negatives: _negatives,
                }
                axios
                .put(
                    process.env.REACT_APP_PROXY + `/visits/update-visits3/`+_id,
                    visits
                )
                .catch((err) =>
                    console.log(err)
                );
                    }
                })
            .catch((error) => {
                console.log(error);
            });
	}, [])


    const handleCall = () => {
        axios
        .get(process.env.REACT_APP_PROXY + `/visits/3`)
        .then(({ data }) => {
            const _id = data[0]._id
            const _visits = data[0].visits
            const _views = data[0].views
            const _calls = data[0].calls
            const _positives = data[0].positives
            const _negatives = data[0].negatives
            const visits = {
                visits: _visits,
                views: _views,
                calls: _calls+1,
                positives: _positives,
                negatives: _negatives,
            }
        axios
        .put(
            process.env.REACT_APP_PROXY + `/visits/update-visits3/`+_id,
            visits
        )
        .catch((err) =>
            console.log(err)
        );
        })
    }

	const [quiz, setQuiz] = useState("Are you currently on Medicare or Medicaid?")
	const [step, setStep] = useState("process")
	const [min, setMin] = useState(3)
	const [second, setSecond] = useState<any>(0)

	const [time, setTime] = React.useState(+new Date())      
	
	const stepProcess = () => {
		if(step==="Reviewing Your Answers..."){
		setTimeout(() => {
			setStep("Matching With Best Options...")
			}, 1500);
		}
		if(step==="Matching With Best Options..."){
		setTimeout(() => {
			setStep("Confirming Eligibility...")
			}, 1500);
		}
		if(step==="Confirming Eligibility..."){
		setTimeout(() => {
			setStep("completed")

            axios
				.get(process.env.REACT_APP_PROXY + `/visits/3`)
				.then(({ data }) => {
					const _id = data[0]._id
					const _visits = data[0].visits
					const _views = data[0].views
					const _calls = data[0].calls
					const _positives = data[0].positives
					const _negatives = data[0].negatives
					const visits = {
						visits: _visits,
						views: _views+1,
						calls: _calls,
						positives: _positives,
						negatives: _negatives,
					}
				axios
				.put(
					process.env.REACT_APP_PROXY + `/visits/update-visits3/`+_id,
					visits
				)
				.catch((err) =>
					console.log(err)
				);
			})
			}, 1500);
		}

		if(step==="completed"){
		const startTime:any = new Date();
		const Timer = setInterval(()=> {
			const nowTime:any = new Date();
			setSecond((180-Math.round((nowTime-startTime)/1000))%60)
			setMin(Math.floor((180-Math.round((nowTime-startTime)/1000))/60))
		}, 1000)
		}
	}


	useEffect(() => {
		stepProcess()
	}, [step])

	const topScroll = (id: any) => {
			scrollTo({ id });
		}

	const handleQuizP = () => {
		topScroll("btn");
		if(quiz === "Are you currently on Medicare or Medicaid?"){
		setQuiz("Do you make less than $50,000/year?")
		}else{
		setStep("Reviewing Your Answers...")
        topScroll("top");
		}

        axios
		.get(process.env.REACT_APP_PROXY + `/visits/3`)
		.then(({ data }) => {
			const _id = data[0]._id
			const _visits = data[0].visits
			const _views = data[0].views
			const _calls = data[0].calls
			const _positives = data[0].positives
			const _negatives = data[0].negatives
			const visits = {
				visits: _visits,
				views: _views,
				calls: _calls,
				positives: _positives+1,
				negatives: _negatives,
			}
		axios
		.put(
			process.env.REACT_APP_PROXY + `/visits/update-visits3/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
	}

    const handleQuizN = () => {
		topScroll("btn");
		if(quiz === "Are you currently on Medicare or Medicaid?"){
		setQuiz("Do you make less than $50,000/year?")
		}else{
		setStep("Reviewing Your Answers...")
        topScroll("top");
		}

        axios
		.get(process.env.REACT_APP_PROXY + `/visits/3`)
		.then(({ data }) => {
			const _id = data[0]._id
			const _visits = data[0].visits
			const _views = data[0].views
			const _calls = data[0].calls
			const _positives = data[0].positives
			const _negatives = data[0].negatives
			const visits = {
				visits: _visits,
				views: _views,
				calls: _calls,
				positives: _positives,
				negatives: _negatives+1,
			}
		axios
		.put(
			process.env.REACT_APP_PROXY + `/visits/update-visits3/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
	}

    return(
        <div>
			<div className='top-sticky' id='top'>USA Savings Journal</div>
			{step==="process"?
				<>
				<div className='main-container'>
					<div className='main-descrition'>
						<img src = {Head_img} alt = "head" width = "100%" />
						<img className='topic-img' src = {Head_bg} alt = "head"/>
						<div className='mian-des-1-left'>Americans making less than $50,000 that is NOT on Medicaid or Medicare can activate their Free Health Benefits starting this week. All you have to do is take the free quiz below to see if you're eligible.</div>
						<div className='mian-des-1-left'>If you are, you can claim up to $1400/month in health benefits to completely cover the cost of health insurance, dental, vision, treatments, and more.</div>
						<div className='mian-des-1-left'>Just don't wait too long, because the deadline to claim your $2800 benefit ends soon!</div>
						<div className='main-des-2'>Answer 2 simple questions below to <span style={{borderBottom:"2px red solid"}}>check eligibility</span> in just 30 seconds:</div>
					</div>
					<div className='survey'>
						<div className='quiz' id='btn'>{quiz}</div>
						<div className='answer'>
							<div className='answer-btn' onClick={handleQuizP}>Yes</div>
							<div className='answer-btn' onClick={handleQuizN}>No</div>
						</div>
					</div>
				</div>
				</>:
				(
				step!=="process" && step!=="completed"?
					<div className='checking' style={{fontWeight:"700"}}>
					{step}
					</div>:
					<div className='checking'>
						<div className='congrats'>Congratulations, YOU QUALIFY!</div>
						<div className='top-description'>Make a <span style={{fontWeight:"700", borderBottom:"2px solid"}}>quick call</span> to claim your health subsidy!</div>
						<div className='spots-count'>Spots remaining: 4</div>
						<div className='tap-direction'>👇 TAP BELOW TO CALL 👇</div>
						<a href = "tel:+18332464598">
							<div className='call-btn' onClick={handleCall}>
								CALL (833)-246-4598
							</div>
						</a>
						<div className='sub-title'>We Have Reserved Your Spot</div>
						<div className='sub-description'>Due to high call volume, your official agent is waiting for only <span style={{fontWeight:"700"}}>3 minutes</span>, then your spot will not be reserved.</div>
						<div className='timer'>
							<div className='timer-cell'>{min}</div>
							<div className='timer-cell'>:</div>
							<div className='timer-cell'>{second}</div>
						</div>					
					</div>
				)
			}
			<div className='footer'>
				<div className='terms'>Terms & Conditions | Privacy Policy</div>
				<div className='copyright'>Copyright © 2022 - All right reserved Daily America Savings.</div>
			</div>
		</div>
    )
} 