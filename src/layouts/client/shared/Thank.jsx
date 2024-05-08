import OverLaped from "../../global/OverLaped";
import { useTranslation } from "react-i18next";
import Footer from "../../global/Footer";
import banner from  "../../../assets/imgs/stock/thankpage.webp"
import PropTypes from 'prop-types';
import Icon from "../../../assets/svg";

Thank.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    btn: PropTypes.string,
    onBack: PropTypes.func
};

export default function Thank({title, message, btn="Go Back", onBack}) {
  const { t } = useTranslation();
  return (
    <>
    <OverLaped banner={banner}>
        <section className="sm:w-[90vw] h-full flex flex-1 justify-center items-center flex-col gap-4">
            <div className="flex flex-col justify-center items-center">
              <Icon
              label="Lotus"
              src="https://cdn.lordicon.com/hvuelaml.json"
              colors={{oc: "#ffffff", pc: "#fdc5ba"}}
              />
              <h1 className="cinzel sm:text-4xl text-4xl text-center text-yoga-white font-bold uppercase">{title}</h1>
            </div>
            <article className="w-full sm:p flex flex-1 justify-center items-center flex-col sm:gap-6 gap-4">
              <p className="cinzel sm:text-2xl text-center text-yoga-white font-bold">{message}</p>
              <button onClick={onBack} className="cinzel sm:text-2xl text-xl font-bold yoga-btn">{btn}</button>
            </article>
            <article className="text-yoga-white">
              <p className="text-yoga-white">
                <i className="mr-2 px-1 py-[1.2px] fi fi-brands-google text-yoga-white text-center bg-yoga-red-dark"></i>
                {t("GoogleReviewMotivation")}
                <a
                  className={`ml-2 relative font-bold transition-all text-yoga-red before:transition-all before:absolute before:h-1 before:bg-yoga-red before:left-1/2 before:-translate-x-1/2 before:-bottom-1 hover:before:w-full hover:text-yoga-red-dark uppercase`}
                  href="https://g.page/r/CTG_dcrDmIkeEB0/review"
                  referrerPolicy="no-referrer" 
                  rel="noreferrer"
                  target="_blank"
                >{t("GoogleReviewMotivationLink")}</a>
              </p>
            </article>
        </section>
    </OverLaped>
    <Footer/>
    </>
  )
}
