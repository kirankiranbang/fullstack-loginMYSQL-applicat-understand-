const User = require('../models/user');




exports.createUser = async (req, res) => {
  try {
    const { username, password, phoneNumber } = req.body;

    // Create a new user object
    const newUser = new User({
      username: username,
      password: password,
      phoneNumber: phoneNumber
    });

    // Save the user object to the database
    const createdUser = await newUser.save();

    // Return the created user as a response
    res.status(200).json({
      success: true,
      message: 'User signed up successfully',
      data: createdUser
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating user'
    });
  }
};


exports.getSignupData = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
};

exports.getUserById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const user = await User.findByPk(id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Error fetching user');
  }
};


exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user from the database
    await user.destroy();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user'
    });
  }
};




exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { username, password, phoneNumber } = req.body;

  try {
    // Find the user by ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's properties
    user.username = username;
    user.password = password;
    user.phoneNumber = phoneNumber;

    // Save the updated user to the database
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user'
    });
  }
};








// exports.getUser = async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// exports.updateUser = async (req, res) => {
//   const { id } = req.params;
//   const { username, password, phoneNumber } = req.body;
//   try {
//     const updatedUser = await User.findOneAndUpdate(
//       { _id: id },
//       { username, password, phoneNumber },
//       { new: true }
//     );
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await User.findByIdAndRemove(id);
//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
