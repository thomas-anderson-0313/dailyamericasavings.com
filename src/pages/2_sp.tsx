import React, {useState, useEffect} from 'react';
//@ts-ignore
import TagManager from 'react-gtm-module'
import axios from "axios";
import './styles.scss'

import { scrollTo } from '../utils';

import Head_img from '../assets/headline_spain.png'
import Head_bg from '../assets/14_head.png'

// google tag manager

const tagManagerArgs = {
    gtmId: 'GTM-PPQ2ZQG'
}

TagManager.initialize(tagManagerArgs)

export default function Second_SP() {

    useEffect(() => {
		window.document.title="Verifique su elegibilidad ahora"
        
        axios
          .get(process.env.REACT_APP_PROXY + `/visits/4`)
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
                    process.env.REACT_APP_PROXY + `/visits/create-visits4`,
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
                    process.env.REACT_APP_PROXY + `/visits/update-visits4/`+_id,
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
        .get(process.env.REACT_APP_PROXY + `/visits/4`)
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
            process.env.REACT_APP_PROXY + `/visits/update-visits4/`+_id,
            visits
        )
        .catch((err) =>
            console.log(err)
        );
        })
    }

	const [quiz, setQuiz] = useState("¿Está actualmente en Medicare o Medicaid?")
	const [step, setStep] = useState("process")
	const [result, setResult] = useState(true)
	const [min, setMin] = useState(3)
	const [second, setSecond] = useState<any>(0)

	const [time, setTime] = React.useState(+new Date())      
	
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
				.get(process.env.REACT_APP_PROXY + `/visits/4`)
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
					process.env.REACT_APP_PROXY + `/visits/update-visits4/`+_id,
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
			// setMin(min+1)
			setSecond((180-Math.round((nowTime-startTime)/1000))%60)
			setMin(Math.floor((180-Math.round((nowTime-startTime)/1000))/60))
		}, 1000)
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
		if(quiz === "¿Está actualmente en Medicare o Medicaid?"){
		setQuiz("¿Gana menos de $50,000/año?")
		setResult(false)
		}else{
		setStep("Revisando sus respuestas...")
        topScroll("top");
		}

        axios
		.get(process.env.REACT_APP_PROXY + `/visits/4`)
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
			process.env.REACT_APP_PROXY + `/visits/update-visits4/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
	}

	const handleQuizN = () => {
		topScroll("btn");
		if(quiz === "¿Está actualmente en Medicare o Medicaid?"){
		setQuiz("¿Gana menos de $50,000/año?")
		}else{
		setStep("Revisando sus respuestas...")
        topScroll("top");
		}

        axios
		.get(process.env.REACT_APP_PROXY + `/visits/4`)
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
			process.env.REACT_APP_PROXY + `/visits/update-visits4/`+_id,
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
						<img className='topic-img' src = {Head_bg} alt = "head" />
						<div className='mian-des-1-left'>Los estadounidenses que ganen menos de $50,000 que NO tengan Medicaid o Medicare pueden activar sus beneficios de salud gratuitos a partir de esta semana. Todo lo que tiene que hacer es completar el cuestionario gratuito a continuación para ver si es elegible.</div>
						<div className='mian-des-1-left'>Si es así, puede reclamar hasta $ 1400 / mes en beneficios de salud para cubrir completamente el costo del seguro de salud, dental, de la vista, tratamientos y más.</div>
						<div className='mian-des-1-left'>¡Simplemente no espere demasiado, porque la fecha límite para reclamar su beneficio de $2800 finaliza pronto!</div>
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
							<a href = "tel:+18332464598">
								<div className='call-btn' onClick={handleCall}>
									CALL (833)-246-4598
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
						<>
						<div className='congrats-false'>Lo sentimos, no pudimos calificarlo para $2800 en beneficios de salud, ¡pero hay algo mejor para usted!</div>
						<div className='top-description-false'>¡Usted podría calificar para más de $5,100 en beneficios de Medicare! </div>
						<div className='top-description-false'>Toque a continuación para ver el cuestionario de 60 segundos para ver cuánto es elegible.</div>
						<div className='call-btn-false'>
                            <a href = "https://medicareplan.com/medicare?token=632846123-MVKQ-xduZii7gja9hFPsPJYQUs_k1stcmDFGjNWsgJHrStxyCufc2KWhnEKp23_j#medicare_flow/Medicare_Currently_Enrolled">Claim Up To $5,100 In Benefits</a>
						</div>
						<div className='sub-description-false'>¡Apuro! La ventana para reclamar sus beneficios podría terminar en:</div>
						<div className='timer'>
						<div className='timer-cell'>{min}</div>
						<div className='timer-cell'>:</div>
						<div className='timer-cell'>{second}</div>
						</div>
					</>
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