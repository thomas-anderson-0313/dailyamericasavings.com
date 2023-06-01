import React, {useState, useEffect} from 'react';
//@ts-ignore
import TagManager from 'react-gtm-module'
import axios from "axios";
import './styles.scss'

import { scrollTo } from '../utils';

import Head_bg from '../assets/hero8.png'

// google tag manager

const tagManagerArgs = {
    gtmId: 'GTM-M8Z6CBV'
}

TagManager.initialize(tagManagerArgs)

export default function Fifth_SP() {

	useEffect(() => {
		window.document.title="Verifique su elegibilidad ahora";

		axios
      .get(process.env.REACT_APP_PROXY + `/visits/8`)
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
				process.env.REACT_APP_PROXY + `/visits/create-visits8`,
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
				process.env.REACT_APP_PROXY + `/visits/update-visits8/`+_id,
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
		.get(process.env.REACT_APP_PROXY + `/visits/8`)
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
			process.env.REACT_APP_PROXY + `/visits/update-visits8/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
	}


	const [quiz, setQuiz] = useState("¿Vives en los Estados Unidos?")
	const [step, setStep] = useState("process")
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
			  setStep("Confirmando elegibilidad...")
			  }, 1500);
			}
		  if(step==="Confirmando elegibilidad..."){
			setTimeout(() => {
			  setStep("completed")

			  axios
				.get(process.env.REACT_APP_PROXY + `/visits/8`)
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
					process.env.REACT_APP_PROXY + `/visits/update-visits8/`+_id,
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
		if(quiz === "¿Vives en los Estados Unidos?"){
			setQuiz("¿Eres menor de 85 años?")
		}else{
            if(quiz === "¿Eres menor de 85 años?"){
                setQuiz("¿Tiene una deuda no garantizada de $10k o más?")
            }else{
                setStep("Revisando sus respuestas...")
                topScroll("top");
            }
		}

		axios
		.get(process.env.REACT_APP_PROXY + `/visits/8`)
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
			process.env.REACT_APP_PROXY + `/visits/update-visits8/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
	}

	const handleQuizN = () => {
		topScroll("btn");
		if(quiz === "¿Vives en los Estados Unidos?"){
			setQuiz("¿Eres menor de 85 años?")
		}else{
			if(quiz === "¿Eres menor de 85 años?"){
                setQuiz("¿Tiene una deuda no garantizada de $10k o más?")
            }else{
                setStep("Revisando sus respuestas...")
                topScroll("top");
            }
		}

		axios
		.get(process.env.REACT_APP_PROXY + `/visits/8`)
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
			process.env.REACT_APP_PROXY + `/visits/update-visits8/`+_id,
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
							<div className='main-des-title-6'><b>Finalmente, los deudores están obteniendo hasta un<span style={{backgroundColor:"#fde047"}}> 100% de perdón financiero</span> bajo este programa respaldado por abogados, ¡Aquí está cómo!</b></div>
							<img className='topic-img-middle' src = {Head_bg} alt = "head"/>
							<div className='main-des-5'>Los deudores están eliminando hasta el 100% de su deuda bajo este programa respaldado por abogados y USTED TAMBIÉN PUEDE.</div>
							<div className='main-des-5' style = {{marginTop:"1rem"}}>La mejor parte es que, si califica después de responder las 3 preguntas a continuación, obtiene una llamada de consulta GRATUITA con un agente calificado de nuestro equipo que ha llevado el perdón financiero a más de 200,000 deudores en todo el país.</div>
							<div className='main-des-5' style = {{marginTop:"1rem"}}>La oportunidad de reclamar una consulta 100% GRATUITA finaliza el 10 de febrero, por lo que es mejor verificar su elegibilidad y hacer su llamada gratuita mientras aún puede:?</div>
						</div>
						<div className='survey'>
							<div className='quiz-5' id='btn'>{quiz}</div>
							<div className='answer'>
								<div className='answer-btn-5' onClick={handleQuizP}>Sí</div>
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
						<div className='congrats'>¡Felicitaciones, USTED CALIFICA!</div>
						<div className='top-description-5'>¡Haga una llamada rápida para reclamar sus paneles solares gratis ahora!</div>
						<div className='spots-count'>Lugares restantes: 4</div>
						<div className='tap-direction'>👇 TOCA ABAJO PARA LLAMAR 👇</div>
						<a href = "tel:+18662286310">
							<div className='call-btn' onClick={handleCall}>
								CALL (866) 228-6310
							</div>
						</a>
						<div className='sub-title'>Nosotras hemos reservado tu lugar</div>
						<div className='sub-description'>Debido al alto volumen de llamadas, su agente oficial está esperando solo 3 minutos, luego su lugar no estará reservado.</div>
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