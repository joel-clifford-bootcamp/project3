module.exports = function(sequelize, DataTypes) {
    const BicycleParkingStatus = sequelize.define("BicycleParkingStatus", {
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

    return BicycleParkingStatus;
};