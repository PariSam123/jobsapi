const mongoose = require('mongoose');

const JobModel = new mongoose.Schema({
    job_id: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    salary: {
        type: Number,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    tech: {
        type: Array,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    collection: "jobs",
    timestamps: true
});

module.exports = mongoose.model("Job", JobModel);