import { useState } from "react"
import { DarkMode } from "../components/DarkMode"
import { IoIosAddCircle } from "react-icons/io"
import { InfoCircleOutlined } from "@ant-design/icons"
import { useWindowSize } from "../utils/hooks/useWindowSize"
import { useAppContext } from "../context/MyContext"
import { toast } from "react-toastify"
import { getSignerFunc } from "../utils/actions/getSignerFunc"

export const MyHeader = () => {
  const { handleToggleDrawer, handleToggleModal, handleToggleInfoDrawer, handleToggleAdminPanel, isAdmin, setIsAdmin } =
    useAppContext()
  const { width: w } = useWindowSize()
  const [signerAddress, setSignerAddress] = useState("")

  const handleCheckAdmin = async () => {
    try {
      const { signer, signedContract } = await getSignerFunc()
      setSignerAddress(String(await signer.getAddress()))
      const boolIsAdmin = await signedContract.admins(signer.getAddress())
      setIsAdmin(String(boolIsAdmin))
      boolIsAdmin ? toast.success("Велком бэк") : toast.warn("Не админ")
    } catch (e) {
      toast.error("Не удалось подключиться и проверить на админа")
    }
  }

  return (
    <header>
      <DarkMode />
      {isAdmin === "true" && (
        <button onClick={handleToggleDrawer}>
          {w > 768 ? "Добавить пост" : <IoIosAddCircle style={{ fontSize: w > 686 ? "26px" : "14px" }} />}
        </button>
      )}
      <button onClick={handleToggleModal}>{w > 686 ? "Оставить отзыв" : "Отзыв"}</button>
      <button onClick={handleToggleInfoDrawer}>
        <InfoCircleOutlined style={{ fontSize: w > 686 ? "26px" : "14px" }} />
      </button>
      {isAdmin === "disconnected" && <button onClick={handleCheckAdmin}>войти</button>}
      {isAdmin === "false" && <button onClick={handleToggleAdminPanel}>стать админом</button>}
      {isAdmin === "true" && (
        <div className="signerAddress">
          {signerAddress.slice(0, 3) + "..." + signerAddress.slice(signerAddress.length - 3, signerAddress.length)}
          <br />
          админ
        </div>
      )}
    </header>
  )
}
