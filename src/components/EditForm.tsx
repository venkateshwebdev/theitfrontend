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

/** form error format */
type EditFormErrorProps = {
  name?: string;
  phone?: string;
  email?: string;
  hobbies?: string;
};

const EditForm = (props: EditFormProps) => {
  const { userData, onSubmit, setUserData } = props;
  const [formError, setFormError] = useState<EditFormErrorProps>({});
  // references close button in modal. ( daisyUI lib requires this )
  const modalCloseButtonRef = useRef<HTMLButtonElement | null>(null);

  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
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
    // get the name of the input and the value associated with the input[name], update the value within the state.
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // clear the error for this particular input ( because if user starts typing we wont show the error messagse )
    setFormError((prevData) => ({
      ...prevData,
      [name]: undefined,
    }));
  };

  const addHobby = (hobby: string) => {
    // if the hobby is already included. dont add it again. just return.
    if (userData.hobbies.includes(hobby)) {
      toast.error("This hobby is already present. Enter another");
      setFormError((prevData) => ({
        ...prevData,
        hobbies: "This hobby is already present. Enter another",
      }));
      return;
    }
    // add the new hobby to the list.
    setUserData((prevData) => ({
      ...prevData,
      hobbies: [...prevData.hobbies, hobby],
    }));
    // clear any error associated with this hobbies input.
    setFormError((prevData) => ({
      ...prevData,
      hobbies: undefined,
    }));
  };
  const deleteHobby = (hobby: string) => {
    // directly remove the hobby from the hobbies list.
    setUserData((prevData) => ({
      ...prevData,
      hobbies: prevData.hobbies.filter((item) => item !== hobby),
    }));
  };

  const onCloseModal = (event?: React.MouseEvent<HTMLButtonElement>) => {
    // to prevent DaisyUI default event. (from docs)
    event?.preventDefault();
    // clear all errors and close via ref click.
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
              placeholder="+91 1234567890"
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
            {/* if there is a button in form, it will close the modal ( DAISYUI ) */}
            <div className="flex gap-2 w-1/2 self-end justify-end">
              <button className="btn w-1/2 rounded-full" onClick={onCloseModal}>
                Close
              </button>
              <button ref={modalCloseButtonRef} className="hidden"></button>
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
