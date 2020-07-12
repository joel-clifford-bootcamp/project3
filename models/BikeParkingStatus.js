module.exports = function(sequelize, DataTypes) {
    const BikeParkingStatus = sequelize.define("BikeParkingStatus", {
        name: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true
        }
    });

    // // Associations
    // BikeParkingStatus.associate = function(models){
    //     BikeParkingStatus.hasMany(models.BikeParking);
    // };

    return BikeParkingStatus;
};