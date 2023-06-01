import React, {useState, useEffect} from 'react';
//@ts-ignore
import TagManager from 'react-gtm-module'
import axios from "axios";
import './styles.scss'

import { scrollTo } from '../utils';

import Head_bg from '../assets/hero9.png'

// google tag manager

const tagManagerArgs = {
    gtmId: 'GTM-TGC6H5J'
}

TagManager.initialize(tagManagerArgs)

export default function Fifth_EN() {

	useEffect(() => {
		window.document.title="Check Your Eligibility Now";

		axios
      .get(process.env.REACT_APP_PROXY + `/visits/9`)
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
				process.env.REACT_APP_PROXY + `/visits/create-visits9`,
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
				process.env.REACT_APP_PROXY + `/visits/update-visits9/`+_id,
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
		.get(process.env.REACT_APP_PROXY + `/visits/9`)
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
			process.env.REACT_APP_PROXY + `/visits/update-visits9/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
	}


	const [quiz, setQuiz] = useState("Are you a Business Owner in the US?")
	const [step, setStep] = useState("process")
	const [min, setMin] = useState(3)
	const [second, setSecond] = useState<any>(0)    
	
	
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
				.get(process.env.REACT_APP_PROXY + `/visits/9`)
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
					process.env.REACT_APP_PROXY + `/visits/update-visits9/`+_id,
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
		if(quiz === "Are you a Business Owner in the US?"){
			setQuiz("Did you have Employees on payroll in 2020 and or 2021?")
		}else{
			if(quiz === "Did you have Employees on payroll in 2020 and or 2021?"){
				setQuiz("Is your Annual Turnover more than $50,000?")
			}else{
				setStep("Reviewing Your Answers...")
				topScroll("top");
			}
		}

		axios
		.get(process.env.REACT_APP_PROXY + `/visits/9`)
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
			process.env.REACT_APP_PROXY + `/visits/update-visits9/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
	}

	const handleQuizN = () => {
		topScroll("btn");
		if(quiz === "Are you a Business Owner in the US?"){
			setQuiz("Did you have Employees on payroll in 2020 and or 2021?")
		}else{
			if(quiz === "Did you have Employees on payroll in 2020 and or 2021?"){
				setQuiz("Is your Annual Turnover more than $50,000?")
			}else{
				setStep("Reviewing Your Answers...")
				topScroll("top");
			}
		}

		axios
		.get(process.env.REACT_APP_PROXY + `/visits/9`)
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
			process.env.REACT_APP_PROXY + `/visits/update-visits9/`+_id,
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
						<div className='main-des-title'>Millions of Business Owners Nationwide are getting<span style={{backgroundColor:"#fde047"}}> FREE Stimulus Check of upto $26,000 per employee</span> under this Congress-Approved Program. Here's how!</div>
						<img className='topic-img-middle' src = {Head_bg} alt = "head"/>
						<div className='main-des-5'>Americans Business owners can qualify for a Free Stimulus Check of upto $26,000 per employee that they kept on payroll in 2020 and or 2021. This is not a loan, this is Free Money that business owners can use in anything they wish.</div>
						<div className='main-des-5' style = {{marginTop:"1rem"}}><b>The opportunity to claim your Stimulus Check</b> (if eligible) <b>ends on March 31st</b> so it's best to check your eligibility now. Its as easy as answering the 3 questions below:</div>
					</div>
					<div className='survey'>
						<div className='quiz-5' id='btn'>{quiz}</div>
						<div className='answer'>
							<div className='answer-btn-5' onClick={handleQuizP}>Yes</div>
							<div className='answer-btn-5' onClick={handleQuizN}>No</div>
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
						<div className='top-description-5'>Make A <b>Quick Call</b> and Speak to our Qualified Agent on how you can <b>Claim Your Stimulus Check</b> as soon as possible!</div>
						<div className='spots-count'>Spots remaining: 4</div>
						<div className='tap-direction'>👇 TAP BELOW TO CALL 👇</div>
						<a href = "tel:+18338440765">
							<div className='call-btn' onClick={handleCall}>
								CALL (833) 844-0765
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