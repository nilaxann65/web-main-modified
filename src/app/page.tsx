'use client'
import React from 'react'
import ingresosImage from '../assets/images/ingresos.png'
import gastosImage from '../assets/images/gastos.png'
import historicoImage from '../assets/images/historico.png'
import { CardComponent } from './_components'
import './page.css'

export default function Home(): React.JSX.Element {
  return (
    <div className="content-page">
      <div className="title-description">
        <h1 className="title-welcome">Bienvenido, Pepito!</h1>
        <p>Registrar tus ingresos nunca fue tan fácil</p>
        <p>
          Ahora podrás tener el control de tus finanzas en línea desde la comodidad de tu celular
        </p>
      </div>
      <div className="row">
        <CardComponent
          title="Registro de ingresos"
          icon={ingresosImage}
          onCardClick={() => {
            console.log('here route of page')
          }}
          path={'/income'}
        />
        <CardComponent
          title='Registro de gastos'
          icon={gastosImage}
          onCardClick={() => {
            console.log('here route of page')
          }}
          path={'/expense'}
        />
        <CardComponent
          title='Historial'
          icon={historicoImage}
          onCardClick={() => {
            console.log('here route of page')
          }}
          path={'/historical'}
        />
      </div>
    </div>
  )
}
