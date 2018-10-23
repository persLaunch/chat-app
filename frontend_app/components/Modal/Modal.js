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
            opacity: open ? '1' : '0'
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
            background-color: rgba(255,255,255);

            display: flex;
            justify-content: center;
            align-items: center;
          }

          @media (max-width: 400px) {
            .modalCustom {
              width: 200px;
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
