const Register = require('../Model/TodoModel')
const Task = require('../Model/TaskModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { Response, errorResponse } = require('../Constant/Constant')
const { generateToken, generateRefreshToken } = require('../Constant/JwtToken')

const createUser = async (req, res, next) => {
    try {
        const { email, password, gender, Qualification, language } = req.body || {}
        if (!email || !password || !gender || !Qualification) {
            return errorResponse(res, 400, 'email,password,gender,qualification mandetory')
        }

        const existingUser = await Register.findOne({ email });
        if (existingUser) {
            return errorResponse(res, 409, 'Email already exist')
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await Register.create({
            email,
            password: hashPassword,
            gender,
            Qualification,
            language
        })


        return Response(res, 201, 'User Register Succesfully')


    } catch (err) {
        console.log(err.message)
        next(err)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body || {}
        if (!email || !password) {
            return errorResponse(res, 400, 'Please enter email and password')
        }
        const user = await Register.findOne({ email })
        if (!user) {
            return Response(res, 404, 'User not found')
        }
        const hashPass = user.password
        const isValid = await bcrypt.compare(password, hashPass)

        if (isValid) {
            const token = generateToken(user)
            const refToken = generateRefreshToken(user)
            return Response(res, 200, 'Login Successfull', { authToken: token, RefreshToken: refToken })
        } else {
            return errorResponse(res, 401, 'Invalid password')
        }
    } catch (err) {
        console.log(err.message)
        next(err)
    }
}

const createTask = async (req, res, next) => {
    try {
        const { task, time,user } = req.body
        if (!task || !time ) {
            return errorResponse(res, 400, 'Please enter  task and time')
        }
        const newtask = await Task.create({ task, time,user })
        if (newtask) {
            return Response(res, 201, 'New Task Added')
        }

    } catch (err) {
        console.log(err.message)
        next()
    }
}

const showTask = async (req, res, next) => {
    try {
        const {user}=req.body
        const result = await Task.find({user:user})
        if (result) {
            const data = result.map((result) => {
                return (
                    {
                        id: result._id,
                        task: result.task,
                        time: result.time
                    }
                )
            })
            return Response(res, 200, 'Task retrived', data)
        } else {
            return errorResponse(res, 500, 'Internal server error')
        }
    } catch (err) {
        console.log(err.message)
        next()
    }
}
const updateTask = async (req, res, next) => {
    try {
        const { id, task, time } = req.body;
        if (!id) {
            return errorResponse(res, 400, 'Id required')
        }
        if (!task || !time) {
            return errorResponse(res, 400, 'Task or time required to update');
        }
        const result = await Task.updateOne({ _id: id }, { $set: { task, time } })
        if (result.modifiedCount > 0) {

            return Response(res, 200, 'Task Update')
        } else {
            return errorResponse(res, 500, 'Internal server error')
        }

    } catch (err) {
        console.log(err.message)
        next()
    }
}
const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.body;
        if (!id) {
            return errorResponse(res, 400, 'Id required')
        }

        const result = await Task.deleteOne({ _id: id })
        if (result.deletedCount > 0) {

            return Response(res, 200, 'Task delete')
        } else {
            return errorResponse(res, 404, 'Task not found')
        }

    } catch (err) {
        console.log(err.message)
        next()
    }
}

const verifyRefreshToken = (req, res, next) => {
    try {
        const { refrehToken } = req.body
        if (!refrehToken) {
            return errorResponse(res, 401, "Refresh token required");

        }
        jwt.verify(refrehToken, process.env.REFRESH_SECRET_KEY, (err, decoded) => {
            if (err) {
                return errorResponse(res, 403, "Invalid refresh token");
            }
            const newAccessToken = jwt.sign({ id: decoded.id }, process.env.SECRET_KEY, { expiresIn: "15m" })
            return Response(res, 200, 'New Access token', {
                accessToken: newAccessToken
            })
        })

    } catch (err) {
        console.log(err.message)
        next()
    }
}
module.exports = { createUser, loginUser, createTask, showTask, updateTask, deleteTask, verifyRefreshToken }