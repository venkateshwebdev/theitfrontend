import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { UserType } from "../types/user.types";
import CustomInput from "./CustomInput";
import TagInput from "./TagInput";
import toast from "react-hot-toast";
import { validateEmail, validatePhoneNumber } from "../utils/utils";

type EditFormProps = {
  userData: UserType;
  setUserData: Dispatch<SetStateAction<UserType>>;
  onSubmit: () => void;
};

type EditFormErrorProps = {
  name?: string;
  phone?: string;
  email?: string;
  hobbies?: string;
};

const EditForm = (props: EditFormProps) => {
  const { userData, onSubmit, setUserData } = props;
  const [formError, setFormError] = useState<EditFormErrorProps>({});
  const modalCloseButtonRef = useRef<HTMLButtonElement | null>(null);

  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(event.target);
    // if no errors. then only submit.
    // check userData -> name ( should not be empty )
    // check userData -> phone ( should not be empty ) and should match the regex
    //  check userData -> email ( should not be empty ) and should match the regex
    // check userData -> hobbies ( should not be empty )

    const isEmailValid = validateEmail(userData.email);
    const isPhoneValid = validatePhoneNumber(userData.phone);
    const isNameValid = userData.name.length > 4;
    const isHobbiesValid = userData.hobbies.length > 0;
    const errorObj: EditFormErrorProps = {};

    if (!isEmailValid) errorObj.email = "Enter a valid email";
    if (!isPhoneValid)
      errorObj.phone = "Enter a valid phone number Eg. +91 9000000000";
    if (!isNameValid)
      errorObj.name = "Name shoulb be atleast greater than length 4";
    if (!isHobbiesValid) errorObj.hobbies = "Enter atleast one hobby";

    setFormError(errorObj);

    // on Successful submission clear Error Object
    if (isEmailValid && isPhoneValid && isNameValid && isHobbiesValid) {
      onSubmit();
      onCloseModal();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormError((prevData) => ({
      ...prevData,
      [name]: undefined,
    }));
    console.log("name value", name, value);
  };

  const addHobby = (hobby: string) => {
    if (userData.hobbies.includes(hobby)) {
      console.log("already we have");
      toast.error("This hobby is already present. Enter another");
      setFormError((prevData) => ({
        ...prevData,
        hobbies: "This hobby is already present. Enter another",
      }));
      return;
    }
    setUserData((prevData) => ({
      ...prevData,
      hobbies: [...prevData.hobbies, hobby],
    }));
    setFormError((prevData) => ({
      ...prevData,
      hobbies: undefined,
    }));
  };
  const deleteHobby = (hobby: string) => {
    setUserData((prevData) => ({
      ...prevData,
      hobbies: prevData.hobbies.filter((item) => item !== hobby),
    }));
  };

  const onCloseModal = (event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    setFormError({});
    modalCloseButtonRef.current?.click();
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
              errorMessage={formError.name}
              onChangeHandler={handleChange}
            />
            <CustomInput
              type="text"
              placeholder="1234567890"
              value={userData.phone}
              label="Phone number"
              name="phone"
              errorMessage={formError.phone}
              onChangeHandler={handleChange}
            />
            <CustomInput
              type="email"
              value={userData.email}
              placeholder="email@example.com"
              label="Email address"
              name="email"
              errorMessage={formError.email}
              onChangeHandler={handleChange}
            />
            <TagInput
              hobbies={userData?.hobbies}
              addHobby={addHobby}
              deleteHobby={deleteHobby}
              errorMessage={formError.hobbies}
            />
            {/* if there is a button in form, it will close the modal */}
            <div className="flex gap-2 w-1/2 self-end justify-end">
              <button className="btn w-1/2 rounded-full" onClick={onCloseModal}>
                Close
              </button>
              <button ref={modalCloseButtonRef} className="hidden">
                hidden close button
              </button>
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
