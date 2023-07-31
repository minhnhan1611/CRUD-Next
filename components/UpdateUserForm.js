import { getUser, getUsers, updateUser } from "@/lib/Helper";
import { BiBrush } from 'react-icons/bi';
import { useMutation, useQuery, useQueryClient } from "react-query";
import React, { useState, useEffect } from 'react';

export default function UpdateUserForm({ formId }) {
    const queryClient = useQueryClient();
    const { isLoading, isError, data } = useQuery(['users', formId], () => getUser(formId));

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        salary: "",
        date: "",
        status: "",
    });

    useEffect(() => {
        if (!isLoading && !isError && data) {
            const { name, email, salary, date, status } = data;
            const [firstname, lastname] = name ? name.split(' ') : ['', ''];
            setFormData({ firstname, lastname, email, salary, date, status });
        }
    }, [isLoading, isError, data]);

    const validateForm = () => {
        const emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const salaryPattern = /([0-9]{1,9})[,]*([0-9]{3,3})*[,]*([0-9]{1,3})*[.]*([0-9]{2,2})*/

        if (formData.firstname.trim() === "") {
            alert('Please enter your FirstName!');
            return false;
        }
        if (formData.lastname.trim() === "") {
            alert('Please enter your LastName!');
            return false;
        }
        if (formData.email.trim() === "" || !emailPattern.test(formData.email)) {
            alert('Email address is not valid!');
            return false;
        }
        if (!salaryPattern.test(formData.salary)) {
            alert('Salary is not valid!');
            return false;
        }
        if (formData.date.trim() === "") {
            alert('Please enter your Date!');
            return false;
        }
        if (formData.status.trim() === "") {
            alert('Please enter your Status!');
            return false;
        }
        return true;
    }
    console.log(formData)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            const userName = `${formData.firstname} ${formData.lastname}`;
            const updated = { ...data, ...formData, name: userName };
            await UpdateMutation.mutateAsync(updated);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const UpdateMutation = useMutation((newData) => updateUser(formId, newData), {
        onSuccess: async (data) => {
            queryClient.prefetchQuery('users', getUsers);
        },
    });

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error...</div>

    return (
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 w-4/6 gap-4">
            <div className="input-type">
                <input type="text" onChange={handleChange} value={formData.firstname} name="firstname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Tên" />
            </div>
            <div className="input-type">
                <input type="text" onChange={handleChange} value={formData.lastname} name="lastname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Họ" />
            </div>
            <div className="input-type">
                <input type="text" onChange={handleChange} value={formData.email} name="email" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Email" />
            </div>
            <div className="input-type">
                <input type="text" onChange={handleChange} value={formData.salary} name="salary" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Lương" />
            </div>
            <div className="input-type">
                <input type="date" onChange={handleChange} value={formData.date} name="date" className="border px-5 py-3 focus:outline-none rounded-md" placeholder="Ngày" />
            </div>

            <div className="flex gap-10 items-center">
                <div className="form-check">
                    <input type="radio" onChange={handleChange} checked={formData.status === "Active"} name="status" value="Active" id="radioDefault1" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                    <label htmlFor="radioDefault1" className="inline-block text-gray-800">
                        Active
                    </label>
                </div>
                <div className="form-check">
                    <input type="radio" onChange={handleChange} checked={formData.status !== "Active"} name="status" value="Inactive" id="radioDefault2" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                    <label htmlFor="radioDefault2" className="inline-block text-gray-800">
                        UnActive
                    </label>
                </div>
            </div>
            <button className="flex justify-center text-md w-2/6 bg-yellow-500 text-white px-4 py-2 border rounded-md hover:bg-yellow-100 hover:border-yellow-500 hover:text-yellow-500">Update<span className="px-1"><BiBrush size={24}></BiBrush></span></button>
        </form>
    );
}