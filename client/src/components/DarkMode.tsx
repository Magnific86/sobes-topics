import { useAppContext } from "../context/MyContext"

export const DarkMode = () => {
  const { theme, handleToggleTheme } = useAppContext()
  return <button onClick={handleToggleTheme}>{theme === "dark" ? "темная" : "светлая"}</button>
}
