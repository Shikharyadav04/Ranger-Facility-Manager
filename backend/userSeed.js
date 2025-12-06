import {User} from './models/user.model.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const userRegister = async () => {
  try {
    const existingAdmin = await User.findOne({ email: "sumitp0808@gmail.com" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    const avatar =  "https://geekculture.co/wp-content/uploads/2019/02/bumblebee-officially-reboots-transformers-movie-franchise-e1550454744488.jpg";
    const hashedPassword = await bcrypt.hash("admin", 10);
    const newUser = await User.create({
        username : "sumitp0808",
        email : "sumitp0808@gmail.com",
        role : "admin",
        fullName : "Sumit Prajapati",
        password : hashedPassword,
        avatar : avatar
    });

    await newUser.save();
    console.log("Admin user created");
  } catch (error) {
    console.log("Error creating admin user:", error);
  }
};

export { userRegister };