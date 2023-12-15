import { useRef, useState } from "react";
import CustomInput from "./CustomInput";
import { validateEmail } from "../utils/utils";

const EmailModal = (props: { onEmailSend: (email: string) => void }) => {
  const { onEmailSend } = props;
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string>();
  const modalCloseButtonRef = useRef<HTMLButtonElement | null>(null);

  const onOkClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      setEmailError("Enter a valid email");
      return;
    }
    onEmailSend(email);
    setEmail("");
    setEmailError(undefined);
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
              setEmailError(undefined);
            }}
          />
        </div>

        <div className="w-full flex justify-end">
          <div className="flex gap-2 self-end justify-end w-1/2">
            <form method="dialog" className="w-1/2">
              {/* if there is a button in form, it will close the modal */}
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
