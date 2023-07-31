import { useState } from "react";
import AddUserForm from "./AddUserForm";
import UpdateUserForm from "./UpdateUserForm";
import { useSelector } from "react-redux";

export default function Form() {
    const formId = useSelector((state) => state.app.client.formId);

    // Sử dụng state formData của AddUserForm hoặc UpdateUserForm
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        salary: "",
        date: "",
        status: "",
    });

    // Sử dụng condition để xác định xem nên render AddUserForm hay UpdateUserForm
    return (
        <div className="container mx-auto py-5">
            {formId ? (
                <UpdateUserForm formId={formId} formData={formData} setFormData={setFormData} />
            ) : (
                <AddUserForm formData={formData} setFormData={setFormData} />
            )}
        </div>
    );
}
