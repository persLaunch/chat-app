import React, { Component } from 'react'
import Router from 'next/router'

export default class Footer extends Component {


  goChat = () => {

    Router.push('/chat')

  }

  render() {
    return (
      <div className="footer-main">
        <div className="row main-content">
          <div className="col-sm-12 col-md-4 col-lg-4">
            <a
              className="footer-links"
              onClick={this.goChat}
              style={{ cursor: 'pointer' }}
            >
             Enter in the chat
            </a>
          </div>
       
        </div>
        <footer className="copyright">© 2018, Vincent Lim</footer>
        <style jsx>{`
          .icon-container {
            display: flex;
            justify-content: center;
            flex-direction: row;
          }
        
          .footer-main {
            color: white;
            background-color: #223741;
            height: auto;
            text-align: center;
            padding-top: 100px;
            padding-left: 50px;
            padding-right: 50px;
          }
          .footer-main p {
            margin-left: 13px;
            color: #89a1c0;
            font-size: 13px;
          }
          .footer-main ul {
            list-style-type: none;
            color: #bdbdbd;
          }
          .footer-main ul li {
            margin-bottom: 5px;
          }
          .footer-links {
            color: #89a1c0;
            display: inline-block;
            margin-bottom: 5px;
            font-size: 20px;
          }
          .footer-links:hover {
            color: #ffffff;
          }
          a {
            text-decoration: none;
          }
          a::before,
          a::after {
            display: inline-block;
            opacity: 0;
            transition: transform 0.3s, opacity 0.2s;
          }
          a::before {
            padding-right: 10px;
            content: '[';
            transform: translateX(10px);
          }
          a::after {
            padding-left: 10px;
            content: ']';
            transform: translateX(-10px);
          }
          a:hover::before,
          a:hover::after,
          a:focus::before,
          a:focus::after {
            opacity: 1;
            transform: translateX(0px);
          }
          .copyright {
            color: #7d8a95;
            background-color: #223741;
            padding: 20px;
            font-size: 0.7em;
            text-align: center;
          }
        `}</style>
      </div>
    )
  }
}
