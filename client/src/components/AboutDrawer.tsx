import { FC } from "react";
import { Drawer } from "antd";
import { useAppContext } from "../context/MyContext";

export const AboutDrawer: FC = () => {
  const { openInfoDrawer, handleToggleInfoDrawer } = useAppContext();

  return (
    <Drawer
      title="Fill in form to add new post"
      placement="bottom"
      width={800}
      height={"80%"}
      open={openInfoDrawer}
      onClose={handleToggleInfoDrawer}
      headerStyle={{ display: "none" }}
      style={{ backgroundColor: "red" }}
    >
      <div className="leftSideDrawer">
        <p>
          Пока не придумал описание сюда, в будущем просто какую то инфу принцып
          работы и какие то ссылки
        </p>
      </div>
    </Drawer>
  );
};
