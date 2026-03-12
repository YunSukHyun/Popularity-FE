import { useEffect, useState } from "react";

const LoginSuccess = () => {
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    // const params = new URLSearchParams(window.location.search);
    // setUser({
    //   name: params.get("name"),
    //   email: params.get("email"),
    //   picture: params.get("picture"),
    //   role: params.get("role"),
    // });

    if (countdown > 0) {
      if (countdown === 4) window.opener.location.reload();
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      window.close();
    }
  }, [countdown]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>로그인에 성공하였습니다. 이 페이지는 {countdown}초 후에 닫힙니다.</h2>
    </div>
  );
};

export default LoginSuccess;
