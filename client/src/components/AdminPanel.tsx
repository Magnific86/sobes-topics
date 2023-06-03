import { useRef, useEffect, useState, FormEvent } from "react"
import { Modal } from "antd"
import OtpInput from "react-otp-input"
import { useAppContext } from "../context/MyContext"
import { toast } from "react-toastify"
import { setSignerToAdmin } from "../utils/actions/setSignerToAdmin"
import { getSignerFunc } from "../utils/actions/getSignerFunc"
import { SECRET_PASS } from "../utils/staticArrs/secretPass"

export const AdminPanel = () => {
  const { openAdminPanel, handleToggleAdminPanel, setIsAdmin } = useAppContext()
  const passRef = useRef(null)
  const [otp, setOtp] = useState("")

  const handleOtp = (otp: string) => {
    setOtp(otp)
  }

  const handleOtpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (otp === SECRET_PASS) {
      await setSignerToAdmin()
      const { signer, signedContract } = await getSignerFunc()
      const boolIsAdmin = await signedContract.admins(signer.getAddress())
      setIsAdmin(String(boolIsAdmin))
      boolIsAdmin ? toast.success("Вы стали админом") : toast.warn("Что-то пошло не так...")
      handleToggleAdminPanel()
      setOtp("")
    } else if (otp.length === 4 && otp !== SECRET_PASS) {
      toast.warn("неверно")
      setOtp("")
      setIsAdmin("false")
    }
  }

  return (
    <Modal centered open={openAdminPanel} onCancel={handleToggleAdminPanel} width={1200} footer={null}>
      <div className="adminPanel">
        <div>
          <h1>Чтобы иметь возможность удалять или изменять посты, введите пароль</h1>
          <p>(пароль: {SECRET_PASS})</p>
        </div>
        <form onSubmit={(e) => handleOtpSubmit(e)}>
          <OtpInput
            ref={passRef}
            shouldAutoFocus={true}
            numInputs={4}
            separator={""}
            className="otp-input"
            value={otp}
            onChange={handleOtp}
          />
          <button>далее</button>
        </form>
      </div>
    </Modal>
  )
}
