
module.exports = function(sequelize, DataTypes) {
    const BikeParkingHighCapacity = sequelize.define("BikeParkingHighCapacity", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true
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
        // geometry: {
        //     type: DataTypes.GEOMETRY
        // }
    });


    return BikeParkingHighCapacity;
};
