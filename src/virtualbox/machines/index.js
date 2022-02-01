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

const getMachine = (uuid) => {

  let hugoBuildCmdResult = shelljs.exec(`virtualboxmanage --version`);


    return {
      name: `k8s_cluster_node3`,
      cpu_number: 4,
      ram_size: `1024` // in megabytes
      disks: [
          {
            name: `only_disk1`,
            size: `73GB`
          }
      ],
      operators: [
        {
          name: "bob"
          uuis: `eyDEAF545TGERE5RTRTB45RGSDGUJYU6534RFSDFRsSHYJ45HREZ4sfdcs`
        },
        {
          name: "dan"
          uuis: `eyDEAF545TGERE5RTRTB4ZRFGZFZSDGUJYU6534RFSDFRs45HREZ4sfdcs`
        },
        {
          name: "denis"
          uuis: `eyDEATJUHERFSDSDFQSDFSHR4TR67URTGZ5EYRGEGERFERFZFREZ4sfdcs`
        }
      ]
    }
}

const getMachines = () => {

  let hugoBuildCmdResult = shelljs.exec(`virtualboxmanage --version`);

    return {
      vbox:{
        version: `6.4.2`,
        capacity_plan: {

        }
      }
      mahines: [
        {
          name: `k8s_cluster_node1`,
          cpu_number: 4,
          ram_size: `1024` // in megabytes
          disks: [
            {
              name: `main_disk1`,
              size: `140GB`
            }
          ]
        },
        {
          name: `k8s_cluster_node2`,
          cpu_number: 4,
          ram_size: `1024` // in megabytes
          disks: [
            {
              name: `bobs_big_disk`,
              size: `256GB`
            }
          ]
        },
        {
          name: `k8s_cluster_node3`,
          cpu_number: 4,
          ram_size: `1024` // in megabytes
          disks: [
            {
              name: `only_disk1`,
              size: `73GB`
            }
          ]
        }
      ],
      operators: [
        {
          name: "bob"
          uuis: `eyDEAF545TGERE5RTRTB45RGSDGUJYU6534RFSDFRsSHYJ45HREZ4sfdcs`
        },
        {
          name: "dan"
          uuis: `eyDEAF545TGERE5RTRTB4ZRFGZFZSDGUJYU6534RFSDFRs45HREZ4sfdcs`
        },
        {
          name: "denis"
          uuis: `eyDEATJUHERFSDSDFQSDFSHR4TR67URTGZ5EYRGEGERFERFZFREZ4sfdcs`
        }
      ]
    }
}


///
module.exports = {
    getMachines: getMachines,
    getMachine: getMachines
};
