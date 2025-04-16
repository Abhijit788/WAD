import React from "react";
import LinkedInIcon from "./ProfilePage_assets/linkedin.png";
import MailIcon from "./ProfilePage_assets/gmail.png";
import MobileIcon from "./ProfilePage_assets/phone-call.png";
import InstagramIcon from "./ProfilePage_assets/instagram.png";
import WhatsAppIcon from "./ProfilePage_assets/whatsapp.png";

const SocialMediaTab = () => {
  const socialMediaIcons = {
    LinkedIn: LinkedInIcon,
    Mail: MailIcon,
    Mobile: MobileIcon,
    Instagram: InstagramIcon,
    WhatsApp: WhatsAppIcon,
  };

  return (
    <div className="mx-auto my-3 rounded-full w-96">
      <ul className="block w-full h-12 overflow-hidden">
        {Object.entries(socialMediaIcons).map(([title, icon], index) => (
          <li
            key={index}
            className="relative inline-block w-12 h-full overflow-hidden transition-all duration-300 ease-in-out delay-100 border-r-2 border-slate-200 rounded-e-full hover:w-48"
          >
            <div className="absolute inset-0 p-2 transition-opacity duration-300 ease-in-out">
              <img
                src={icon}
                alt="icon"
                className="absolute object-cover w-8 h-8"
              />
            </div>
            <div className="relative flex items-center justify-center w-8 h-full ml-20 transition-all duration-300 ease-in-out">
              <a
                href="#"
                className="flex items-center justify-center text-base font-semibold text-center"
              >
                {title}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialMediaTab;
