const express = require("express");
const router = express.Router();
const model = require("./schema");


router.post("/user", async(req, res)=>{
    try{
        const {userName, email, password} = req.body;
        if(!userName || !email || !password){
            return res.status(400).send({msg: "Please provide all the details"});

        }

        const userDetails = new model({userName, email, password});
        await userDetails.save();
        return res.status(201).send({msg: "User created successfully", userDetails}); 

    }catch(error){
        return res.status(500).send({msg:"Something went wrong", error});

    }
});

router.put("/put_user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("ID:", id);

        if (!id) {
            return res.status(401).send({ msg: "Please provide id" });
        }

        const { userName, email, password } = req.body;
        
        const updatedUser = await model.findByIdAndUpdate(
            id,
            { userName, email, password }, 
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ msg: "User not found" });
        }

        return res.status(200).send({ msg: "User updated successfully", updatedUser });

    } catch (error) {
        console.error("PUT Error:", error); // Log the full error
        return res.status(500).send({ msg: "Something went wrong", error });
    }
});

router.delete("/del_user/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        console.log(id);
        if(!id){
            return res.status(401).send({msg: "Please provide id"});
        }
        const delete_id = await model.deleteOne({_id:id});
        return res.status(200).send({msg:"User deleted successfully"});

    }catch(error){
        return res.status(500).send({msg: "Something went wrong"});

    }
});

router.patch("/patch_user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        if (!id) {
            return res.status(401).send({ msg: "Please provide id" });
        }

        const updates = req.body; 

        const updatedUser = await model.findByIdAndUpdate(
            id,
            { $set: updates }, 
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ msg: "User not found" });
        }

        return res.status(200).send({ msg: "User updated successfully", updatedUser });

    } catch (error) {
        return res.status(500).send({ msg: "Something went wrong", error });
    }
});

module.exports = router;
