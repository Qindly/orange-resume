import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    thumbnailLink:{
        type: String,
    },
    template:{
        theme:String,
        colorPalette:[String],
    },
    
    profileInfo:{
        profilePreviewUrl:String,
        fullName:String,
        designation:String,
        summary:String,
    },

    contactInfo:{
        email:String,
        phone:String,
        loacation:String,
        website:String,
        linkedin:String,
        github:String,
    },

    workExperience:[{
        companyName:String,
        role:String,
        startDate:String,
        endDate:String,
        description:String,
    },],

    education:[{
        degree:String,
        fieldOfStudy:String,
        startDate:String,
        endDate:String,
        description:String,
    },],

    skills:[{
        skillName:String,
        proficiency:Number,
    },],

    projects:[{
        projectName:String,
        description:String,
       github:String,
       liveDemo:String,
    },],

    certifications:[{
        certificationName:String,
        issuingOrganization:String,
        issueDate:String,
        expirationDate:String,
    },],

    languages:[{
        languageName:String,
        proficiency:String,
    },],

    interests:[String],
},
{
    timestamps:{createdAt:"createAt",updatedAt:"updateAt"}
}
)
export default mongoose.model("Resume", ResumeSchema);