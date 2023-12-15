import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TableLite from "./components/TableLite";
import { UserType } from "./types/user.types";
import EditForm from "./components/EditForm";
import DeleteModal from "./components/DeleteModal";
import ToastComponent from "./components/ToastComponent";
import toast from "react-hot-toast";
import EmailModal from "./components/EmailModal";

function App() {
  const [tableData, setTableData] = useState<Array<UserType>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // to reset the form data
  const emptyDataRow: UserType = {
    id: Date.now() + "",
    email: "",
    hobbies: [],
    name: "",
    phone: "",
  };
  // currently editing row. contains the data of the current open row in the modal.
  const [editingRow, setEditingRow] = useState(emptyDataRow);
  // currently deleting row. contains the id of the current selected row.
  const [deletingRowId, setDeletingRowId] = useState<string>();
  // stores list of selected ids via checkboxes. which we need to send via email
  const [selectedIds, setSelectedIds] = useState<Array<string>>([]);
  // backend URL. This can be changed from .env.local file.
  const backendURL = import.meta.env.VITE_APP_BACKEND_URL;

  /** Utility function to perform fetch actions via the api
   *  handles loading states
   *  handles error states
   */
  const fetchWithLoader = async (
    url: string,
    method: "get" | "post" | "put" | "delete" = "get",
    body?: any
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      toast.success("Action successful");
      return data;
    } catch (err) {
      console.log("Error reported ", err);
      toast.error("Error Requesting");
    } finally {
      setIsLoading(false);
    }
  };

  /** Loads all the rows */
  const loadRows = async () => {
    const data = await fetchWithLoader(backendURL);
    if (data) setTableData(data);
  };

  /** udpate the current row with entered data */
  const updateRow = async () => {
    // put request, passing edited / modified row data
    const data = await fetchWithLoader(
      `${backendURL}/${editingRow.id}`,
      "put",
      editingRow
    );
    // if not data, api failed so just return.
    if (!data) return;

    // locally updating the list with the newly updated data. for better UX.
    const copyOfTableData = [...tableData];
    const findIndex = copyOfTableData.findIndex(
      (data) => data.id === editingRow.id
    );
    if (findIndex !== -1) copyOfTableData[findIndex] = editingRow;
    setTableData(copyOfTableData);
  };

  /** delete the current selected row */
  const deleteRow = async () => {
    if (!deletingRowId) return;
    // delete request, passing row id
    const data = await fetchWithLoader(
      `${backendURL}/${deletingRowId}`,
      "delete"
    );
    // if not data, api failed so just return.
    if (!data) return;
    // locally updating the list with the newly updated data. for better UX.
    const filteredData = tableData.filter((data) => data.id !== deletingRowId);
    setTableData(filteredData);
    // remove this row if it is selectedIds.
    setSelectedIds((prevData) =>
      prevData.filter((item) => item !== deletingRowId)
    );
  };

  /** add new row */
  const addRow = async () => {
    // post request, with new row data.
    const data = await fetchWithLoader(backendURL, "post", editingRow);
    // locally updating the list with the newly updated data. for better UX.
    if (data) setTableData((prevData) => [...prevData, data]);
  };

  /** sends selected row ids and entered email to api */
  const sendRows = async (rowIds: Array<string>, toEmail: string) => {
    // post request, sending ids, and email
    const data = await fetchWithLoader(`${backendURL}/email`, "post", {
      selectedIds: rowIds,
      toEmail,
    });
    console.log("Response:: ", data);
  };

  /** calls sendRows with emiail */
  const onEmailSend = (email: string) => {
    sendRows(selectedIds, email);
  };

  /** based on the id we check whether we have to update or insert the row */
  const onEditOrSave = () => {
    // check if we have id already.
    const { id } = editingRow;
    const findIndex = tableData.findIndex((row) => row.id === id);
    if (findIndex !== -1) updateRow();
    else addRow();
  };

  useEffect(() => {
    // load rows first. when the page loads.
    loadRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** handler to open edit/ create modal */
  const openEditModal = (id?: string) => {
    // if licked on Add row. we have to create a new row. so setting the empty data.
    if (!id) setEditingRow(emptyDataRow);
    else {
      // else we load the data of the existing row to setup the form and edit.
      const findIndex = tableData.findIndex((row) => row.id === id);
      if (findIndex !== -1) setEditingRow(tableData[findIndex]);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (document?.getElementById?.("add_row_dialog") as any)?.showModal();
  };

  /** handler to open delete modal */
  const openDeleteModal = async (id?: string) => {
    if (id) setDeletingRowId(id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (document?.getElementById?.("delete_modal") as any)?.showModal();
  };

  /** handler to open email modal */
  const sendRowsHandler = () => {
    // daisyUI way to open the modal programatically ( from docs )
    (document?.getElementById?.("email_modal") as any)?.showModal();
  };

  return (
    <div className="p-4 flex flex-col h-[100vh]">
      <Header openModal={openEditModal} sendRows={sendRowsHandler} />
      <TableLite
        tableData={tableData}
        openModal={openEditModal}
        openDeleteModal={openDeleteModal}
        isLoading={isLoading}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
      <EditForm
        userData={editingRow}
        setUserData={setEditingRow}
        onSubmit={onEditOrSave}
      />
      <DeleteModal onDelete={deleteRow} />
      <EmailModal onEmailSend={onEmailSend} />
      <ToastComponent />
    </div>
  );
}

export default App;
