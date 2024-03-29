// === HOOKS ===
import { useCallback, useEffect, useMemo, useState } from "react";
import { useActiveBoard } from "../../../hooks";

// === UTILS ===
import { DefaultCarnetsSettings, CarnetStatus, alertMessage, date, dateFormater, toXlsx } from "../../../utils";
import { clientFields } from '../../../utils/form';
import PropTypes from "prop-types";

// === ASSETS ===
import Icon from "../../../assets/svg";

// === LAYOUTS ===
import Alert from "../shared/Alert";
import { Box } from "@mui/material";
import { Helmet } from "react-helmet-async";

// === DB ===
import { names, configurations } from "../../../firebase/collections";
import { updateSubColDocument } from "../../../firebase";

// === COMPONENTS ===
// --- LOCAL ---
import SessionReportCard from "./carnets/SessionReportCard";
import SessionReportCreate from "./carnets/SessionReportCreate";
import SessionReportLookup from "./carnets/SessionReportLookup";
// --- CHARTS ---

CarnetReports.propTypes = {
  onClose: PropTypes.func.isRequired,

  // --- [CARNETS] ---
  carnet: PropTypes.shape({
    id: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.oneOf(CarnetStatus).isRequired,
    period: PropTypes.string.isRequired,
    sessions: PropTypes.number.isRequired,
    passedSessions: PropTypes.number.isRequired,
    sessionReports: PropTypes.arrayOf(PropTypes.object),
    progress: PropTypes.number,
    price: PropTypes.number.isRequired,
    paidAmount: PropTypes.number,
    remainingAmount: PropTypes.number.isRequired,
    // => Database document fields
		createdAt: PropTypes.object,
		updatedAt: PropTypes.object,
  }).isRequired,

  // --- [CLIENT] ---
  client: PropTypes.shape({
		// personal info
		id: PropTypes.string,
		hp: PropTypes.number,
		firstname: PropTypes.string,
		lastname: PropTypes.string,
		sex: PropTypes.oneOf(["male", "female"]),
		birthdate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		age: PropTypes.number,
		email: PropTypes.string,
		phone: PropTypes.string,
		address: PropTypes.string,
		job: PropTypes.string,
		// medical info
		medicalhistory: PropTypes.shape({
			// current care
			currentcare: PropTypes.oneOf(clientFields.find((field) => field.name === "currentcare").options),
			currentcareinfo: PropTypes.string,
			// medical history
			record: PropTypes.oneOf(clientFields.find((field) => field.name === "record").options),
			recordinfo: PropTypes.string,
		}),
		// physical / mental info
		physentalstate: PropTypes.shape({
			physical: PropTypes.arrayOf(PropTypes.string),
			mental: PropTypes.arrayOf(PropTypes.string),
		}),
		// life rhythm
		liferhythm: PropTypes.shape({
			sleep: PropTypes.oneOf(clientFields.find((field) => field.name === "sleep").options),
			nutrition: PropTypes.oneOf(clientFields.find((field) => field.name === "nutrition").options),
			sport: PropTypes.oneOf(clientFields.find((field) => field.name === "sport").options),
			meditation: PropTypes.oneOf(clientFields.find((field) => field.name === "meditation").options),
		}),
		// consultation reason
		consultationreason: PropTypes.string,
		// => Database document fields
		createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		updatedAt: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	}),

  configs: PropTypes.shape(DefaultCarnetsSettings),
  updateCarnets: PropTypes.func.isRequired,
};




export default function CarnetReports({ carnet, client, updateCarnets, onClose=() => console.log("Carnet Reports Closed")}) {
  const SessionReports = useMemo(() => (carnet.sessionReports || []).sort((a, b) => a.session - b.session), [carnet]);
  const [APIDate, setAPIDate] = useState(new Date());


  // message modal state
  const [modal, setModal] = useState({type:"", data: null}); // SHOW, CREATE
  const [alert, setAlert] = useState({})

  // search params
  const { boardParams } = useActiveBoard();

  // set the date to the current date
  useEffect(() => {
    date().then(date => date).then(date => setAPIDate(date));
  }, []);

  useEffect(() => {
    if(!boardParams.subViewId) return;
      // decompose the url into the session and report id, /reports/S{session}R{report} -> session, report
      const report = SessionReports.find(r => r.id === parseInt(boardParams.subViewId.split("R")[1]));
      if (!report) return;
      setModal({type:"SHOW", data: report});
      window.history.replaceState(null, null, `/lotus/${names.clients}/${client.id}/carnets/${carnet.order}/reports/S${report.session}R${report.id}`);
  }, [boardParams.subViewId, SessionReports, client, carnet]);


    // Alert Action
  const alertAction = useCallback((onAction, closeAlert=true) => {
    onAction && onAction(); // run the action if it's exist
    closeAlert && setAlert({}); // close the alert
  }, []);


  // === CRUD ===
  const displayReports = useCallback(report => {
    setModal({type:"SHOW", data: report});
    window.history.replaceState(null, null, `/lotus/${names.clients}/${client.id}/carnets/${carnet.order}/reports/S${report.session}R${report.id}`);
  }, [carnet, client]);


  // --- CREATE ---
  const addSessionReport = useCallback( async (report) => {
    try {
      const newSessionReports = [...SessionReports, {...report, id: SessionReports.length + 1, createdAt: APIDate}];
      // add the new session report to the current carnets data
      updateCarnets(prev => prev.map(c => c.id === carnet.id ? {...c, sessionReports: newSessionReports} : c ));
      await updateSubColDocument(names.clients, client.id, configurations.carnets, carnet.id, {...carnet, sessionReports: newSessionReports});
      setAlert({...alertMessage("C", "Session Report", true), onConfirm: () => alertAction(() => window.history.replaceState(null, null, `/lotus/${names.clients}/${client.id}/carnets/${carnet.order}/reports`)), onCancel: alertAction});
    } catch (error) {
      console.error("Error on adding new session report: ", error);
      setAlert({...alertMessage("E", "Session Report", false), onConfirm: alertAction, onCancel: alertAction});
    }

  }, [SessionReports, client, carnet, alertAction, updateCarnets, APIDate]);

  // --- DELETE ---
  const deleteSessionReport = useCallback( async (report) => {
    try { 
      const newSessionReports = SessionReports.filter(r => r.id !== report.id);
      updateCarnets(prev => prev.map(c => c.id === carnet.id ? {...c, sessionReports: newSessionReports} : c ));
      await updateSubColDocument(names.clients, client.id, configurations.carnets, carnet.id, {...carnet, sessionReports: newSessionReports});
      setAlert({...alertMessage("D", "Session Report", true), onConfirm: alertAction, onCancel: alertAction});
    } catch (error) {
      console.error("Error on deleting session report: ", error);
      setAlert({...alertMessage("E", "Session Report", false), onConfirm: alertAction, onCancel: alertAction});
    }
  }, [SessionReports, client, carnet, alertAction, updateCarnets]);

  // --- EXPORT ---
  const exportToXLSX = useCallback(() => {
    // check if there is a selected rows export the selected rows else export all rows
    const data = SessionReports.sort((a, b) => a.id - b.id).map(report => {
    // formating the data to be readable
    return {
      "ID": report.id,
      "Carnet Session": report.session,
      "Mental Health Report": report.reports.mental,
      "Physical Health Report": report.reports.physical,
      "Spiritual Health Report": report.reports.spiritual,
      "Energetic Health Report": report.reports.energetic,
      "Emotional Health Report": report.reports.emotional,

      "Registeration Date": dateFormater(carnet.createdAt),
      }
    });

    // exporting the data to xlsx
    return toXlsx(data, `${client.firstname} ${client.lastname}-${carnet.order}-jnaninyoga-carnet-reports`);

  }, [SessionReports, client, carnet]);


    // close the model when click outside the modal in the parent element
  const closeModal = e =>{
    if(e.target === e.currentTarget){
      setModal({type:"", data: null});
      setAlert({});
      window.history.replaceState(null, null, `/lotus/${names.clients}/${client.id}/carnets/${carnet.order}/reports`);
    }
  }

  return (
    <>
    <Helmet>
      <title>{`${client.firstname} ${client.lastname} - Jnanin Yoga Carnet Session Reports`}</title>
    </Helmet>
    <section className='w-[98%] h-[96%] flex items-start flex-col bg-yoga-white bg-texture texture-h-1 before:opacity-25 rounded-md print:bg-none print:before:hidden print:flex print:items-center print:justify-center'>
      <Box className="w-full max-w-full min-h-[250px] max-h-screen p-4 flex flex-col gap-4 print:hidden overflow-hidden">
        
        <header className='w-full h-fit flex justify-between items-center gap-2 z-[100]'>
          <section className='h-full flex justify-center items-center gap-4 z-[100]'>
            <div className='py-2 flex justify-center items-center gap-2 z-50'>
              <div className={`sm:h-10 sm:w-20 h-8 w-16 flex items-center justify-center transition-all duration-500 select-none z-[50]`}>
                <Icon
                  label="Lotus"
                  colors={{oc: "#ffffff", pc: "#fdc5ba"}}
                  height={90}
                  width={90}
                />
              </div>
              <h2 className='cinzel text-xl font-semibold z-[50]'>Sessions Report For <span className="cinzel text-yoga-green font-bold">{client.firstname} {client.lastname}</span>  Carnet: <span className="cinzel text-yoga-green font-bold">#{carnet.order}</span></h2>
            </div>
            <div className="h-full w-[5px] bg-yoga-red bg-opacity-20 z-50"></div>
            <button onClick={() => setModal({type:"CREATE", data: null})} title={`Add New Report To Carnet ${carnet.order}`} className={`h-full cinzel text-center uppercase font-semibold px-3 py-2 flex justify-center items-center outline outline-2 -outline-offset-[5px] bg-yoga-red outline-white hover:bg-yoga-red-dark active:scale-90 transition-all`}><i className="mr-2 fi fi-sr-book-medical text-yoga-black flex justify-center items-center"></i> Add New Report</button>
            <button type="button" onClick={exportToXLSX} className={`cinzel h-full min-w-max mx-1 px-3 py-2 text-center uppercase outline outline-2 -outline-offset-[5px] bg-yoga-green text-yoga-white outline-white hover:bg-yoga-green-dark active:scale-90 transition-all`}>Export All To Excel</button>
            <div className="h-full w-[5px] bg-yoga-red bg-opacity-20 z-100"></div>
          </section>

          <button onClick={onClose} title="Close This View" className={`cinzel text-center uppercase px-3 py-2 flex justify-center items-center outline outline-2 -outline-offset-[5px] bg-red-400 outline-white hover:bg-red-500 active:scale-90 transition-all`}><i className="fi fi-br-cross text-yoga-white flex justify-center items-center"></i></button>
        </header>

        <main className="p-4 w-full h-full flex flex-wrap gap-6 z-[80] print:bg-none print:before:hidden print:flex print:items-center print:justify-center">
          {SessionReports.length === 0 ? (
            <section className="w-full h-full flex justify-center items-center flex-col gap-4">
              <h2 className="cinzel text-2xl font-semibold text-center uppercase">No Reports Found</h2>
              <p className="cinzel text-xl text-center uppercase">There is no Session Reports sets for this Client Carnet yet</p>
            </section>
          ) : (
            SessionReports.map((report) => 
              <SessionReportCard
                key={`S${report.session}R${report.id}`} 
                report={report}
                carnet={carnet}
                client={client} 
                onShow={() => displayReports(report)}
              />
            )
          )}
        </main>
      </Box>

      {/* data modal */}
      { modal.type && (
        
        // --- CREATE ---
        modal.type == "CREATE" ?
        <section className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-40 flex justify-center items-center print:items-start z-[200000] print:h-screen print:w-screen print:bg-white print:bg-texture print:texture-v-1 print:before:opacity-20 print:py-6 overflow-hidden">
          <SessionReportCreate carnet={carnet} client={client} onSubmit={addSessionReport} onCancel={() => setModal({type:"", data: null})}/>
        </section> :

        // --- SHOW ---
        modal.type == "SHOW" &&
        <section onClick={closeModal} className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-40 print:bg-opacity-100 flex justify-center items-center print:fixed print:left-0 print:top-0 z-[200000] print:h-screen print:w-screen print:bg-white print:before:hidden">
          <SessionReportLookup 
            report={modal.data} 
            carnet={carnet} 
            client={client}
            onDelete={() => { 
              setAlert({
                ...alertMessage("D", "Session Report"),
                message: `Deleting this report will remove all the similar reports on this session  ${modal.data.session} from the carnet ${carnet.order}.`,
                onConfirm: () => alertAction(() => deleteSessionReport(modal.data)),
                onCancel: alertAction
              }) 
            }}/>
        </section>
      )}

      {/* Alert Message */}
      {alert.title && (
        <section className="absolute h-screen w-full top-0 left-0 bg-black bg-opacity-40 flex justify-center items-center z-[200100]">
          <Alert {...alert} />
        </section>
      )}
    </section>
    </>
  )
}
