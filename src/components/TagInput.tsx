import React, { ChangeEvent, useState } from "react";
import CustomInput from "./CustomInput";
import Badge from "./Badge";
import { colorSchemes } from "../utils/utils";

/** Hobbies input ( input + hobbies list ) */
const TagInput = (props: {
  hobbies: Array<string>;
  addHobby: (hobby: string) => void;
  deleteHobby: (hobby: string) => void;
  errorMessage?: string;
}) => {
  const { hobbies, addHobby, deleteHobby, errorMessage } = props;

  const [hobby, setHobby] = useState("");

  const onAddHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // if hobby was typed. add that. else return;
    if (hobby) addHobby(hobby);
    setHobby("");
  };

  const onDeleteHandler = (hobby: string) => {
    deleteHobby(hobby);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-end">
        <CustomInput
          type="text"
          value={hobby}
          onChangeHandler={(e: ChangeEvent<HTMLInputElement>) =>
            setHobby(e.target.value)
          }
          name="hobby"
          placeholder="Swimming etc"
          label="Hobbies"
          errorMessage={errorMessage}
        />
        <button
          className={`btn btn-active w-20 btn-primary rounded-full ${
            errorMessage ? "mb-8" : ""
          }`}
          onClick={onAddHandler}
        >
          +
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {hobbies.map((hobby, index) => (
          <Badge
            key={hobby}
            isCancellable
            text={hobby}
            bordered
            colorString={colorSchemes[index % colorSchemes.length]} // assign the colors in circular order.
            onRemove={onDeleteHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default TagInput;
