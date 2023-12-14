import { UserType } from "../types/user.types";
import Badge from "./Badge";
import { colorSchemes } from "../utils/utils";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

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

  useEffect(() => {
    if (tableData.length === selectedIds.length) setIsAllSelected(true);
    else setIsAllSelected(false);
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

  return (
    <div className="px-8 grid place-items-center flex-1">
      <div className="overflow-x-auto  max-h-[70vh]">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
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
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => {
              return (
                <tr
                  key={item.id}
                  className={`${
                    isLoading ? "skeleton opacity-100 blur-sm" : ""
                  }`}
                >
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={selectedIds.includes(item.id)}
                        onChange={(event) =>
                          handleCheckboxChange(event, item.id)
                        }
                      />
                    </label>
                  </th>
                  <td>{item.id}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      {/* <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src="https://i.pravatar.cc/300"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div> */}
                      <div>
                        <div className="font-bold">{item.name}</div>
                        <span className="badge badge-ghost badge-sm">
                          {item.hobbies.length} hobbies
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>{item.phone}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">
                      {item.email}
                    </button>
                  </th>
                  <th>
                    <div className="flex flex-wrap w-96 gap-2">
                      {item.hobbies.map((hobby, index) => (
                        <Badge
                          key={hobby}
                          text={hobby}
                          bordered
                          colorString={
                            colorSchemes[index % colorSchemes.length]
                          }
                        />
                      ))}
                    </div>
                  </th>
                  <th>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm rounded-full"
                        onClick={() => openModal(item.id)}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => openDeleteModal(item.id)}
                        className="btn btn-sm btn-error btn-outline rounded-full"
                      >
                        Delete
                      </button>
                    </div>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableLite;
