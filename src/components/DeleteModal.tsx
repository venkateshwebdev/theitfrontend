/** Delete modal, when delete on row clicked */
const DeleteModal = (props: { onDelete: () => void }) => {
  const { onDelete } = props;
  return (
    <dialog id="delete_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Are you sure to delete ?</h3>
        <p className="py-4">You are about to delete this row. are you sure ?</p>
        <div className="w-full flex justify-end">
          <div className="flex gap-2 self-end justify-end w-1/2">
            <form method="dialog" className="w-1/2">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn w-full rounded-full">Close</button>
            </form>
            <form method="dialog" className="w-1/2">
              <button
                className="btn w-full btn-secondary rounded-full"
                onClick={onDelete}
              >
                Ok
              </button>
            </form>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default DeleteModal;
