const https = require("https");
const packageInfo = require("./data-packages.json");
const db = require('../../models');
const updateTables = require('../import/updateTables');

// promise to retrieve the package
const getPackage = packageId => new Promise((resolve, reject) => {
    https.get(`https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_show?id=${packageId}`, (response) => {
        let dataChunks = [];
        response
            .on("data", (chunk) => {
                dataChunks.push(chunk)
            })
            .on("end", () => {
                let data = Buffer.concat(dataChunks)
                resolve(JSON.parse(data.toString())["result"])
            })
            .on("error", (error) => {
                reject(error)
            })
    });
});

// since this package has resources in the datastore, one can get the data rather than just the metadata of the resources
// promise to retrieve data of a datastore resource 
const getDatastoreResource = resource => new Promise((resolve, reject) => {
    https.get(`https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/datastore_search?id=${resource["id"]}`, (response) => {
        let dataChunks = [];

        response
            .on("data", (chunk) => {
                dataChunks.push(chunk)
            })
            .on("end", () => {
                let data = Buffer.concat(dataChunks)
                resolve(JSON.parse(data.toString())["result"]["records"])
            })
            .on("error", (error) => {
                reject(error)
            })
    })
});

module.exports = function() {

    packageInfo
    .forEach(pkg => {
        getPackage(pkg.packageId)
        .then(metadata => {

            db.BikeParkingMetaData
            .findAll( { where: { packageId: metadata.id } } )
            .then( result => {  

                if(result.revisionId != metadata.revision_id){
                    let datastoreResources = metadata["resources"].filter(r => r.datastore_active);

                    // retrieve the first datastore resource as an example
                    getDatastoreResource(datastoreResources[0])
                    .then(resource => {
                        // this is the actual data of the resource
                        console.log(resource);
                        console.log(pkg.model);
                        updateTables(db[pkg.model], resource);
                    })
                    .catch(error => console.errors(error));
                }
            })
            .catch(err => {
                console.log(err);
            })
        });
    });
};