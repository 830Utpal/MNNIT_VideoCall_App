import HttpStatus from 'http-status';
import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" });
        }
    let isPasswordCorrect=await bcrypt.compare(password, user.password);
        if (isPasswordCorrect)) {
            let token = crypto.randomBytes(20).toString('hex');

            user.token = token;
            await user.save();
            return res.status(HttpStatus.OK).json({ message: "User logged in successfully", token });
        } else {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: "Invalid credentials}" });
        }
    } catch (e) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: username + " not found" });
    }
};

const register = async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(HttpStatus.FOUND).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword
        });

        await newUser.save();

        res.status(HttpStatus.CREATED).json({ message: "User created successfully" });
    } catch (e) {
        res.json({ message: e.message });
    }
};

export { login, register };
