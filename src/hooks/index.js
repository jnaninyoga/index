import i18next, { changeLanguage } from "i18next";
import { useState, useEffect} from "react";
import { useLocation, useParams } from "react-router-dom/dist";
import { standardNavbar, supportedLanguages } from "../utils";

export function useIntersectView(ref) {
    const [isIntersected, setIsintersected] = useState();
  
    useEffect(()=>{
        const observer = new IntersectionObserver(entries =>{
            setIsintersected(entries[0].isIntersecting);
        });
        observer.observe(ref.current);
    }, [ref]);

    return isIntersected;
}

// hook for the active page that return the active page regardless of the language
export function useActivePage() {
    const path = useLocation().pathname.toLowerCase().split("/");
    const pathPage = supportedLanguages.map(lang => lang.code).includes(path[1]) ? path[2] : path[1];
    const activePage = !pathPage ? "home" : pathPage;
    return standardNavbar.map(page => page.toLowerCase()).includes(activePage) ? activePage : "notfound";
}

export function useCurrentLanguage() {
    return supportedLanguages.find(lang => lang.code === i18next.language)
}

// change the i18next language based on the page path like about/ => about/en
export function usePathLanguage() {
    const { lang } = useParams();
    // const queryLang = useLocation().search.split("=")[1];
    const currentLang = useCurrentLanguage();
    const pathLang = supportedLanguages.map(lang => lang.code).includes(lang?.toLowerCase()) ? lang : "en";

    console.log(i18next.language);
    // if (!supportedLanguages.find(lang => lang.code === pathLang)) return;
    // if (currentLang.code !== queryLang && !lang) changeLanguage(queryLang);
    if (currentLang.code !== pathLang) changeLanguage(pathLang);
    return pathLang;
}