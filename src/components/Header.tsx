import DarkLightIcon from "./DarkLightIcon";
import Drawer from "./Drawer";

/** Header to hold ThemeSwitch, Add row and Send rows button */
const Header = (props: {
  openModal: (id?: string) => void;
  sendRows: () => void;
}) => {
  const { openModal, sendRows } = props;
  return (
    <div className="flex w-full">
      <Drawer />
      <div className=""></div>
      <div className="flex flex-1 align-middle justify-end gap-4">
        <DarkLightIcon />
        <button
          className="btn btn-primary rounded-full"
          onClick={() => openModal()}
        >
          + Add row
        </button>
        <button className="btn btn-primary rounded-full" onClick={sendRows}>
          Send rows
        </button>
      </div>
    </div>
  );
};

export default Header;
