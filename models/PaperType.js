

module.exports = (sequelize, DataTypes) =>{
    const PaperType =  sequelize.define("PaperType",{
        type:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        active:{
            type: DataTypes.BOOLEAN,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        }
    });



    return PaperType;
}
