import { Sequelize } from 'sequelize';
import config from './config';
import logger from '../utils/logger';

// Tạo đối tượng kết nối Sequelize
const sequelize = new Sequelize(config.DB.NAME, config.DB.USER, config.DB.PASSWORD, {
  host: config.DB.HOST,
  port: config.DB.PORT,
  dialect: 'mssql',
  logging: (msg) => logger.debug(msg),
  dialectOptions: {
    options: {
      encrypt: true, // Cho Azure SQL
      trustServerCertificate: config.NODE_ENV === 'development', // Chỉ sử dụng cho môi trường dev
    },
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Hàm test kết nối
const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    logger.info('Kết nối đến cơ sở dữ liệu SQL Server thành công.');
  } catch (error) {
    logger.error(`Không thể kết nối đến cơ sở dữ liệu SQL Server: ${error}`);
    // Trong môi trường phát triển, không crash server nếu cơ sở dữ liệu chưa sẵn sàng
    if (config.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

export { sequelize, testConnection }; 