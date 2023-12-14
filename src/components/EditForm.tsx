import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { UserType } from "../types/user.types";
import CustomInput from "./CustomInput";
import TagInput from "./TagInput";

type EditFormProps = {
  userData: UserType;
  setUserData: Dispatch<SetStateAction<UserType>>;
  onSubmit: () => void;
};

const EditForm = (props: EditFormProps) => {
  const { userData, onSubmit, setUserData } = props;

  const onSubmitHandler = (event: FormEvent) => {
    // event.preventDefault();
    console.log(event.target);
    // if no errors. then only submit.
    onSubmit();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("name value", name, value);
  };

  const addHobby = (hobby: string) => {
    if (userData.hobbies.includes(hobby)) {
      console.log("already we have");
      return;
    }
    setUserData((prevData) => ({
      ...prevData,
      hobbies: [...prevData.hobbies, hobby],
    }));
  };
  const deleteHobby = (hobby: string) => {
    setUserData((prevData) => ({
      ...prevData,
      hobbies: prevData.hobbies.filter((item) => item !== hobby),
    }));
  };

  return (
    <dialog id="add_row_dialog" className="modal backdrop-blur-sm">
      <div className="modal-box rounded-3xl">
        <h3 className="font-bold text-lg">Add new row</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <form method="dialog" className="flex flex-col w-full gap-1">
            <CustomInput
              type="text"
              placeholder="Type here"
              label="Name"
              name="name"
              value={userData.name}
              onChangeHandler={handleChange}
            />
            <CustomInput
              type="text"
              placeholder="1234567890"
              value={userData.phone}
              label="Phone number"
              name="phone"
              onChangeHandler={handleChange}
            />
            <CustomInput
              type="email"
              value={userData.email}
              placeholder="email@example.com"
              label="Email address"
              name="email"
              onChangeHandler={handleChange}
            />
            <TagInput
              hobbies={userData?.hobbies}
              addHobby={addHobby}
              deleteHobby={deleteHobby}
            />
            {/* if there is a button in form, it will close the modal */}
            <div className="flex gap-2 w-1/2 self-end justify-end">
              <button className="btn w-1/2 rounded-full">Close</button>
              <button
                className="btn w-1/2 btn-secondary rounded-full"
                onClick={onSubmitHandler}
              >
                Ok
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default EditForm;
