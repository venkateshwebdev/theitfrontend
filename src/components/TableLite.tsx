import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { UserType } from "../types/user.types";
import TableRow from "./TableRow";

type TableLiteProps = {
  tableData: Array<UserType>;
  openModal: (id?: string) => void;
  openDeleteModal: (id?: string) => void;
  isLoading: boolean;
  selectedIds: Array<string>;
  setSelectedIds: Dispatch<SetStateAction<Array<string>>>;
};

const TableLite = (props: TableLiteProps) => {
  const {
    tableData,
    openModal,
    openDeleteModal,
    isLoading,
    selectedIds,
    setSelectedIds,
  } = props;

  const [isAllSelected, setIsAllSelected] = useState(
    tableData.length === selectedIds.length
  );
  const [pageNum, setPageNum] = useState(0);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  useEffect(() => {
    if (tableData.length === selectedIds.length) setIsAllSelected(true);
    else setIsAllSelected(false);
    if (selectedIds.length)
      toast.success(selectedIds.length + " rows selected");
  }, [tableData, selectedIds]);

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    itemId: string
  ) => {
    const isChecked = event.target.checked;

    setSelectedIds((prevSelectedItems) => {
      if (isChecked) {
        // Item is not selected, add it
        return [...prevSelectedItems, itemId];
      } else {
        // Item is already selected, remove it
        return prevSelectedItems.filter((id) => id !== itemId);
      }
    });
  };

  const selectAllCheckboxes = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) setSelectedIds(tableData.map((item) => item.id));
    else setSelectedIds([]);
    setIsAllSelected(event.target.checked);
  };

  if (!isLoading && tableData.length === 0) {
    return (
      <div className="w-full h-full grid place-items-center text-center">
        <div className="flex gap-2 flex-col items-center">
          <h2 className="font-bold">
            No data till now! Add by clicking below button
          </h2>
          <button
            className="btn btn-secondary rounded-full"
            onClick={() => openModal()}
          >
            + Add row
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 grid place-items-center flex-1">
      <div className="flex flex-col gap-4">
        <div className="overflow-x-auto  max-h-[70vh]">
          <table className="table">
            {/* head */}
            <thead className="sticky top-0 bg-gray-800 dark:text-white z-10">
              <tr className="dark:bg-gray-800 overflow-hidden rounded-lg bg-gray-100">
                <th className="rounded-tl-full rounded-bl-full">
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-secondary"
                      checked={isAllSelected}
                      onChange={selectAllCheckboxes}
                    />
                  </label>
                </th>
                <th>ID</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Hobbies</th>
                <th className="rounded-tr-full rounded-br-full">Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData
                .slice(
                  pageNum * rowsPerPage,
                  pageNum * rowsPerPage + rowsPerPage
                )
                .map((item) => (
                  <TableRow
                    key={item.id}
                    includesSelectedItem={selectedIds.includes(item.id)}
                    isLoading={isLoading}
                    item={item}
                    handleCheckboxChange={handleCheckboxChange}
                    openDeleteModal={openDeleteModal}
                    openEditModal={openModal}
                  />
                ))}
            </tbody>
          </table>
        </div>
        {/* table footer */}
        <div className="flex justify-between items-center font-medium">
          <h2>
            Showing{" "}
            <span className="text-primary font-extrabold">{rowsPerPage}</span>{" "}
            results per page
          </h2>
          <div className="join">
            {[...Array(totalPages).keys()].map((item) => (
              <button
                key={item}
                className={`join-item btn ${
                  item === pageNum ? "btn-primary" : ""
                }`}
                onClick={() => setPageNum(item)}
              >
                {item + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableLite;
