const User = require("./User");
const BixiStation = require("./BixiStation")

module.exports = function(sequelize, DataTypes) {
    const StationComment = sequelize.define("StationComment", {
        commentText: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    // Associations

    // StationComment.belongsTo(User);
    // StationComment.belongsTo(BixiStation);

    return StationComment;
};