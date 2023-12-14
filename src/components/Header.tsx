import DarkLightIcon from "./DarkLightIcon";

const Header = (props: {
  openModal: (id?: string) => void;
  sendRows: () => void;
}) => {
  const { openModal, sendRows } = props;
  return (
    <div className="flex align-middle justify-end gap-4">
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
  );
};

export default Header;
