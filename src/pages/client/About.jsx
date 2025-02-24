import { useRef } from "react";
import Footer from "../../layouts/global/Footer";
import Header from "../../layouts/global/Header";
import OverLaped from "../../layouts/global/OverLaped";
import banner from "../../assets/videos/banner.mp4";
import LotusOverlay from "../../assets/imgs/icons/lotusOverlay.webp";
import Icon from "../../assets/svg";
import profile from "../../assets/imgs/stock/profile.webp";
import { useActivePage, useIntersectView, usePathLanguage } from "../../hooks";
import { useTranslation } from "react-i18next";
import Meta from "../../meta";
import metadata from "../../meta/meta";
import Map from "../../components/about/Map";

export default function About() {
  const { t } = useTranslation();
  const activePage = useActivePage();
  usePathLanguage();

  const wrapper = useRef(null);
  const profileImg = useRef(null);
  const SocialMedia = useRef(null);
  const isWrapperIntersected = useIntersectView(wrapper);
  const isProfileIntersected = useIntersectView(profileImg);
  const isSocialMediaIntersected = useIntersectView(SocialMedia);
  
  return (
  <>
  <Meta {...metadata.about}/>
  <Header/>


  <OverLaped banner={banner} type={"video"}>
    <img src={LotusOverlay} className={`opacity-100 -z-10 absolute scale-75 bottom-32 sm:right-4 right-1 object-cover object-center mix-blend-screen transition-all duration-700 delay-300`} alt="Lotus Overlay" />
    <section ref={wrapper} className="relative w-full lg:px-20 sm:px-10 px-2 flex items-center gap-4 flex-col">
      <div ref={profileImg} className={`relative aspect-square sm:h-56 sm:w-56 h-48 w-48 -translate-y-[65%] lg:translate-y-0 overflow-hidden`}>
        <div className={`${isProfileIntersected ? "scale-[1.30]" : "scale-0"} h-full w-full flex justify-center items-center transition-all duration-300 select-none`}>
          <Icon
            label="Lotus"
            colors={{oc: "#ffffff", pc: "#ffaaab"}}
          />
        </div>
        <img src={profile} className={`${isProfileIntersected ? "opacity-100 -translate-y-1/2" : "opacity-0 translate-y-1/2"} absolute h-[50%] w-[50%] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full object-cover object-center transition-all duration-300 select-none pointer-events-none`} alt="The Yoga Coash Ouarda"/>
      </div>
      <article className="flex lg:translate-y-0 sm:-translate-y-[18%] -translate-y-[12%] flex-col items-center justify-center gap-6 overflow-hidden">
        <h1 className={`${isWrapperIntersected ? "translate-y-0 opacity-100" : 'translate-y-[100%] opacity-0'} cinzel text-yoga-white text-center sm:text-4xl text-2xl font-bold uppercase transition-all duration-500`}>{t(`${activePage}.title`)}</h1>
        <p className={`${isWrapperIntersected ? "translate-y-0 opacity-100" : 'translate-y-[100%] opacity-0'} text-yoga-white sm:text-center text-justify sm:text-lg transition-all duration-300`}>
          {t(`${activePage}.text`)}
        </p>
        <ul ref={SocialMedia} className="cinzel items-center flex gap-6">
          <li>
            <a className={`${isSocialMediaIntersected ? "opacity-100 scale-100":"opacity-0 scale-0"} flex items-center gap-4 transition-all duration-200`} href="https://instagram.com/jnaninyoga" title="Instagram Page" referrerPolicy="no-referrer" rel="noreferrer" target="_blank">
              <i className="fi fi-brands-instagram lg:text-lg sm:text-2xl text-xl text-yoga-white hover:text-yoga-red transition-all duration-300"></i>
            </a>
          </li>
          <li>
            <a className={`${isSocialMediaIntersected ? "opacity-100 scale-100":"opacity-0 scale-0"} flex items-center gap-4 transition-all duration-300`} href="https://facebook.com/jnaninyoga" title="Facebook Page" referrerPolicy="no-referrer" rel="noreferrer" target="_blank">
              <i className="fi fi-brands-facebook lg:text-lg sm:text-2xl text-xl text-yoga-white hover:text-yoga-red transition-all duration-300"></i>
            </a>
          </li>
          <li>
            <a className={`${isSocialMediaIntersected ? "opacity-100 scale-100":"opacity-0 scale-0"} flex items-center gap-4 transition-all duration-500`} href="https://wa.me//212661286464" title="Whatsapp Contact" referrerPolicy="no-referrer" rel="noreferrer" target="_blank">
              <i className="fi fi-brands-whatsapp lg:text-lg sm:text-2xl text-xl text-yoga-white hover:text-yoga-red transition-all duration-300"></i>
            </a>
          </li>
          <li>
            <a className={`${isSocialMediaIntersected ? "opacity-100 scale-100":"opacity-0 scale-0"} flex items-center gap-4 transition-all duration-700`} href="mailto:contact@jnaninyoga.com" title="Contact Email" referrerPolicy="no-referrer" rel="noreferrer" target="_blank">
              <i className="fi fi-bs-at lg:text-lg sm:text-2xl text-xl text-yoga-white hover:text-yoga-red transition-all duration-300"></i>
            </a>
          </li>
        </ul> 
      </article>
    </section>
  </OverLaped>
  <Map title={t('about.map')}/>
  <Footer/>
  </>
  )
}
