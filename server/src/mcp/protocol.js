/**
 * MCP Protocol
 *
 * Every tool request follows this structure.
 */

const createRequest = ({
  tool,
  action,
  payload = {},
}) => ({
  tool,
  action,
  payload,
});

const createResponse = ({
  success = true,
  data = null,
  error = null,
}) => ({
  success,
  data,
  error,
});

module.exports = {
  createRequest,
  createResponse,
};