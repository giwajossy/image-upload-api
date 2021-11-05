const router = require("express").Router()
const cloudinary = require("../utils/cloudinary")
const upload = require("../utils/multer")
const User = require("../model/user")

// The second parameter - "upload.single()" takes in image which should match the name of the input field on the frontend, i.e; <input type="file" name="image">
router.post("/", upload.single("image"), async (req, res) => { 

    try {
        const result = await cloudinary.uploader.upload(req.file.path)

        // create instance of a user
        let user = new User({
            name: req.body.name,
            avatar: result.secure_url,
            cloudinary_id: result.public_id
        })

        // save user
        await user.save((err) => {
            if (!err) return res.json(user)
            console.log(err)
        })
        // res.json(user)
    } catch (err) {
        console.log(err)
    }

})

// fetches all users
router.get("/", async (req, res) => {

    try {
        let user = await User.find()
        res.json(user)
    } catch(err) {
        console.log(err)
    }

})


// delete specific user
router.delete("/:id", async (req, res) => {

    try {
        // finds user by id
        let user = await User.findById(req.params.id)
        // delete image from cloudinary
        await cloudinary.uploader.destroy(user.cloudinary_id)
        // delete user from db
        await user.remove()
        res.json(user)

    } catch (err) {
        console.log(err)
    }

})


// update specific user
router.put("/:id", upload.single("image"), async (req, res) => {

    // find user by id
    let user = await User.findById(req.params.id)
    // delete the current image on cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id)
    // upload the new image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path)
    // upload the new image to db
    const data = {
        name: req.body.name || user.name,
        avatar: result.secure_url || user.avatar,
        cloudinary_id: result.public_id || user.cloudinary_id
    }
    user = await User.findByIdAndUpdate(req.params.id, data, {new: true})
    res.json(user)
})

module.exports = router