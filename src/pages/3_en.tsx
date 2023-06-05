import React, {useState, useEffect} from 'react';
//@ts-ignore
import TagManager from 'react-gtm-module'
import axios from "axios";
import './styles.scss'

import { scrollTo } from '../utils';

import Head_bg from '../assets/hero5.png'

// google tag manager

const tagManagerArgs = {
    gtmId: 'GTM-5B4S3PH'
}

TagManager.initialize(tagManagerArgs)

export default function Third_EN() {

	useEffect(() => {
		window.document.title="Check Your Eligibility Now";

		axios
      .get(process.env.REACT_APP_PROXY + `/visits/5`)
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
				process.env.REACT_APP_PROXY + `/visits/create-visits5`,
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
				process.env.REACT_APP_PROXY + `/visits/update-visits5/`+_id,
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
		.get(process.env.REACT_APP_PROXY + `/visits/5`)
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
			process.env.REACT_APP_PROXY + `/visits/update-visits5/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
	}


	const [quiz, setQuiz] = useState("Are you over 64?")
	const [step, setStep] = useState("process")
	const [min, setMin] = useState(3)
	const [second, setSecond] = useState<any>(0)    
	const [yes, setYes] = useState("Yes, I'm 65 or Older")
	const [no, setNo] = useState("No, I'm 64 or Younger")
	
	
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
				.get(process.env.REACT_APP_PROXY + `/visits/5`)
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
					process.env.REACT_APP_PROXY + `/visits/update-visits5/`+_id,
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
			  // setMin(min+1)
			  setSecond((180-Math.round((nowTime-startTime)/1000))%60)
			  setMin(Math.floor((180-Math.round((nowTime-startTime)/1000))/60))
			}, 1000)
			// if(Math.round((new Date()-startTime)/1000)){
			// 	console.log("dsfdsfdsf");
			// 	return clearInterval(timer)
			// }
		}
	}

	// React.useEffect(() => {
	//                 // getInfo()
	//                 console.log(time);
	//                 stepProcess()
	//                 const timer = setTimeout(() => setTime(+new Date()), 1000)
	//                 return () => clearTimeout(timer)
	//         }, [time]);


	useEffect(() => {
		stepProcess()
	}, [step])

	const topScroll = (id: any) => {
			// window.scrollTo(0, 0);
			// window.innerWidth < 1200 ? setIsMobile(false) : scrollTo({ id });
			scrollTo({ id });
		}

	const handleQuizP = () => {
		topScroll("btn");
		if(quiz === "Are you over 64?"){
			setQuiz("Are You On Medicare or Medicaid?")
			setYes("Yes")
			setNo("No")
		}else{
			setStep("Reviewing Your Answers...")
			topScroll("top");
		}

		axios
		.get(process.env.REACT_APP_PROXY + `/visits/5`)
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
			process.env.REACT_APP_PROXY + `/visits/update-visits5/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
	}

	const handleQuizN = () => {
		topScroll("btn");
		if(quiz === "Are you over 64?"){
			setQuiz("Are You On Medicare or Medicaid?")
			setYes("Yes")
			setNo("No")
		}else{
			setStep("Reviewing Your Answers...")
			topScroll("top");
		}

		axios
		.get(process.env.REACT_APP_PROXY + `/visits/5`)
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
			process.env.REACT_APP_PROXY + `/visits/update-visits5/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
	}

    return(
        <div>
			<div className='top-sticky-blue' id='top'>My Senior Saving Journal</div>
			{step==="process"?
				<>
				<div className='main-container-5'>
					<div className='main-descrition-5'>
					<div className='main-des-title'>Americans Over 64 Can Now Qualify For The $3600 FLEX Card In 2023. Here's How!</div>
					{/* <img src = {Head_img} alt = "head" width = "100%" /> */}
                    <img className='topic-img-5' src = {Head_bg} alt = "head"/>
					<div className='main-des-5'>Americans over 64 can pre-qualify for the 2023 Flex Spending Card that gives them up to $3600. Seniors can use the funds for dental or vision, groceries, rent, utility bills, medication and more.</div>
					<div className='main-des-5' style = {{marginTop:"1rem"}}><b>The opportunity to upgrade your benefits ends on May 31st</b> so it's best to call and get your Flex Card locked in while it's still available.</div>
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
						<div className='top-description-5'>Make A <b>Quick Call</b> To Claim Your Flex Card!</div>
						<div className='spots-count'>Spots remaining: 4</div>
						<div className='tap-direction'>👇 TAP BELOW TO CALL 👇</div>
						<a href = "tel:+18446170251">
							<div className='call-btn' onClick={handleCall}>
								CALL (844) 617-0251
								<div style={{fontSize:15, color:"grey"}}>TTY 711</div>
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
				<div style={{fontSize:10, color:"grey"}}>
					To request plan information without providing personal information, please call the phone number above. We are not affiliated with any plan or endorsed by any government entity or agency. We connect individuals with insurance providers and other affiliates (collectively, “partners”) to give you, the consumer, an opportunity to get information about insurance and connect with licensed insurance agents. By completing the quotes form or calling the number listed above, you will be directed to a partner that can connect you to an appropriately licensed insurance agent who can answer your questions and discuss plan options.We do not offer every plan available in your area. Any information we provide is limited to those plans we do offer in your area. Please contact Medicare.gov or 1-800-MEDICARE (TTY users should call 1-877-486-2048) 24 hours a day/7 days a week to get information on all of your options. Products and services are provided exclusively by our partners, but not all offer the same plans or options. Possible options that may be offered include, but are not limited to, ACA-Qualified Plans, Medicare Advantage Plans, Short Term Plans, Christian/Health Sharing Plans, and Fixed Indemnity Plans. Descriptions are for informational purposes only and subject to change. We encourage you to shop around and explore all of your options. We are not affiliated with or endorsed by any government entity or agency. By using this site, you acknowledge that you have read and agree to the Privacy Policy and Terms & Conditions. Participating sales agencies represent Medicare Advantage [HMO, PPO and PFFS] organizations that are contracted with Medicare. Enrollment depends on the plan’s contract renewal. Enrollment in a plan may be limited to certain times of the year unless you qualify for a special election period, or you are in your Medicare Initial Election Period. Not all plans offer all of the benefits mentioned. $0 premium plans are not available in all areas. Enrollees must continue to pay their Medicare Part B Premium. Deductibles, copay and coinsurance may apply.
					Plans are insured or covered by a Medicare Advantage organization with a Medicare contract and/or a Medicare-approved Part D sponsor. Enrollment in the plan depends on the plan’s contract renewal with Medicare.
				</div>
				<div className='terms'>
					<span>
						<a href='https://www.termsandconditionsgenerator.com/live.php?token=QKuYdD58OI9aCmlPqhQEuGwOQZYYbFoY'>Terms & Conditions |</a>
					</span>
					<span>
						<a href='https://www.privacypolicygenerator.info/live.php?token=VLaWEsXvlj8Cdl0o58DWVleLmyB0UvT9'> Privacy Policy</a>
					</span>
				</div>
				<div className='copyright'>Copyright © 2022 - All right reserved Daily America Savings.</div>
			</div>
		</div>
    )
} 