import { config } from "dotenv";
config();
const constants = {
    PORT : process.env.PORT || 5000,
    MONGO_URI : process.env.MONGO_URI,
    SECRET_KEY : process.env.SECRET_KEY
};

(function(){
    Object.entries(constants).forEach((ent: any) => {
        if (!ent[1] || (ent[1] && ent[1].toString().trim() === '')) {
          console.log('ent --> ', ent);
          throw new Error('Please provide proper env variables');
        }
      });
})();
export default constants;