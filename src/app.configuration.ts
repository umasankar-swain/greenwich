/**
 * Configurtation Module to complement Nest configuration.
 *
 * @author Umasankar swain
 * @date 28-08-2024
 *
 */
export default () => ({
  APP: {
    TITLE: `Greenwich university APIs`,
    DESCRIPTION: 'Greenwich university apis.',
    VERSION: '1.0.0',
    ENV: process.env.ENV || 'DEV',
    PORT: parseInt(process.env.PORT) || 9005,
    DB: {
      TYPE: process.env.PG_TYPE || 'postgres',

      PORT: process.env.PG_PORT || 5432,
      HOST: process.env.PG_HOST || 'localhost',
      USERNAME: process.env.PG_USERNAME || 'postgres',
      PASSWORD: process.env.PG_PASSWORD || 'root',
      DATABASE: process.env.PG_DATABASE || 'db_greenwich',

      // PORT: process.env.PG_PORT || 5764,
      // HOST: process.env.PG_HOST || '15.223.89.159',
      // USERNAME: process.env.PG_USERNAME || 'postgres',
      // PASSWORD: process.env.PG_PASSWORD || '_root@77#MC@741',
      // DATABASE: process.env.PG_DATABASE || 'db_st_paul_uat',

    },
    API_GLOBAL_PREFIX: process.env.API_GLOBAL_PREFIX || `/api`,
    JWT: {
      SECRET: process.env.JWT_SECRET || `uEqxtQNNOeKVP54h6rey78VP54hQNN`,
      EXP: process.env.JWT_EXP || `1d`,
    },
  },
  config: async (app: any, config: any) => {
    console.log(
      `\n[  Greenwich API ] server successfully enabled with ${config.ENV} environment\n`,
      `\n[ Greenwich API ] Attached ${config.ENV} DB :
      ::> DB: [ ${config.DB.HOST} ${config.DB.PORT} ${config.DB.DATABASE} ]
      ::> Local: http://localhost:${config.PORT} 
      ::> IPV4 Network: ${await app.getUrl()}\n`,
    );
  },

  instance: async () => {
    console.log(`%c
       ██████╗ ██████╗ ███████╗███████╗███╗   ██╗██╗    ██╗██╗ ██████╗██╗  ██╗
██╔════╝ ██╔══██╗██╔════╝██╔════╝████╗  ██║██║    ██║██║██╔════╝██║  ██║
██║  ███╗██████╔╝█████╗  █████╗  ██╔██╗ ██║██║ █╗ ██║██║██║     ███████║
██║   ██║██╔══██╗██╔══╝  ██╔══╝  ██║╚██╗██║██║███╗██║██║██║     ██╔══██║
╚██████╔╝██║  ██║███████╗███████╗██║ ╚████║╚███╔███╔╝██║╚██████╗██║  ██║
 ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═══╝ ╚══╝╚══╝ ╚═╝ ╚═════╝╚═╝  ╚═╝                                                                     
----------------------------------------------------
    %cWelcome to the source, enjoy your stay.`,
      'color: #f33; font-weight: bold;', 'color: #777');
  }
});
