import { ChangeEvent, useState } from "react";
import { UserType } from "../types/user.types";
import { colorSchemes } from "../utils/utils";
import Badge from "./Badge";

type TableRowProps = {
  item: UserType;
  isLoading: boolean;
  /** whether the current is selected or not */
  includesSelectedItem: boolean;
  handleCheckboxChange: (
    event: ChangeEvent<HTMLInputElement>,
    itemId: string
  ) => void;
  openEditModal: (id: string) => void;
  openDeleteModal: (id: string) => void;
};
const TableRow = (props: TableRowProps) => {
  const {
    item,
    isLoading,
    includesSelectedItem,
    handleCheckboxChange,
    openEditModal,
    openDeleteModal,
  } = props;
  const [isHovered, setIsHovered] = useState<string>();

  return (
    <tr
      key={item.id}
      className={`${isLoading ? "skeleton opacity-100 blur-sm" : ""} ${
        includesSelectedItem ? "dark:bg-gray-900 bg-gray-100" : ""
      } ${
        item.id === isHovered ? "opacity-40" : ""
      } group transition-all duration-500`}
    >
      <th>
        <label>
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={includesSelectedItem}
            onChange={(event) => handleCheckboxChange(event, item.id)}
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
        <button className="btn btn-ghost btn-xs">{item.email}</button>
      </th>
      <th>
        <div className="flex flex-wrap w-96 gap-2">
          {/* we are only showing first 12 hobbies. since they takes much space if added more. */}
          {item.hobbies.slice(0, 12).map((hobby, index) => (
            <Badge
              key={hobby}
              text={hobby}
              bordered={!includesSelectedItem}
              colorString={colorSchemes[index % colorSchemes.length]}
            />
          ))}
          {/* we are only showing the remaining count. */}
          {item.hobbies.length - 12 > 0 && (
            <h2 className="opacity-70">+{item.hobbies.length - 12} more</h2>
          )}
        </div>
      </th>
      <th>
        <div className="flex gap-2">
          <button
            className="btn btn-sm rounded-full"
            onClick={() => openEditModal(item.id)}
          >
            Update
          </button>
          <button
            onClick={() => openDeleteModal(item.id)}
            onMouseEnter={() => setIsHovered(item.id)}
            onMouseLeave={() => setIsHovered(undefined)}
            className="btn btn-sm btn-error btn-outline rounded-full"
          >
            Delete
          </button>
        </div>
      </th>
    </tr>
  );
};

export default TableRow;
