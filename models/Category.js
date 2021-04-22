

module.exports = (sequelize, DataTypes) =>{
    const Category =  sequelize.define("Category",{
        customerName:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        rating:{
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        remarks:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
    });



    return Category;
}
