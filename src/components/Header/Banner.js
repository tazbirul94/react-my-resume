import React from 'react';
import SocialMedia from '../SocialMedia';


const Banner = ({ basics }) => (
  <div className="row banner">
    <div className="banner-text">
      <h1 className="responsive-headline">
        {basics.name}
      </h1>
      <h3 className="responsive-headline">
        WELCOME TO MY RESUME
      </h3>
      <a href="https://dotnet.microsoft.com/" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/1200px-.NET_Core_Logo.svg.png" alt="dotnet" width="60" height="60"/> </a> 
      <a href="https://www.w3schools.com/cs/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg" alt="csharp" width="60" height="60"/> </a> 
      <a href="https://www.microsoft.com/en-us/sql-server" target="_blank"> <img src="https://logodix.com/logo/644095.jpg" alt="mssql" width="60" height="60"/> </a> 
      <a href="https://www.w3.org/html/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="60" height="60"/> </a> 
      <a href="https://reactnative.dev/" target="_blank"> <img src="https://reactnative.dev/img/header_logo.svg" alt="reactnative" width="60" height="60"/> </a> 
      <a href="https://www.w3schools.com/css/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="60" height="60"/> </a> 
      <a href="https://postman.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="60" height="60"/> </a> 
      <a href="https://git-scm.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="60" height="60"/> </a> 
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="60" height="60"/> </a>  
      <a href="https://flutter.dev" target="_blank"> <img src="https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg" alt="flutter" width="60" height="60"/> </a> 
      <br/>
      <hr/>
      <SocialMedia profiles={basics.profiles} />
    </div>
  </div>
);

export default Banner;