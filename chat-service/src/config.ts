export const config = () => ({
  database: {
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/entity/*.entity{.ts,.js}'],
    synchronize: true
  }
})