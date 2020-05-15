import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons'

const Newsletter = () => {

  return (
    <div className="box" style={{ maxWidth: '350px', margin: '0 auto', position: 'sticky', top: '50px' }}>
      <div className="has-text-centered" style={{ paddingBottom: '1.5rem' }}>
        <span className="icon is-large has-text-primary">
          <FontAwesomeIcon icon={faEnvelopeOpen} size="4x" />
        </span>
        <p className="title is-4 is-spaced" style={{ marginTop: '1.2rem' }}>¿Quieres saber más sobre desarrollo web?</p>
        <p className="subtitle is-6"><strong>Suscríbete</strong> para recibir información y contenido de calidad.</p>
      </div>
      <div className="field">
        <div className="control">
          <input className="input" placeholder="Tu correo electrónico" />
        </div>
      </div>
      <div className="field">
        <div className="control has-text-centered">
          <button type="button" className="button is-primary">Suscribirme</button>
        </div>
      </div>
    </div>
  )
}

export default Newsletter
