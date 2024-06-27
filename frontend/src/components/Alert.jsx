import { useAppContext } from "../context/AppContext";


const Alert = () => {
  const { alertText, alertType } = useAppContext();
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    >
      <strong className="font-bold">{alertText}</strong>
      <span className="block sm:inline">  {alertType}</span>
    </div>
  );
};

export default Alert;
