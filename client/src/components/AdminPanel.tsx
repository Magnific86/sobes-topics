import { useRef, useEffect, useState } from "react";
import { Modal } from "antd";
import OtpInput from "react-otp-input";
import { useAppContext } from "../context/MyContext";
import { toast } from "react-toastify";

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

  useEffect(() => {
    if (otp === SECRET_PASS) {
      setIsAdmin(true);
      toast.success("Меня взломали");
      handleToggleAdminPanel();
      setOtp("");
    } else if (otp.length === 4 && otp !== SECRET_PASS) {
      toast.warn("неверно");
      setOtp("");
    }
  }, [otp]);

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
        <OtpInput
          shouldAutoFocus={true}
          numInputs={4}
          separator={""}
          className="otp-input"
          value={otp}
          onChange={handleOtp}
        />
      </div>
    </Modal>
  );
};
