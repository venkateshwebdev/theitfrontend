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
  const emptyDataRow: UserType = {
    id: Date.now() + "",
    email: "",
    hobbies: [],
    name: "",
    phone: "",
  };
  const [editingRow, setEditingRow] = useState(emptyDataRow);
  const [deletingRowId, setDeletingRowId] = useState<string>();
  const [selectedIds, setSelectedIds] = useState<Array<string>>([]);
  const backendURL = import.meta.env.VITE_APP_BACKEND_URL;

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
      console.log("in catch ", err);
      toast.error("Error Requesting");
    } finally {
      setIsLoading(false);
    }
  };

  const loadRows = async () => {
    const data = await fetchWithLoader(backendURL);
    console.log("this is data ", data);
    if (data) setTableData(data);
  };
  const updateRow = async () => {
    console.log("the whole data is ", editingRow);
    const data = await fetchWithLoader(
      `${backendURL}/${editingRow.id}`,
      "put",
      editingRow
    );
    console.log("got new dataq ", data);
    if (!data) return;
    const copyOfTableData = [...tableData];
    const findIndex = copyOfTableData.findIndex(
      (data) => data.id === editingRow.id
    );
    if (findIndex !== -1) copyOfTableData[findIndex] = editingRow;
    setTableData(copyOfTableData);
  };
  const deleteRow = async () => {
    if (!deletingRowId) return;
    const data = await fetchWithLoader(
      `${backendURL}/${deletingRowId}`,
      "delete"
    );
    console.log("this is data ", data);

    if (!data) return;
    // update state locally.
    const filteredData = tableData.filter((data) => data.id !== deletingRowId);
    setTableData(filteredData);
  };
  const addRow = async () => {
    console.log("the whole data is ", editingRow);
    const data = await fetchWithLoader(backendURL, "post", editingRow);
    console.log("got new dataq ", data);
    if (data) setTableData((prevData) => [...prevData, data]);
  };
  const sendRows = async (rowIds: Array<string>, toEmail: string) => {
    console.log("all rows ", rowIds, toEmail);
    const data = await fetchWithLoader(`${backendURL}/email`, "post", {
      selectedIds,
      toEmail,
    });
    console.log("this is data ", data);
  };

  const onEditOrSave = () => {
    // check if we have id already.
    const { id } = editingRow;
    const findIndex = tableData.findIndex((row) => row.id === id);
    if (findIndex !== -1) updateRow();
    else addRow();
  };

  useEffect(() => {
    loadRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openEditModal = (id?: string) => {
    if (!id) setEditingRow(emptyDataRow);
    else {
      const findIndex = tableData.findIndex((row) => row.id === id);
      if (findIndex !== -1) setEditingRow(tableData[findIndex]);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (document?.getElementById?.("add_row_dialog") as any)?.showModal();
  };

  const openDeleteModal = async (id?: string) => {
    if (id) setDeletingRowId(id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (document?.getElementById?.("delete_modal") as any)?.showModal();
  };

  const sendRowsHandler = () => {
    (document?.getElementById?.("email_modal") as any)?.showModal();
  };

  const onEmailSend = (email: string) => {
    sendRows(selectedIds, email);
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
