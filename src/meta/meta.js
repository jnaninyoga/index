// OGP images
import home from "../assets/imgs/OGP/Home.jpg";
import about from "../assets/imgs/OGP/About.jpg";
import contact from "../assets/imgs/OGP/Contact.jpg";
import classes from "../assets/imgs/OGP/Classes.jpg";
import book from "../assets/imgs/OGP/Book.jpg";

export default {
    home:{
        title: "Jnanin Yoga Studio: Embark on Balance", // [key] to retrieve the title from the i18n file
        description: "Experience holistic wellness and embrace your inner strength at Jnanin Yoga Studio. Join me (the Yoga coach Ouarda) as I guide you through empowering classes that nurture your mind, body, and spirit. Embrace balance, empowerment, and self-discovery within our inclusive community.",
        keywords: "Yoga studio, women-led, holistic wellness, empowerment, mind-body-spirit, yoga classes, self-discovery, balance, inner strength, transformative journey, Yoga coach Ouarda, mindfulness, meditation, flexibility, strength, community, inclusivity, wellbeing, stress relief, relaxation, breathwork, health, fitness, positive energy, tranquility",
        image: home,
        url: `${import.meta.env.VITE_HOST_NAME}`,
        type: "website"
    },
    about:{
        title: "Meet Ouarda: Nourishing Holistic Wellness", // [key] to retrieve the title from the i18n file
        description: "I'm Ouarda, a passionate Moroccan Yoga coach. I guide individuals on a transformative journey toward holistic well-being, adapting my teachings to meet unique needs and goals. With a focus on breathwork, mindfulness, and meditation, I unlock true potential and cultivate self-love. Join me for a beautiful journey of self-discovery, nourishing body and soul for a balanced life.",
        keywords: "Yoga studio, women-led, holistic wellness, empowerment, mind-body-spirit, yoga classes, self-discovery, balance, inner strength, transformative journey, Yoga coach Ouarda, mindfulness, meditation, flexibility, strength, community, inclusivity, wellbeing, stress relief, relaxation, breathwork, health, fitness, positive energy, tranquility",
        image: about,
        url: `${import.meta.env.VITE_HOST_NAME}/about`,
        type: "website"
    },
    contact:{
        title: "Say Hello to Jnanin Yoga Studio", // [key] to retrieve the title from the i18n file
        description: "Feel free to reach out to me at Jnain Yoga Studio through our contact form, email, or phone. I'm here to assist you with any inquiries or provide information about our services. Rest assured that I will respond promptly if you fill out the contact form. Thank you for your interest in Jnain Yoga Studio; I eagerly anticipate connecting with you soon.",
        keywords: "Yoga studio, Contact, reach out, inquiry, information, communication, message, email, phone, connect, contact form, Jnain Yoga Studio.",
        image: contact,
        url: `${import.meta.env.VITE_HOST_NAME}/contact`,
        type: "website"
    },
    booknow:{
        title: "Reserve Your Spot: Begin Your Holistic Journey", // [key] to retrieve the title from the i18n file
        description: "Book your yoga session at Jnain Yoga Studio through our online booking system. Select your preferred class, date, and time, and I will confirm your booking shortly. I look forward to guiding you on a transformative journey toward holistic well-being.",
        keywords: "Yoga studio, Book now, booking, online booking, schedule, timetable, yoga sessions, Jnain Yoga Studio, session timing, calendar, availability.",
        image: book,
        url: `${import.meta.env.VITE_HOST_NAME}/booknow`,
        type: "website"
    },
    classes:{
        title: "Jnanin Yoga Calendar: Find Your Flow", // [key] to retrieve the title from the i18n file
        description: "Explore the Classes page of Jnain Yoga Studio, where you will embark on a holistic yoga journey. Delve into our carefully curated schedule, effortlessly enroll in your preferred classes, and begin your extraordinary path toward well-being and self-exploration.",
        keywords: "Yoga studio, Classes, schedule, timetable, yoga sessions, Jnain Yoga Studio, session timing, calendar, booking, availability.",
        image: classes,
        url: `${import.meta.env.VITE_HOST_NAME}/classes`,
        type: "website"
    },
    notfound:{
        title: "Oops! You've Reached the Zen Zone", // [key] to retrieve the title from the i18n file
        description: "The page you are looking for does not exist. Please check the URL or go to the home page.",
        keywords: "Yoga studio, 404, not found, page not found, error, Jnain Yoga Studio, home page.",
        image: home,
        url: `${import.meta.env.VITE_HOST_NAME}`,
        type: "website"
    }
}