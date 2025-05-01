import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

/**
 * Configuración optimizada de TypeORM para un microservicio
 * de escritura intensiva en PostgreSQL
 */

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get('DB.host', 'localhost'),
    port: configService.get<number>('DB.port', 5432),
    username: configService.get('DB.user', 'postgres'),
    password: configService.get('DB.password', 'postgres'),
    database: configService.get('DB.database', 'usuarios'),
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    autoLoadEntities: true,
    synchronize: false,
    migrationsRun: false,
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    migrationsTableName: 'migrations',

    // Optimizaciones para escritura intensiva
    logging: ['error', 'schema'],
    logger: 'advanced-console',

    // Pool de conexiones optimizado para escritura
    extra: {
      // Mantiene conexiones más tiempo para evitar overhead
      max: 20, // Máximo de conexiones en el pool
      connectionTimeoutMillis: 10000, // Timeout para obtener conexión
      idleTimeoutMillis: 10000, // Tiempo inactivo antes de cerrar conexión
      statement_timeout: 30000, // Timeout para statements (ms)
    },

    // Optimizaciones de performance
    maxQueryExecutionTime: 1000, // Loguea queries lentas (ms)
    cache: {
      duration: 30000, // Caché de queries por 30 segundos
    },
  };
};
