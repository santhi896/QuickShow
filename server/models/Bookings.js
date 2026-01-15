import mongoose from "mongoose";


const BookingSchema = new mongoose.Schema({
    user: {type:String,  required: true,  ref :'User'},
    // show: {type:String,  required: true,  ref :'User'},
    show: {type:String, required: true, ref: 'Show'}, // ✅ Corrected
    amount: {type:Number,  required: true  },
    bookedSeats: {type:Array,  required: true  },
    isPaid : {type:Boolean,  required: false  },
    paymentLink : {type:String  },

},{timestamps:true})

const Booking = mongoose.model("Bookings",BookingSchema);

export default Booking;