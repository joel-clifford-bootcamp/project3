
module.exports = function(sequelize, DataTypes) {
    const BikeParkingOutdoor = sequelize.define("BikeParkingOutdoor", {
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
        },
        geometry:{
            type: DataTypes.GEOMETRY,
            // allowNull: false
        }
    });

    return BikeParkingOutdoor;
};
