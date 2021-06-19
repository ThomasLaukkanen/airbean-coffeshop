import './Status.scss'
import drone from '../assets/drone.svg'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { useEffect, useState } from 'react'
import Moment from 'react-moment'
import 'moment-timezone'
function Status() {
  const history = useHistory()
  const orders = useSelector((state) => state.orders)
  const [startTime, setStartTime] = useState(moment().add(2, 'h'))
  // const [endTime, setEndTime] = useState(moment(orders[orders.length - 1].eta))

  return (
    <div className="statusWrapper">
      {orders.length > 0 ? (
        <>
          <h3>
            Ordernummer <strong>#{orders[orders.length - 1].id} </strong>
          </h3>
          <img src={drone} alt="drone" />
          <h1>Din beställning är på väg!</h1>
          <h2>
            <strong>
              {
                <Moment diff={startTime} unit="minutes" interval={1000}>
                  {moment(orders[orders.length - 1].eta)}
                </Moment>
              }
            </strong>
            minuter
          </h2>
          <button onClick={() => history.push('/menu')}>Ok, cool!</button>
        </>
      ) : (
        <>
          <h3>
            Ordernummer <strong>#XXXXX </strong>
          </h3>
          <img src={drone} alt="drone" />
          <h1>Inga aktiva ordrar</h1>
          <h2>
            <strong>0</strong> minuter
          </h2>
          <button onClick={() => history.push('/menu')}>Gå till Menyn!</button>
        </>
      )}
    </div>
  )
}

export default Status
