import { resolve } from "url";
import { connect } from "tls";
import { userInfo } from "os";

class Master_Functions
{
    static arrayToObject = (array) =>
    array.reduce((obj, item) => {
            return item
        }, {})//watch out the empty{}, which is passed as "result".
    

    static arrayToObjectmultiple = (array) =>
    array.reduce((result, item,index,array) => {
        result[index]=item;
            return result;
        }, {})//watch out the empty{}, which is passed as "result".

    static formatSentResponse = (processdata,statustosend,message) => {
                    let send={
                        data:(processdata),
                        status:statustosend,
                        message:message
                    }
                return send;}
//Higher order error functions
    static displayerror = async (error,req,res,next)=>{
            res.status(error.status || 500);
            console.error("in under display error Master Function");

            console.error(error);
            res.send(error);
        };

    static logerrortoFbase = async (req,res,next)=>{
            return new Promise(async(resolve,reject)=>{
                var fullurl= Master_Functions.fullUrl(req);
            })
        };    
    static logacesstoFbase = async (req,res,next,hrstart)=>{
            return new Promise(async(resolve,reject)=>{
                var hrend = process.hrtime(hrstart);
                var fullurl= Master_Functions.fullUrl(req);
            })
        };  
    static catchErrors = (fn) => (req,res,next) =>fn(req,res,next).catch(next);

    static fullUrl(req) {
         var url={
          protocol: req.protocol,
          host: req.get('host'),
          pathname: req.originalUrl,
          fullUrl: req.protocol + '://' + req.get('host') + req.originalUrl
        };
        return url;
      }
      static sqlProcess=async(sql,connection,dbservice,next)=>{
        return new Promise(async(resolve,reject)=>{
            try
            {
                connection.query(sql,async(err,result)=>{
                    if(err)next(err);
                    resolve(result);
                })
                await dbservice.disconnectdb(connection);                
            }catch(e){
                next(e)
            }
        })
      }
    static conditionalQuery = async(req,sql,arr,arrval,cond, next):Promise<any> =>
      {
          try
          {
              return new Promise(async(resolve, reject) => 
              {
                  let i;

                  for(i=0;i<arr.length;i++)
                  {
                      if(i == (arr.length - 1))
                      {
                          sql +=  arr[i]+"='"+arrval[i]+"'";
                      }
                      else
                      {
                          sql +=  arr[i]+"='"+arrval[i]+"' "+cond+" ";
                      }
                  }

                  resolve(sql);
              });
          }
          catch(err) { next(err);}
      }
}

module.exports=Master_Functions;