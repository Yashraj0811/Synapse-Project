const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catachAsyncErrors = require('../middlewares/catachAsyncErrors');
const sendToken = require('../utils/jwtToken');

//Register 
exports.registerUser = catachAsyncErrors(async(req, res, next) =>{
    const { name, email, password} = req.body;
    const user = await User.create({
        name, 
        email, 
        password,
        avatar:{
            public_id: 'kghcvghuilhytiogkjvbhoyiguvjkbngchftyghjvu',
            url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nicepng.com%2Fourpic%2Fu2t4t4e6w7e6u2o0_med-boukrima-specialist-webmaster-php-e-commerce-web%2F&psig=AOvVaw26du9EkeXpXx7-ixYIEw4Z&ust=1677590306617000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPiOk4Tltf0CFQAAAAAdAAAAABAE'
        }
    })

   sendToken(user, 200, res)
})

//Login User
exports.loginUser= catachAsyncErrors( async( req, res, next) =>{
    const { email, password} = req.body;
    if(!email|| !password){
        return next (new ErrorHandler('Please enter email & password', 400))
    }
    const user = await User.findOne({ email }).select('+password')
    if(!user){
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }
    sendToken(user, 200, res)
})

//Logout User 
exports.logout = catachAsyncErrors(async(req, res, next)=>{
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true, 
        message: 'Logged Out'
    })
})
