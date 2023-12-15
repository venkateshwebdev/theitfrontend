import DarkLightIcon from "./DarkLightIcon";

const Header = (props: {
  openModal: (id?: string) => void;
  sendRows: () => void;
}) => {
  const { openModal, sendRows } = props;
  return (
    <div className="flex w-full">
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
