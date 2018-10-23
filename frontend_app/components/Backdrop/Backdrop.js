import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Backdrop extends Component {
  render() {
    return (
      <>
        <div>
          {this.props.open ? (
            <div className="Backdrop" onClick={this.props.clicked} />
          ) : null}
          <style jsx>{`
            .Backdrop {
              width: 100%;
              height: 100%;
              position: fixed;
              z-index: 100;
              left: 0;
              top: 0;
              background-color: rgba(0, 0, 0, 0.5);
            }
          `}</style>
        </div>
      </>
    )
  }
}

Backdrop.propTypes = {
  open: PropTypes.bool,
  clicked: PropTypes.func
}

export default Backdrop
