
// Controller
import Users from "../model/User";

// GET: http://localhost:3000/api/users
export async function getUsers(req, res) {
    try {
        const users = await Users.find({});
        if (!users) return res.status(404).json({error: "Data Not Found"});
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ error: "Error While Fetching Data" });
    }
}

// GET: http://localhost:3000/api/users/userId
export async function getUser(req, res) {
    try {
        const { userId } = req.query
        if (userId) {
            const user = await Users.findById(userId);
            return res.status(200).json(user);
        }
        res.status(404).json({error: "User Not Selected...!"})
    } catch (error) {
        res.status(404).json({error: "error: Cannot get the User...!"})
    }
}

// POST: http://localhost:3000/api/users
export async function postUser(req, res) {
    try {
        const formData = req.body;
        if (!formData) return res.status(404).json({ error: "Form Data Not Provided...!" });

        const newUser = await Users.create(formData);  // Sử dụng await để chờ kết quả trả về
        return res.status(200).json(newUser);
    } catch (error) {
        return res.status(404).json({error})
    }
}

// PUT: http://localhost:3000/api/users/userId
export async function putUser(req, res) {
    try {
        const { userId } = req.query;
        const formData = req.body;
        if (userId && formData) {
            const user = await Users.findByIdAndUpdate(userId, formData);
            res.status(200).json(user)
        }
        return res.status(404).json({error: "User Not Selected...!"});
    } catch (error) {
        return res.status(404).json({ error: "Error While Updating the Data...!" })
    }
}

// DELETE: http://localhost:3000/api/users/userId
export async function deleteUser(req, res) {
    try {
        const { userId } = req.query;
        if (userId) {
            const user = await Users.findByIdAndDelete(userId)
            return res.status(200).json({Deleted: userId})
        }
        res.status(404).json({error: "User Not Selected...!"})
    } catch (error) {
        return res.status(404).json({ error: "Error While Deleting the User...!"})
    }
}


