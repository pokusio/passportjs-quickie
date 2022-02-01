const shelljs = require("shelljs")

/************************************************************************************
 *   cccccccccccc ?
 *    -->  cccc
 *    -->  cccc
 *    -->  cccccccccccc ?
 *    -->  cccccccccccc :
 *         ++ > cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc :
 *              + cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
 *              + cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
 *              + cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
 *              + cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
 *         ++ > ccccccccccccccccccccccccccccccccccc
 *
 *    -->  cccccccccccc ?
 *    -->  cccccccccccc :
 *
 *
 *
 *
 *
 *
 **************/

 const getCapacityPlan = () => {

   let hugoBuildCmdResult = shelljs.exec(`virtualboxmanage --version`);


     return {
       vbox:{
         version: `6.4.2`,
         capacity_plan: {

         }
       }
     }
  }

  const getCurrentCapacity = () => {

    let hugoBuildCmdResult = shelljs.exec(`virtualboxmanage --version`);


      return {
        vbox:{
          version: `6.4.2`,
          capacity_plan: {

          }
        }
      }
   }
///
module.exports = {
    getCapacityPlan: getCapacityPlan,
    getCurrentCapacity: getCurrentCapacity
};
