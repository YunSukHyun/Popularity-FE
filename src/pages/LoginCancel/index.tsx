import { useEffect } from "react";

const LoginCancel = () => {
  useEffect(() => {
    window.close();
  }, []);
  return <div>LoginCancel</div>;
};
export default LoginCancel;
