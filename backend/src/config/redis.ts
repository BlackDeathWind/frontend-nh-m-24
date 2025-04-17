import { createClient } from 'redis';
import config from './config';
import logger from '../utils/logger';

// Khởi tạo Redis client
const redisClient = createClient({
  url: `redis://${config.REDIS.PASSWORD ? `:${config.REDIS.PASSWORD}@` : ''}${config.REDIS.HOST}:${config.REDIS.PORT}`,
});

// Xử lý sự kiện kết nối Redis
redisClient.on('connect', () => {
  logger.info('Kết nối Redis thành công.');
});

redisClient.on('error', (err) => {
  logger.error(`Lỗi kết nối Redis: ${err}`);
  // Không crash trong môi trường phát triển
  if (config.NODE_ENV === 'production') {
    process.exit(1);
  }
});

// Hàm khởi động Redis client
const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.connect();
  } catch (error) {
    logger.error(`Không thể kết nối đến Redis: ${error}`);
    // Không crash trong môi trường phát triển
    if (config.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

export { redisClient, connectRedis }; 