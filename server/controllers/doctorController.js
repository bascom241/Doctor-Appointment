

const Doctor = require('../models/doctorModel');

exports.createDoctor = async (req, res) => {
    try {



        if (!req.file) {
            return res.status(400).json({ message: 'Image is required' });
        }


        const doctor = await Doctor.create({
            name: req.body.name,
            image: req.file.path,
            category: req.body.category,
            status: req.body.status,
            experience: req.body.experience,
            degree: req.body.degree,
            about: req.body.about,
            appointmentFee: req.body.appointmentFee,
        });


        

        res.status(201).json({ success: true, message: doctor });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};

exports.getRadio = async(req,res,next)=>{
    req.query.category='radiologist';
    next();
}

exports.getCardio = async(req,res,next)=>{
    req.query.category='cardiologist';
    next();
}
exports.getPedio = async(req,res,next) =>{
    req.query.category ='pediatrician'
    next();
}

exports.getGeneral = async(req,res,next) =>{
    req.query.category='general'
    next();
}

exports.getNeuro = async(req,res,next) =>{
    req.query.category = 'neurologist'
    next();
}

exports.oncologist = async(req,res,next) =>{
    req.query.category = 'oncologist'
    next();
}
exports.gynecolo = async(req,res,next) =>{
    req.query.category = 'gynecologist'
    next();
}


exports.getDoctors = async (req, res) => {
    try {

        let queryObj = {...req.query};
        const excludedFiles = ['sort','fields'];
        excludedFiles.forEach(el => delete queryObj[el]);

        
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);


        let query = await Doctor.find(JSON.parse(queryStr));
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy)
        }


       
        const doctors = await query;
        if (!doctors) return res.status(404).json({ message: 'no doctors found' });

        res.status(200).json({status:'success', data:{doctors}})
    } catch (err) {
        res.status(404).json({message:err.message})
    }
}
exports.getDoctor = async (req,res) =>{
    try{
        const doctor = await Doctor.findById(req.params.id);
        res.status(200).json({status:'success',doctor});
    }catch(err){
        res.status(404).json({message:err.message})
    }
}

exports.editDoctor = async (req, res) => {
    const { doctorId } = req.params;
    if (!doctorId) {
        return res.status(404).json({ message: 'Cant find doctor' });
    }

    // Ensure the body is correctly populated
    console.log(req.body);

    // Construct the update object
    const updateDoctor = {
        name: req.body.name,
        category: req.body.category,
        status: req.body.status,
        experience: req.body.experience,
        degree: req.body.degree,
        about: req.body.about,
        appointmentFee: req.body.appointmentFee,
    };

    // If an image file is uploaded, update the image path
    if (req.file) {
        updateDoctor.image = req.file.path; // Correct the variable name here
    }

    // Validate required fields
    if (!updateDoctor.name || !updateDoctor.category || !updateDoctor.status) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Update the doctor in the database
        const doctor = await Doctor.findByIdAndUpdate(doctorId, updateDoctor, { new: true });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ status: 'success', data: { doctor } });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
