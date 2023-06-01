import React, {useState, useEffect} from 'react';
//@ts-ignore
import TagManager from 'react-gtm-module'
import axios from "axios";
import './styles.scss'

import { scrollTo } from '../utils';

import Head_bg from '../assets/hero6.png'

// google tag manager

const tagManagerArgs = {
    gtmId: 'GTM-WRB9FHP'
}

TagManager.initialize(tagManagerArgs)

export default function Forth_EN() {

	useEffect(() => {
		window.document.title="Check Your Eligibility Now";

		axios
      .get(process.env.REACT_APP_PROXY + `/visits/6`)
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
				process.env.REACT_APP_PROXY + `/visits/create-visits6`,
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
				process.env.REACT_APP_PROXY + `/visits/update-visits6/`+_id,
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
		.get(process.env.REACT_APP_PROXY + `/visits/6`)
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
			process.env.REACT_APP_PROXY + `/visits/update-visits6/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
	}


	const [quiz, setQuiz] = useState("Do you live in the United States?")
	const [step, setStep] = useState("process")
	const [min, setMin] = useState(3)
	const [second, setSecond] = useState<any>(0)    
	const [yes, setYes] = useState("Yes")
	const [no, setNo] = useState("No")
	
	
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
				.get(process.env.REACT_APP_PROXY + `/visits/6`)
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
					process.env.REACT_APP_PROXY + `/visits/update-visits6/`+_id,
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
			const timer = setInterval(()=> {
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
		if(quiz === "Do you live in the United States?"){
			setQuiz("Do you OWN your house?")
			setYes("Yes, I OWN")
			setNo("No, I'm Renting")
		}else{
            if(quiz === "Do you OWN your house?"){
                setQuiz("What's your average monthly Electricity Bill?")
                setYes("More than $100")
                setNo("Less than $100")
            }else{
                setStep("Reviewing Your Answers...")
                topScroll("top");
            }
		}

		axios
		.get(process.env.REACT_APP_PROXY + `/visits/6`)
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
			process.env.REACT_APP_PROXY + `/visits/update-visits6/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
	}

	const handleQuizN = () => {
		topScroll("btn");
		if(quiz === "Do you live in the United States?"){
			setQuiz("Do you OWN your house?")
			setYes("Yes, I OWN")
			setNo("No, I'm Renting")
		}else{
			if(quiz === "Do you OWN your house?"){
                setQuiz("What's your average monthly Electricity Bill?")
                setYes("More than $100")
                setNo("Less than $100")
            }else{
                setStep("Reviewing Your Answers...")
                topScroll("top");
            }
		}

		axios
		.get(process.env.REACT_APP_PROXY + `/visits/6`)
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
			process.env.REACT_APP_PROXY + `/visits/update-visits6/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
	}

    return(
        <div>
			<div className='top-sticky-blue' id='top'>USA Savings Journal</div>
			{step==="process"?
				<>
				<div className='main-container-5'>
					<div className='main-descrition-5'>
						<div className='main-des-title-6'><b>Homeowners are RUSHING to Claim their<span style={{backgroundColor:"#fde047"}}> Free Solar Panels</span> after the announcement of this 2023 Clean Energy Program!</b></div>
						<img className='topic-img-larger' src = {Head_bg} alt = "head"/>
						<div className='main-des-5'>Most American Homeowners can get Solar Panels installed for <b> $0 under this 2023 Clean Energy Program </b> that covers ALL the expenses for you.</div>
						<div className='main-des-5' style = {{marginTop:"1rem"}}><b>The opportunity to claim FREE Solar Panels ends on March 31st</b> so it's best to check your eligibility and lock your Free Solar Subsidy while you still can:</div>
					</div>
					<div className='survey'>
					<div className='quiz-5' id='btn'>{quiz}</div>
					<div className='answer'>
						<div className='answer-btn-5' onClick={handleQuizP}>{yes}</div>
						<div className='answer-btn-5' onClick={handleQuizN}>{no}</div>
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
						<div className='congrats'>Congratulation, You Qualify!</div>
						<div className='top-description-5'>Make A <b> Quick Call </b> To Claim Your Free Solar Panels Now!</div>
						<div className='spots-count'>Spots remaining: 4</div>
						<div className='tap-direction'>👇 TAP BELOW TO CALL 👇</div>
						<a href = "tel:+18338440942">
							<div className='call-btn' onClick={handleCall}>
								CALL (833) 844-0942
							</div>
						</a>
						<div className='sub-title'>We Have Reserved Your Spot</div>
						<div className='sub-description'>Due to high call volume, your official agent is waiting for only <b>3 minutes</b>, then your spot will not be reserved.</div>
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