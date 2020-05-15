import React, { useState, useEffect } from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import cn from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [thanks, setThanks] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (thanks) {
      setTimeout(() => {
        setThanks(false);
      }, 5000)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setMsg('')
    if (email !== '') {
      setLoading(true)

      addToMailchimp(email)
        .then(data => {
          console.log(data)
          if (data.result === 'success') {
            setThanks(true)
          } else {
            setMsg(data.msg)
          }

          setEmail('')
          setLoading(false)
        })
        .catch((err) => {
          console.error(err)
          setLoading(false)
        })
    }
  }
  return (
    <div className="box" style={{ maxWidth: '350px', margin: '0 auto', position: 'sticky', top: '50px' }}>
      <form onSubmit={handleSubmit}>
        <div className="has-text-centered" style={{ paddingBottom: '1.5rem' }}>
          <span className="icon is-large has-text-primary">
            <FontAwesomeIcon icon={faEnvelopeOpen} size="4x" />
          </span>
          <p className="title is-4 is-spaced" style={{ marginTop: '1.2rem' }}>¿Quieres saber más sobre desarrollo web?</p>
          <p className="subtitle is-6"><strong>Suscríbete</strong> para recibir información y contenido de calidad.</p>

          {
            thanks && (<>
              <p className="title is-4 is-spaced has-text-success" style={{ marginTop: '1.2rem' }}>¡Gracias por tu suscripción!</p>
              <div className="has-text-muted is-size-7">Te envie un correo de saludo y confirmar que todo esta correcto.</div>
            </>
            )
          }
        </div>
        {
          msg && (<p className="has-text-danger is-size-7" style={{ marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: msg }} />)
        }
        {
          !thanks && (
            <>
              <div className="field">
                <div className="control">
                  <input
                    name="email"
                    type="email"
                    required
                    className="input"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Tu correo electrónico"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control has-text-centered">
                  <button className={cn('button', 'is-primary', {
                    'is-loading': loading
                  })}>Suscribirme</button>
                </div>
              </div>
            </>
          )
        }
      </form>
    </div>
  )
}

export default Newsletter
