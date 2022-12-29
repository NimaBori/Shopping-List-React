import { useEffect, useState } from "react";

const Alert = ({ msg, type }) => {
  const [renderIsOn, setRenderIsOn] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRenderIsOn(false);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [renderIsOn]);

  return (
    <>
      {renderIsOn && (
        <p
          className={
            type === "danger" ? "text-white bg-danger" : "text-black bg-success"
          }
        >
          {msg}
        </p>
      )}
    </>
  );
};

export default Alert;
