const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    language: {
      type: String,
      required: [true, 'Programming language is required'],
      trim: true,
    },
    bugDescription: {
      type: String,
      required: [true, 'Bug description is required'],
      trim: true,
    },
    code: {
      type: String,
      required: [true, 'Code snippet is required'],
    },
    aiResponse: {
      problem: {
        type: String,
        default: '',
      },
      reason: {
        type: String,
        default: '',
      },
      fixedCode: {
        type: String,
        default: '',
      },
      explanation: {
        type: String,
        default: '',
      },
      bestPractices: {
        type: [String],
        default: [],
      },
      performanceImprovements: {
        type: [String],
        default: [],
      },
      securityIssues: {
        type: [String],
        default: [],
      },
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

AnalysisSchema.index(
  {
    title: 'text',
    bugDescription: 'text',
    code: 'text',
  },
  {
    language_override: 'dummyLanguageField',
  }
);

module.exports = mongoose.model('Analysis', AnalysisSchema);