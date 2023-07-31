import { useState } from "react";
import { BiPlus } from 'react-icons/bi';
import Success from "./Success";
import { useQueryClient,useMutation } from "react-query";
import { addUser, getUsers } from "@/lib/Helper";

export default function AddUserForm({formData,setFormData}) {

    const queryClient = useQueryClient();
    const addMutation = useMutation(addUser, {
        onSuccess: () => {
            queryClient.prefetchQuery("users", getUsers)
        }
    });
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

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
        if (formData.salary.trim() === "" || !salaryPattern.test(formData.salary)) {
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
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            let { firstname, lastname, email, salary, date, status } = formData;

            const model = {
                name: `${firstname} ${lastname}`,
                avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg`,
                email,
                salary,
                date,
                status: status ?? "Active",
            };

            addMutation.mutate(model);
            setFormData({
                firstname: "",
                lastname: "",
                email: "",
                salary: "",
                date: "",
                status: "",
            });
        };
    };

    if(addMutation.isLoading) return <div>Loading!</div>
    if (addMutation.isError) return <div>{addMutation.error.message}</div>
    if (addMutation.isSuccess) return <Success message="Form Data Added Successful!" />;
    

    return (
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 w-4/6 gap-4">
            <div className="input-type">
                <input type="text" onChange={handleChange} name="firstname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="FirstName" />
            </div>
            <div className="input-type">
                <input type="text" onChange={handleChange} name="lastname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="LastName" />
            </div>
            <div className="input-type">
                <input type="text" onChange={handleChange} name="email" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Email" />
            </div>
            <div className="input-type">
                <input type="text" onChange={handleChange} name="salary" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Salary" />
            </div>
            <div className="input-type">
                <input type="date" onChange={handleChange} name="date" className="border px-5 py-3 focus:outline-none rounded-md" placeholder="Date" />
            </div>


            <div className="flex gap-10 items-center">
                <div className="form-check">
                    <input type="radio" onChange={handleChange} name="status" value="Active" id="radioDefault1" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                    <label htmlFor="radioDefault1" className="inline-block text-gray-800">
                        Active
                    </label>
                </div>
                <div className="form-check">
                    <input type="radio" onChange={handleChange} name="status" value="Inactive" id="radioDefault2" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                    <label htmlFor="radioDefault2" className="inline-block text-gray-800">
                        Inactive
                    </label>
                </div>
            </div>
            <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-green-100 hover:border-green-500 hover:text-green-500">
                Add <span className="px-1"><BiPlus size={24}></BiPlus></span>
            </button>        
            </form>
    );
}
