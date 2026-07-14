const mongoose = require('mongoose');
const Analysis = require('../models/Analysis');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');

/**
 * @desc    Get dashboard statistics for the logged-in user using a single
 *          MongoDB aggregation pipeline (no manual document looping)
 * @route   GET /api/dashboard
 * @access  Private
 */
const getDashboardStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const now = new Date();
  const startOfToday = new Date(now);
  startOfToday.setUTCHours(0, 0, 0, 0);

  const startOfWeek = new Date(startOfToday);
  startOfWeek.setUTCDate(startOfWeek.getUTCDate() - 6);

  const [result] = await Analysis.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    {
      $facet: {
        statusCounts: [{ $group: { _id: '$status', count: { $sum: 1 } } }],
        todayCount: [
          { $match: { createdAt: { $gte: startOfToday } } },
          { $count: 'count' },
        ],
        weekCount: [
          { $match: { createdAt: { $gte: startOfWeek } } },
          { $count: 'count' },
        ],
        languageCounts: [
          { $group: { _id: '$language', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 1 },
        ],
        recent: [
          { $sort: { createdAt: -1 } },
          { $limit: 5 },
          {
            $project: {
              title: 1,
              language: 1,
              status: 1,
              createdAt: 1,
              updatedAt: 1,
            },
          },
        ],
        total: [{ $count: 'count' }],
      },
    },
  ]);

  const statusMap = { pending: 0, completed: 0, failed: 0 };
  (result.statusCounts || []).forEach((entry) => {
    if (entry._id && Object.prototype.hasOwnProperty.call(statusMap, entry._id)) {
      statusMap[entry._id] = entry.count;
    }
  });

  const totalAnalyses = (result.total && result.total[0] && result.total[0].count) || 0;
  const today = (result.todayCount && result.todayCount[0] && result.todayCount[0].count) || 0;
  const thisWeek = (result.weekCount && result.weekCount[0] && result.weekCount[0].count) || 0;
  const mostUsedLanguage =
    result.languageCounts && result.languageCounts.length > 0 ? result.languageCounts[0]._id : null;

  const successRate =
    totalAnalyses > 0 ? Number(((statusMap.completed / totalAnalyses) * 100).toFixed(2)) : 0;

  const stats = {
    totalAnalyses,
    completed: statusMap.completed,
    failed: statusMap.failed,
    pending: statusMap.pending,
    today,
    thisWeek,
    successRate,
    mostUsedLanguage,
    recent: result.recent || [],
  };

  return sendSuccess(res, 200, 'Dashboard statistics fetched successfully', stats);
});

module.exports = { getDashboardStats };