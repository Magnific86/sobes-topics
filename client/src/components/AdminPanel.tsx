import { useRef, useEffect, useState, FormEvent } from "react";
import { Modal } from "antd";
import OtpInput from "react-otp-input";
import { useAppContext } from "../context/MyContext";
import { toast } from "react-toastify";
import { setSignerToAdmin } from "../utils/web3Actions/setSignerToAdmin";

export const AdminPanel = () => {
  const { openAdminPanel, handleToggleAdminPanel, setIsAdmin } =
    useAppContext();
  const passRef = useRef(null);
  const [otp, setOtp] = useState("");

  const SECRET_PASS = "1234";

  useEffect(() => {
    passRef.current?.focus();
  }, [openAdminPanel]);

  const handleOtp = (otp: string) => {
    setOtp(otp);
  };

  const handleOtpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp === SECRET_PASS) {
      await setSignerToAdmin();
      setIsAdmin("true");
      toast.success("Вы стали админом");
      handleToggleAdminPanel();
      setOtp("");
    } else if (otp.length === 4 && otp !== SECRET_PASS) {
      toast.warn("неверно");
      setOtp("");
    }
  };

  return (
    <Modal
      centered
      open={openAdminPanel}
      onCancel={handleToggleAdminPanel}
      width={1200}
      footer={null}
    >
      <div className="adminPanel">
        <h1>
          Чтобы иметь возможность удалять или изменять посты, введите пароль
        </h1>
        <p>(пароль: {SECRET_PASS})</p>
        <form onSubmit={(e) => handleOtpSubmit(e)}>
          <OtpInput
            shouldAutoFocus={true}
            numInputs={4}
            separator={""}
            className="otp-input"
            value={otp}
            onChange={handleOtp}
          />
          <button>submit</button>
        </form>
      </div>
    </Modal>
  );
};
