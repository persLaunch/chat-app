import PropTypes from 'prop-types'
import React from 'react'
import Backdrop from '../Backdrop/Backdrop'

export default function Modal({ open, closeModal, children }) {
  return (
    <>
      <div className="container" >
        <Backdrop open={open} clicked={closeModal} />

        <div
          className="modalCustom"
          style={{
            transform: open ? 'translateY(0)' : 'translateY(-300vh)',
            opacity: open ? '1' : '0',
            background: '#15222088',
          }}
        >
          {children}
        </div>
        <style jsx>{`
          .modalCustom {
            position: fixed;
            z-index: 9999999999;
            left: 0;
            top: 0;
            height: 100vh;
            transition: all 0.3s ease-out;
            overflow: auto;
            border-radius:10px;

            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 10px;
          }

          @media (max-width: 400px) {
            .modalCustom {
              width: 250px;
            }
          }
        `}</style>
      </div>
    </>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  closeModal: PropTypes.func
}
