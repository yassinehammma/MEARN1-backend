
const Computer = require('../models/computerModel'); // Assuming you have a computer model defined

// test controller for computer routes
exports.test = async (req, res) => {
    try {
        res.status(200).send("Test controller is working!");
    } catch (error) {
        console.error(`Error in test controller: ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


// add more computer controllers as needed

exports.addComputer = async (req, res) => {
    try {
        const newComputer = req.body;

        const savedComputer = new Computer(newComputer);
        await savedComputer.save();

        res.status(201).send({
            message: 'Computer added successfully',
            computer: savedComputer
        });
    } catch (error) {
        console.error(`Error in addComputer controller: ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//get all computers controller
exports.getAllComputers = async (req, res) => {
    try {
        const foundComputers = await Computer.find();
        res.status(200).send({
            message: 'All computers retrieved successfully',
            computers: foundComputers
        });
    } catch (error) {
        console.error(`Error in getAllComputers controller: ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//get computer by id controller
exports.getComputerById = async (req, res) => {
    try {
        const {id} = req.params;
        const foundComputer = await Computer.findById(id);

        if (!foundComputer) {
            return res.status(404).send({ message: 'Computer not found' });
        }

        res.status(200).send({
            message: 'Computer retrieved successfully',
            computer: foundComputer
        });
    } catch (error) {
        console.error(`Error in getComputerById controller: ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// get computer by brand controller
exports.getComputersByBrand = async (req, res) => {
    try {
        const { brand } = req.query;
        if (! brand) {
            return res.status(400).send({ message: 'Brand query parameter is required' });
        }
        const foundComputers = await Computer.find({
          brand: { $regex: brand , $options: 'i' } // case-insensitive search,
        });

        res.status(200).send({
            message: 'Computers retrieved successfully',
            computers: foundComputers
        });
        if (foundComputers.length === 0) {
            return res.status(404).send({ message: 'No computers found for the specified brand' });
        }
    } catch (error) {
        console.error(`Error in getComputersByBrand controller: ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// delete computer by id controller
exports.deleteComputerById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComputer = await Computer.findByIdAndDelete(id);
        if (!deletedComputer) {
            return res.status(404).send({ message: 'Computer not found' });
        }
        res.status(200).send({
            message: 'Computer deleted successfully',
            computer: deletedComputer
        });
    } catch (error) {
        console.error(`Error in deleteComputerById controller: ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// update computer by id controller
exports.updateComputerById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedComputerData = req.body;

        const updatedComputer = await Computer.findByIdAndUpdate(id, updatedComputerData, {
          new: true,
        });

        if (!updatedComputer) {
            return res.status(404).send({ message: 'Computer not found' });
        }

        res.status(200).send({
            message: 'Computer updated successfully',
            computer: updatedComputer
        });
    } catch (error) {
        console.error(`Error in updateComputerById controller: ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}