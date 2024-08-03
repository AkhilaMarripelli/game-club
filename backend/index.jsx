const port=5000;
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const multer=require('multer');
const path=require('path');
const cors=require('cors');
const exp = require('constants');

app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:5174',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//     optionsSuccessStatus: 200
//   }));
//connecting to Mongodb database

mongoose.connect('mongodb://localhost:27017/gaming-club');

//API creation
app.get('/',(req,res)=>{
    res.send('Express App is running');
})

//Image Storage Engine

const storage=multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload=multer({storage:storage});

// creating upload Endpoint for images
app.use('/images',express.static('upload/images'))

app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
}) 

//schema for creating products
const productSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    }
})
//creating model for the schema

const Product=mongoose.model("Product",productSchema);
//API to add products
app.post('/addproduct',async(req,res)=>{
    let products=await Product.find({});
    let id;
    if(products.length>0)
        {
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id= last_product.id+1;
        }
    else{
        id=1;
    }
    const product=new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        description:req.body.description,
        new_price:req.body.new_price,
    });
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name
    })
})
app.options('/removeproduct', cors());

//API to delete products
app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log('removed');
    res.json({
        success:true,
        name:req.body.name
    })
})
//API for getting all products
app.get('/allproducts',async(req,res)=>{
    let products=await Product.find({});
    // console.log("All products Fetched");
    console.log(products)
    res.send(products);
})


//creating endpoint for newCollection data

app.get('/newcollectiond',async(req,res)=>{
    let products = await Product.find({});
    let newCollection=products.slice(1).slice(-8);
    console.log('New Collection fetched');
    res.send(newCollection);
})

//creating endpoint for popular in women section

app.get('/popularinwomen', async(req,res)=>{
    let products = await Product.find({category:'women'});
    let popular_in_women = products.slice(0,4);
    console.log('popular in women fetched');
    res.send(popular_in_women);
})

//creating middleware to fetch user
 const fetchUser = async(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"please authenticate using valid token"})
    }
    else{
        try{
            const data =jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        }catch(error){
            res.status(401).send({error:"Please authenticate using a valid token"})
        }
    }
 } 


//creating endpoint for cart data

app.post('/addtocart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({_id: req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.json({ success: true, message: "added" });
});

// creating endpoint to remove product from cartdata
app.post('/removefromcart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({_id: req.user.id});
    if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
        await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    }
    res.json({ success: true, message: "removed" });
});

//creating endpoint to get cart data
app.post('/getCart',fetchUser,async(req,res)=>{
    console.log('Get Cart');
    let userData = await Users.findOne({_id:req.user.id})
    res.json(userData.cartData);
})
//User Schema
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    walletBalance: {
        type: Number,
        default: 0,
      },
    date:{
        type:Date,
        default:Date.now,
    }
})
//User Model
const Users = mongoose.model('Users', UserSchema);

//creating API end point for registering users

app.post('/signup',async(req,res)=>{
    let check=await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:'existing user found'})
    }
    let cart={};
    for(let i=0;i<300;i++){
        cart[i]=0;
    }
    const user=new Users({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();
    const data={
        user:{
            id:user.id
        }
    }
    const token=jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

//creating endpoint for user login
app.post('/login',async(req,res)=>{
    let user=await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data, 'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Wrong password"});
        }
    }
    else{
        res.json({success:false,errors:'wrong email Id'})
    }
})
app.get('/allusers', async (req, res) => {
    let users = await Users.find({});
    res.send(users);
});

// API to delete a user
app.post('/removeuser', async (req, res) => {
    await Users.findOneAndDelete({ _id: req.body.id });
    res.json({ success: true, message: 'User removed' });
});
// Schema for Wallet Requests
const WalletRequestSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users'
    },
    amount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      default: 'pending'
    },
    date: {
      type: Date,
      default: Date.now
    }
  });
  
  // Model for Wallet Requests
  const WalletRequest = mongoose.model('WalletRequest', WalletRequestSchema);
  
  // Endpoint to request a recharge
  app.post('/requestrecharge', fetchUser, async (req, res) => {
    const { amount } = req.body;
    const userId = req.user.id;
  
    if (amount < 100 || amount > 2500) {
      return res.status(400).send({ error: 'Amount must be between 100 and 2500.' });
    }
  
    const walletRequest = new WalletRequest({
      userId,
      amount
    });
  
    await walletRequest.save();
    res.send({ success: true });
  });
  
  // Endpoint for admin to approve recharge
  app.post('/approverecharge', async (req, res) => {
    const { requestId } = req.body;
  
    const walletRequest = await WalletRequest.findById(requestId);
    if (!walletRequest) {
      return res.status(404).send({ error: 'Recharge request not found.' });
    }
  
    walletRequest.status = 'approved';
    await walletRequest.save();
  
    const user = await Users.findById(walletRequest.userId);
    user.walletBalance = (user.walletBalance || 0) + walletRequest.amount;
    await user.save();
  
    res.send({ success: true });
  });
  
  // Endpoint to deduct wallet balance when playing a game
  app.post('/playgame', fetchUser, async (req, res) => {
    const userId = req.user.id;
    const user = await Users.findById(userId);
  
    if (user.walletBalance <= 0) {
      return res.status(400).send({ error: 'Insufficient balance.' });
    }
  
    user.walletBalance -= 100; // Deduct 100 units for playing a game
    await user.save();
  
    res.send({ success: true });
  });

  // Endpoint to retrieve pending recharge requests
app.get('/pendingrecharges', async (req, res) => {
  const pendingRequests = await WalletRequest.find({ status: 'pending' }).populate('userId', 'username email');
  res.send(pendingRequests);
});

  
  // Existing approve recharge endpoint
  // In your server file
app.post('/approverecharge',async (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(403).send({ message: 'Forbidden' });
    }
  
    const { requestId, userId, amount } = req.body;
  
    try {
      // Find the recharge request
      const request = await RechargeRequest.findById(requestId);
      if (!request) {
        return res.status(404).send({ message: 'Request not found' });
      }
  
      // Check if the request is pending
      if (request.status !== 'pending') {
        return res.status(400).send({ message: 'Request already processed' });
      }
  
      // Find the user and update their wallet balance
      const user = await Users.findById(userId);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      user.walletBalance += amount;
      await user.save();
  
      // Update request status
      request.status = 'approved';
      await request.save();
  
      res.send({ message: 'Recharge approved successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Server error' });
    }
  });
  
  const authenticateToken = (req, res, next) => {
    const token = req.headers['auth-token'];
  
    if (!token) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  };
  app.get('/getbalance', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const user = await Users.findById(userId);
  
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
  
    res.send({ balance: user.walletBalance });
  });
  
app.listen(port,(error)=>{
    if(!error){
        console.log('server running on Port '+port);
    }
    else{
        console.log(error);
    }
});