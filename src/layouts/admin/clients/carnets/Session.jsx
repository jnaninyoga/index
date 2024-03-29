import { memo, useMemo, useState } from 'react'
import PropTypes from "prop-types";

const Session = memo(({ passed, isReported=false, clickAble=false, onSwitch }) => {
  const [isPassed, setIsPassed] = useState(passed);

  const reportedStripe = useMemo(() => "before:absolute before:top-[7%] before:left-[-20%] before:h-2 before:w-full before:bg-gray-500 before:rotate-[135deg] before:z-[60]", []);

  const handleClick = () => {
    if (!clickAble) return;
    setIsPassed((prev) => !prev);
    onSwitch(isPassed);
  }

  return (
    <li tabIndex={1} onClick={handleClick} title={`Session ${isPassed ? "Passed" : "Not Passed"}`} className={`z-50 relative w-full text-center font-semibold flex items-center justify-center aspect-square ${isPassed ? "bg-yoga-green-dark hover:bg-yoga-green focus:bg-yoga-green" : "bg-yoga-red-dark hover:bg-yoga-red focus:bg-yoga-red" } ${isReported && reportedStripe} hover:scale-105 focus:scale-105 outline outline-2 -outline-offset-[5px] outline-white active:scale-90 transition-all overflow-hidden`}>
      <i className={`fi fi-br-${isPassed ? "check" : "cross"} flex justify-center items-center text-xl text-yoga-white`}></i>
    </li>
  )
});

Session.displayName = "Session";


Session.propTypes = {
  passed: PropTypes.bool.isRequired,
  clickAble: PropTypes.bool,
  isReported: PropTypes.bool,
  onSwitch: PropTypes.func,
}

export default Session;