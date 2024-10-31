const mongoose = require("mongoose");
const profileSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  about_me: {
    type:String
  },
  social_media: {
    git_hub: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  skills: [
    {
      skill_name: {
        type: String,
      },
      percentage: {
        type: Number,
      },
    },
  ],
  projects: [
    {
      project_name: {
        type: String,
      },
      discription: {
        type: String,
      },
      image: {
        type: String,
      },
    },
  ],
});
