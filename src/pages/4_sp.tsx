import React, {useState, useEffect} from 'react';
//@ts-ignore
import TagManager from 'react-gtm-module'
import axios from "axios";
import './styles.scss'

import { scrollTo } from '../utils';

import Head_bg from '../assets/hero10.png'

// google tag manager

const tagManagerArgs = {
    gtmId: 'GTM-PKZZ9G8'
}

TagManager.initialize(tagManagerArgs)

export default function Forth_SP() {

	useEffect(() => {
		window.document.title="Verifique su elegibilidad ahora";

		axios
      .get(process.env.REACT_APP_PROXY + `/visits/10`)
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
				process.env.REACT_APP_PROXY + `/visits/create-visits10`,
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
				process.env.REACT_APP_PROXY + `/visits/update-visits10/`+_id,
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
		.get(process.env.REACT_APP_PROXY + `/visits/10`)
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
			process.env.REACT_APP_PROXY + `/visits/update-visits10/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
	}


	const [quiz, setQuiz] = useState("¿Tienes más de 50 años?")
	const [step, setStep] = useState("process")
	const [min, setMin] = useState(3)
	const [second, setSecond] = useState<any>(0)    
	const [yes, setYes] = useState("SÍ, TENGO 50 AÑOS O MÁS")
	const [no, setNo] = useState("NO, TENGO 50 AÑOS O MENOS")
	
	
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
				.get(process.env.REACT_APP_PROXY + `/visits/10`)
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
					process.env.REACT_APP_PROXY + `/visits/update-visits10/`+_id,
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
		if(quiz === "¿Tienes más de 50 años?"){
			setQuiz("¿Tiene número de la Seguridad Social?")
			setYes("Sí")
			setNo("No")
		}else{
			setStep("Revisando sus respuestas...")
			topScroll("top");
		}

		axios
		.get(process.env.REACT_APP_PROXY + `/visits/10`)
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
			process.env.REACT_APP_PROXY + `/visits/update-visits10/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
	}

	const handleQuizN = () => {
		topScroll("btn");
		if(quiz === "¿Tienes más de 50 años?"){
			setQuiz("¿Tiene número de la Seguridad Social?")
			setYes("Sí")
			setNo("No")
		}else{
			setStep("Revisando sus respuestas...")
			topScroll("top");
		}

		axios
		.get(process.env.REACT_APP_PROXY + `/visits/10`)
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
			process.env.REACT_APP_PROXY + `/visits/update-visits10/`+_id,
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
						<div className='main-des-title'>Los estadounidenses mayores de 50 años perciben esta prestación de gastos finales de 41.000 $ que cubre el 100% de los gastos funerarios. Le explicamos cómo!</div>
						<img className='topic-img-middle' src = {Head_bg} alt = "head"/>
						<div className='main-des-5'>Los estadounidenses mayores de 50 años pueden precalificar para este programa de gastos finales de 2023 que cubre el 100 % de los costos del funeral.</div>
						<div className='main-des-5' style = {{marginTop:"1rem"}}>La oportunidad de actualizar sus beneficios finaliza el 31 de marzo, por lo que es mejor llamar y obtener su beneficio de gastos finales mientras aún está disponible. </div>
						<div className='main-des-5' style = {{marginTop:"1rem"}}>¡Responda el cuestionario a continuación para verificar si es elegible!</div>
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
						<div className='congrats'>¡Felicitaciones, usted califica!</div>
						<div className='top-description-5'>Haga Una <b>LLlamada Rápida</b> Para Reclamar Su Beneficio De Gastos Finales Ahora!</div>
						<div className='spots-count'>Lugares restantes: 4</div>
						<div className='tap-direction'>👇 TOCA ABAJO PARA LLAMAR 👇</div>
						<a href = "tel:+18332464484">
							<div className='call-btn' onClick={handleCall}>
								CALL (833) 246-4484
							</div>
						</a>
						<div className='sub-title'>Nosotras Hemos Reservado Tu Lugar</div>
						<div className='sub-description'>Debido al alto volumen de llamadas, su agente oficial está esperando solo <b> 3 minutos </b>, luego su lugar no estará reservado.</div>
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