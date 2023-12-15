import { useRef, useState } from "react";
import CustomInput from "./CustomInput";
import { validateEmail } from "../utils/utils";

/** Email modal when Send rows clicked */
const EmailModal = (props: { onEmailSend: (email: string) => void }) => {
  const { onEmailSend } = props;
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string>();
  // for closing daisyUI modal. similar to the comments in EditForm
  const modalCloseButtonRef = useRef<HTMLButtonElement | null>(null);

  const onOkClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // if email not valid. show error and return
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      setEmailError("Enter a valid email");
      return;
    }
    // else send the email to the next steps and clear all the errors and close the modal.
    onEmailSend(email);
    setEmail("");
    setEmailError(undefined);
    // daisyUI way to close the modal programatically ( from docs )
    modalCloseButtonRef.current?.click();
  };

  return (
    <dialog id="email_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Send an Email ?</h3>
        <p className="py-4">
          You are about to send the selected ids to the below email
        </p>
        <div className="mb-4">
          <CustomInput
            label="Email"
            name="email"
            placeholder="Enter email address"
            type="email"
            value={email}
            errorMessage={emailError}
            onChangeHandler={(e) => {
              setEmail(e.target.value);
              // clear any error message associated with the email while typing.
              setEmailError(undefined);
            }}
          />
        </div>

        <div className="w-full flex justify-end">
          <div className="flex gap-2 self-end justify-end w-1/2">
            <form method="dialog" className="w-1/2">
              {/* if there is a button in form, it will close the modal ( daisy UI ) */}
              <button className="btn w-full rounded-full">Close</button>
            </form>
            <form method="dialog" className="w-1/2">
              <button
                className="btn w-full btn-secondary rounded-full"
                onClick={onOkClickHandler}
              >
                Ok
              </button>
            </form>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button ref={modalCloseButtonRef}>close</button>
      </form>
    </dialog>
  );
};

export default EmailModal;
