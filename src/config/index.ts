/* eslint-disable node/no-process-env */

export default {
  nodeEnv: (process.env.NODE_ENV || 'development'),
  port: (process.env.PORT || 3001),
  brightData_bearerToken: (process.env.API_KEY || ''),
  brightData_collectorId: (process.env.COLLECTOR_ID || ''),
  mongo_connectionString: ("mongodb+srv://deepmadhvani0543:Deep123@cluster0.dgdfn5n.mongodb.net/?retryWrites=true&w=majority" || ''),
} as const;

	
