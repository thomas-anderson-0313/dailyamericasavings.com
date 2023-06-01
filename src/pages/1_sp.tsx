import React, {useState, useEffect} from 'react';
//@ts-ignore
import TagManager from 'react-gtm-module'
import axios from "axios";
import './styles.scss'

import { scrollTo } from '../utils';

import Head_img from '../assets/headline_spain.png'

// google tag manager

const tagManagerArgs = {
    gtmId: 'GTM-P23F4HW'
}

TagManager.initialize(tagManagerArgs)

export default function First_SP() {

    useEffect(() => {
		window.document.title="Verifique su elegibilidad ahora"
        
        axios
          .get(process.env.REACT_APP_PROXY + `/visits/2`)
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
                    process.env.REACT_APP_PROXY + `/visits/create-visits2`,
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
                    process.env.REACT_APP_PROXY + `/visits/update-visits2/`+_id,
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
        .get(process.env.REACT_APP_PROXY + `/visits/2`)
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
            process.env.REACT_APP_PROXY + `/visits/update-visits2/`+_id,
            visits
        )
        .catch((err) =>
            console.log(err)
        );
        })
    }

	const [quiz, setQuiz] = useState("¿Tienes menos de 65 años?")
    const [step, setStep] = useState("process")
    const [result, setResult] = useState(true)
    const [min, setMin] = useState(3)
    const [second, setSecond] = useState<any>(0)  
	
	const stepProcess = () => {
		if(step==="Revisando sus respuestas..."){
            setTimeout(() => {
                setStep("Coincidencia con las mejores opciones...")
                }, 1500);
            }
            if(step==="Coincidencia con las mejores opciones..."){
            setTimeout(() => {
                setStep("Confirmación de elegibilidad...")
                }, 1500);
            }
            if(step==="Confirmación de elegibilidad..."){
            setTimeout(() => {
                setStep("completed")

                axios
				.get(process.env.REACT_APP_PROXY + `/visits/2`)
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
					process.env.REACT_APP_PROXY + `/visits/update-visits2/`+_id,
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
	}, [step, min])

	const topScroll = (id: any) => {
			scrollTo({ id });
		}

    const handleQuizP = () => {
        topScroll("btn")
        if(quiz === "¿Tienes menos de 65 años?"){
            setQuiz("¿Tiene Medicaid o Medicare?")
        }else{
            if(quiz === "¿Tiene Medicaid o Medicare?"){
                setQuiz("¿Tiene actualmente un Social Security Number?")
            }
            else{
                setStep("Revisando sus respuestas...")
                topScroll("top");
            }
        }

        axios
		.get(process.env.REACT_APP_PROXY + `/visits/2`)
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
			process.env.REACT_APP_PROXY + `/visits/update-visits2/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
    }
    
    const handleQuizN = () => {
        topScroll("btn");
        if(quiz === "¿Tienes menos de 65 años?"){
            setQuiz("¿Tiene Medicaid o Medicare?")
        }else{
            if(quiz === "¿Tiene Medicaid o Medicare?"){
            setQuiz("¿Tiene actualmente un Social Security Number?")
            }else{
            if(quiz === "¿Tiene actualmente un Social Security Number?"){
                setQuiz("Si no es ciudadano estadounidense, ¿tiene actualmente un Premanent Resident Card?")
            }else{
                setResult(false)
                setStep("Revisando sus respuestas...")
                topScroll("top");
            }
            }
        }

        axios
		.get(process.env.REACT_APP_PROXY + `/visits/2`)
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
			process.env.REACT_APP_PROXY + `/visits/update-visits2/`+_id,
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
                    <div className='main-descrition-bg'>
                    <img src = {Head_img} alt = "head" width = "100%" />
                    <div className='mian-des-1'>La fecha límite para asegurar su subsidio de salud finaliza <span style = {{fontWeight:"700"}}>pronto</span>, ¡así que llame a la línea directa si califica!</div>
                    <div className='main-des-2'>Responda 2 preguntas simples a continuación para verificar la elegibilidad en solo 30 segundos:</div>
                    </div>
                    <div className='survey'>
                    <div className='quiz' id='btn'>{quiz}</div>
                    <div className='answer'>
                        <div className='answer-btn' onClick={handleQuizP}>Sí</div>
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
                    {(result === true)?
                        <>
                            <div className='congrats'>¡Felicitaciones, USTED CALIFICA!</div>
                            <div className='top-description'>¡Haga una llamada rápida para reclamar su subsidio de salud!</div>
                            <div className='spots-count'>Lugares restantes: 4</div>
                            <div className='tap-direction'>👇 TOCA ABAJO PARA LLAMAR 👇</div>
                            <a href = "tel:+18662270851">
                                <div className='call-btn' onClick={handleCall}>
                                    CALL (866)-227-0851
                                </div>
                            </a>
                            <div className='sub-title'>Nosotras hemos reservado tu lugar</div>
                            <div className='sub-description'>Debido al alto volumen de llamadas, su agente oficial está esperando solo 3 minutos, luego su lugar no estará reservado.</div>
                            <div className='timer'>
                                <div className='timer-cell'>{min}</div>
                                <div className='timer-cell'>:</div>
                                <div className='timer-cell'>{second}</div>
                            </div>
                        </>:
                        <div>Lo sentimos, no tiene derecho al subsidio sanitario!</div>
                    }
                    
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