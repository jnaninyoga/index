import { useState, useEffect, useMemo } from "react";
import Header from "../../layouts/global/Header";
import Footer from "../../layouts/global/Footer";
import Form from "../../layouts/global/Form";
import OverLaped from "../../layouts/global/OverLaped";
import banner from "../../assets/videos/banner.mp4";
import LotusOverlay from "../../assets/imgs/icons/lotusOverlay.webp";
import { contactFields } from "../../utils/form";
import { useTranslation } from "react-i18next";
import Meta from "../../meta";
import metadata from "../../meta/meta";
import { useCurrentLanguage, usePathLanguage } from "../../hooks";
import { addDocument } from "../../firebase";
import Error from "../../layouts/global/Error";
import Thank from "../../layouts/client/shared/Thank";
import Followers from "../../components/contact/Followers";
import { names } from "../../firebase/collections";
import { emailLog, sendEmail } from "../../email";

export default function Contact() {
  const { t } = useTranslation();
  const currentLanguage = useCurrentLanguage();
  usePathLanguage();

  const [contact, setContact] = useState({});
  const [showThankPage, setShowThankPage] = useState(false);
  const [error, setError] = useState(false);
  
  const TFields = t('contact.form.fields', {returnObjects: true});
  const TFieldsErrors = t('contact.form.fieldserrors', {returnObjects: true});

  const ContactFields = useMemo(() => contactFields.map(field => {
    field.placeholder = TFields[field.name.toLowerCase()] || field.placeholder;
    field.error = TFieldsErrors[field.name.toLowerCase()] || field.error;
    field.empty = t('GlobalForm.emptyField', {field: field.placeholder});
    return field;
  }), [TFields, TFieldsErrors, t]);

  // sending the contact form to firebase collection called "contact"
  const sendContact = async (contactdata) => {
    try {
      // clear the error message
      setError(false);
      const contact = await addDocument(names.contacts, {...contactdata, lang: currentLanguage.name, answered: false});
      // send the contact as an email to the admin
      const emailData = await sendEmail({
        to: import.meta.env.VITE_CONTACT_EMAIL,
        from: {
          name: contactdata.fullname,
          email: contactdata.email
        },
        subject: `New Contact From, ${contactdata.fullname}`,
        html: `
          <h1>New Contact Form - ${contactdata.fullname}</h1>
          <p>You have a new contact from, <strong>${contactdata.fullname}<strong>.</p>
          <ul>
            <li><strong>Name:</strong> ${contactdata.fullname}</li>
            <li><strong>Email:</strong> <a href="mailto:${contactdata.email}">${contactdata.email}</a></li>
            <li><strong>Phone:</strong> <a href="tel:${contactdata.phone}">${contactdata.phone}</a></li>
            <li><strong>WhatsApp:</strong> <a href="https://wa.me/${contactdata.phone}">${contactdata.phone}</a></li>
            <li><strong>Message:</strong> ${contactdata.message}</li>
          </ul>
          <p>
            <strong><u>CONTACT DASHBOARD:</u></strong>
            <a href="${import.meta.env.VITE_HOST_NAME}/lotus/contacts/${contact.id}">${import.meta.env.VITE_HOST_NAME}/lotus/contacts/${contact.id}</a>
          </p>
        `,
        text: `New Contact From, ${contactdata.fullname}\nYou have a new contact from, ${contactdata.fullname}.\nName: ${contactdata.fullname}\nEmail: ${contactdata.email}\nPhone: ${contactdata.phone}\nMessage: ${contactdata.message}\nCONTACT DASHBOARD: ${import.meta.env.VITE_HOST_NAME}/lotus/contacts/${contact.id}`
      });
      // email log
      await emailLog("contact", contact, emailData.messageId);
      setShowThankPage(true);
    } catch (e) {
      setError(e.message);
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowThankPage(false);
      setContact({});
    }, 18000);
    return () => clearTimeout(timeout);
  }, [showThankPage]);

  // check if there is any error
  if (error) return <Error title={t('GlobalError.title')} error={error || t('GlobalError.text')} btn={t('GlobalError.btn')}/>

  // if the contact form is sent successfully, it will render the thank you page
  if (showThankPage) return <Thank
    title={t('contact.thank.title', {name: contact.fullname})}
    message={t('contact.thank.message')}
    btn={t('contact.thank.btn')}
    onBack={() => { setShowThankPage(false); setContact({}); }}
  />

  return (
    <>
    <Meta {...metadata.contact}/>
    <Header/>
    <OverLaped banner={banner} type={"video"}>
      <img src={LotusOverlay} className={`opacity-100 -z-10 absolute scale-75 sm:bottom-6 bottom-0 sm:right-4 right-1 object-cover object-center mix-blend-screen transition-all duration-700 delay-300`} alt="Lotus Overlay" />
      <Form
      animatedIcon
      title={t('contact.title')}
      state={[contact, setContact]}
      fields={ContactFields}
      onSubmit={sendContact}
      EmptyErrorMessage={t('GlobalForm.emptyFields')}
      ErrorMessage={t('GlobalError.text')}
      errorTrigger={error}
      submitBtn={t('contact.form.submitBtn')}
      resetBtn={t('contact.form.resetBtn')}
      />
      <Followers/>
    </OverLaped>
    <Footer/>
    </>
  )
}
