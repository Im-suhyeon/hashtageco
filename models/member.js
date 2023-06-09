// 8주차 강의자료의 models/subscriber.js 참고

module.exports = (sequelize, Sequelize) => {
  const member = sequelize.define(
    "member",
    {
      member_id: {
        //기본키
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(16),
        allowNull: false, // true에서 false로 변경
      },
      profile: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "Member",
    }
  );
  return member;
};
