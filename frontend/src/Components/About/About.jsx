import React from "react";
import "./About.css";  // Import the CSS file
import FeryAle from '../Assets/Tengah_Hutan.png'
import Rizky from '../Assets/Dayat.png'
import Ramlan from '../Assets/Ramlan.png'
import Nabilla from '../Assets/Nabilla.jpg'
 
const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to our application! This platform is designed to provide
        valuable information and services to our users. Our mission is to
        deliver a seamless and user-friendly experience for everyone.
      </p>
      <h2>Our Vision</h2>
      <p>
        We aim to become a trusted source of knowledge and innovation in the
        field, empowering individuals to achieve their goals through our
        platform.
      </p>
      <div class="team">
        <h1>Our<span>Team</span></h1>

        <div class="team_box">
            <div class="profile">
                <img src={FeryAle} alt="Fery Ale Lesmana"/>

                <div class="info">
                    <h2 class="name">Fery Ale Lesmana</h2>
                    <p class="bio">Backend Developer</p>

                    <div class="team_icon">
                        <a href="https://web.facebook.com/">
                          <i class="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="https://web.twitter.com/">
                          <i class="fa-brands fa-twitter"></i>
                        </a>
                        <a href="https://www.instagram.com/">
                          <i class="fa-brands fa-instagram"></i>
                        </a>
                    </div>

                </div>

            </div>

            
            <div class="profile">
                <img src={Rizky} alt="Rizky Hidayatullah"/>

                <div class="info">
                    <h2 class="name">Rizky Hidayatullah</h2>
                    <p class="bio">Lulusan Teikyo University</p>

                    <div class="team_icon">
                        <a href="https://web.facebook.com/">
                          <i class="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="https://web.twitter.com/">
                          <i class="fa-brands fa-twitter"></i>
                        </a>
                        <a href="https://www.instagram.com/">
                          <i class="fa-brands fa-instagram"></i>
                        </a>
                    </div>

                </div>

            </div>

            <div class="profile">
            <img src={Ramlan} alt="Ramlan Kusuma"/>

                <div class="info">
                    <h2 class="name">Ramlan Kusuma</h2>
                    <p class="bio">IPB</p>
                    <div class="team_icon">
                        <a href="https://web.facebook.com/">
                          <i class="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="https://web.twitter.com/">
                          <i class="fa-brands fa-twitter"></i>
                        </a>
                        <a href="https://www.instagram.com/">
                          <i class="fa-brands fa-instagram"></i>
                        </a>
                    </div>
                </div>

            </div>

            <div class="profile">
            <img src={Nabilla} alt="Nabilla Eka Putri"/>
                <div class="info">
                    <h2 class="name">Nabila</h2>
                    <p class="bio">Pamulang University</p>
                    <div class="team_icon">
                        <a href="https://web.facebook.com/">
                          <i class="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="https://web.twitter.com/">
                          <i class="fa-brands fa-twitter"></i>
                        </a>
                        <a href="https://www.instagram.com/">
                          <i class="fa-brands fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
      

  
    </div>
      
      <h2>Contact Us</h2>
      <p>
        If you have any questions or feedback, feel free to reach out to us at{" "}
        <a href="mabelify@gmail.com">mabelify@gmail.com</a>.
      </p>
    </div>
    
  );
};

export default About;
