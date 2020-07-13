
module.exports = function(sequelize, DataTypes) {
    const BicycleParking = sequelize.define("BicycleParking", {
        // Id of dataset record comes from
        dataSetId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // unique identifier within that dataset
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING
        },     
        type: {
            type: DataTypes.STRING
        },
        capacity: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.STRING
        },
        details: {
            type: DataTypes.STRING
        },
        lat: {
            type: DataTypes.DECIMAL(9,6),
        },
        lng:  {
            type: DataTypes.DECIMAL(9,6),
        }
        // ,
        // geometry:{
        //     type: DataTypes.GEOMETRY('POINT'),
        //     // allowNull: false
        // }
    },
    {
        freezeTableName: true,
        tableName: "BicycleParkingSpots"
    });

    return BicycleParking;
};
