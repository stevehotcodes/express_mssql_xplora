import mssql from 'mssql'
import { dbConfig } from '../config/dbConfig'


// export const dbConnectionService =async()=>{
//     try{
        
//         let pool=await mssql.connect(dbConfig);
//         if(pool.connected){
//             console.log("db is connected ")
//         }
//         return pool
       

//     }
//     catch(error){
//         console.log("Error in Database connection ",error)
//     }
// }

export async function dbConnectService(){
    try {
         let pool = await mssql.connect(dbConfig);
         console.log("database connected successfully")
          return pool; 
    } catch (error) {
          console.log(error)
    }

}
