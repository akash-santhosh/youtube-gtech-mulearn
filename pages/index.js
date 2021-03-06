import Head from 'next/head'
import { today } from '../today'
import { past } from '../past'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'


const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 80,
  strokeWidth: 5
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

export default function Home() {
  const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
  let endTime=0
  if(today[0]){
    endTime = new Date(today[0].eventTime)/1000; // use UNIX timestamp in seconds
  }
  
  

  const remainingTime = endTime - startTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  return (
    <div className="container">
      <Head>
        <title>GTech 𝝁Learn Youtube</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          GTech 𝝁Learn Industry Connect
        </h1>

        <p className="description"> Youtube live of Industry introductory meet</p>

        <div className="timer">
        <div className="timer1">
          <CountdownCircleTimer
            {...timerProps}
            colors={[["#7E2E84"]]}
            duration={daysDuration}
            initialRemainingTime={remainingTime}
          >
            {({ elapsedTime }) =>
              renderTime("days", getTimeDays(daysDuration - elapsedTime))
            }
          </CountdownCircleTimer>
          </div>
          <div className="timer2">
          <CountdownCircleTimer
            {...timerProps}
            colors={[["#D14081"]]}
            duration={daySeconds}
            initialRemainingTime={remainingTime % daySeconds}
            onComplete={(totalElapsedTime) => [
              remainingTime - totalElapsedTime > hourSeconds
            ]}
          >
            {({ elapsedTime }) =>
              renderTime("hours", getTimeHours(daySeconds - elapsedTime))
            }
          </CountdownCircleTimer>
          </div>
          <div className="timer3">
          <CountdownCircleTimer
            {...timerProps}
            colors={[["#EF798A"]]}
            duration={hourSeconds}
            initialRemainingTime={remainingTime % hourSeconds}
            onComplete={(totalElapsedTime) => [
              remainingTime - totalElapsedTime > minuteSeconds
            ]}
          >
            {({ elapsedTime }) =>
              renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
            }
          </CountdownCircleTimer>
          </div>
          <div className="timer4">
          <CountdownCircleTimer
            {...timerProps}
            colors={[["#218380"]]}
            duration={minuteSeconds}
            initialRemainingTime={remainingTime % minuteSeconds}
            onComplete={(totalElapsedTime) => [
              remainingTime - totalElapsedTime > 0
            ]}
          >
            {({ elapsedTime }) =>
              renderTime("seconds", getTimeSeconds(elapsedTime))
            }
          </CountdownCircleTimer>
        </div>
        </div>

        <div className="click">
          <h2>Click on the box &darr;</h2></div>

          <div className="grid">
          {today.map(item => (
            <a href={item.siteURL} className="card">
              <h3>{item.siteName}</h3>
              <img src={item.siteImage} className="image" />
              <p>{item.siteDesc}</p>
              </a>
          ))}
          </div>

         <div className="click">
          <h3>Past Events</h3></div>


        <div className="grid">

          {past.map(item => (
            <a href={item.siteURL} className="cardpast">
              <h3>{item.siteName}</h3>
              <img src={item.siteImage} className="image" />
              <p>{item.siteDesc}</p>
            </a>
          ))}


        </div>
      </main>

      <footer>
        <a href="https://atfg.gtechindia.org/" target="_blank" rel="noopener noreferrer">
          Powered by{' '}
          <img src="/logo.png" alt="Gtech Mulearn" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        .title a {
          color: #0070f3;
          text-decoration: none;
        }
        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }
        .title {
          margin: 0;
          line-height: 1;
          font-size: 1.5rem;
        }
        .title,
        .description {
          text-align: center;
        }
        .description {
          line-height: 1.5;
          font-size: 1.25rem;
        }
        .timer {
          display: flex;
        }
        .timer1 {
          text-align: center;
          padding-top: 15px;
          padding-right: 15px;
          padding-left: 15px;
        }
        .timer2 {
          text-align: center;
          padding-top: 15px;
          padding-right: 8px;
        }
        .timer3 {
          text-align: center;
          padding-top: 15px;
          padding-left: 8px;
        }
        .timer4 {
          text-align: center;
          padding-top: 15px;
          padding-right: 15px;
          padding-left: 15px;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
        }

        .click {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1rem;
        }
          .click h3 {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2rem;
          font-size: 1.25rem;
        }

        .center {
          display: flex;
          justify-content: center;
        }

        .image {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 300px;
        }

        .card {
          margin: 0.5rem;
          flex-basis: 40%;
          padding: 0.5rem;
          text-align: left;
          color: #0070f3;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 8px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        .card:hover,
        .card:focus,
        .card:active {
          color: #c4302b;
          border-color: #c4302b;
        }
        .card h3 {
          display: flex;
          justify-content: center;
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }
        .card p {
          justify-content: center;
          align-items: center;
          text-align: center;
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .cardpast {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: #0070f3;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        .cardpast:hover,
        .cardpast:focus,
        .cardpast:active {
          color: #c4302b;
          border-color: #c4302b;
        }
        .cardpast h3 {
          display: flex;
          justify-content: center;
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }
        .cardpast p {
          justify-content: center;
          text-align: center;
          align-items: center;
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }
        .logo {
          height: 2em;
        }
        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
