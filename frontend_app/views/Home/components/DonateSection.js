
import React from 'react'

export default function DonateSection() {
  return (
    <div>
      <div className="row price-section">
        <div className="membership-header col-sm-12 col-md-12 col-lg-12">
          <div className="center-text">
            ChatApp
          </div>
        </div>
      </div>
   
      <style jsx>{`
        .membership-header {
          margin-bottom: 20px;
          color: white;
        }
        .center-text {
          text-align: center;
        }
        .price-section {
          padding: 30px;
          background-color: #536E8D;
        }
      `}</style>
    </div>
  )
}
