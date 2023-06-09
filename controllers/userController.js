const db = require("../models/index"),
  Member = db.member;
Op = db.Sequelize.Op;

exports.signup = async (res, req) => {
  // 회원 가입
  if (req.body.password.length < 8 || req.body.password.length > 16) {
    res.send("<script>alert('회원가입에 실패하였습니다. 비밀번호는 8자리 이상 16 자리 이하여야 합니다.');location.href='/signup';</script>");
  } else {
    db.member
      .create({
        name: req.body.name,
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password,
      })
      .then((result) => {
        console.log("회원가입 완료");
        res.send("<script>alert('회원가입이 완료되었습니다. 로그인을 진행해주세요.');location.href='/login';</script>");
      })
      .catch((err) => {
        console.log(err);
        console.log("회원가입 실패");
        res.send("<script>alert('이미 존재하는 회원 정보입니다. 다시 회원가입을 진행해주세요.');location.href='/signup';</script>");
      });
  }
};

exports.profile = async (req, res) => {
  var memberId = req.session.idx;
  const memberData = await Member.findAll({
    attributes: ["name", "nickname", "email", "password"],
    where: {
      member_id: memberId,
    },
  });
  console.log(memberData);
  console.log("session 객체 확인(profile) :", req.session);
  if (req.session.login == true) {
    res.render("profile", { memberData: memberData });
  } else {
    res.send("<script>alert('로그인을 먼저 해주세요.');location.href='/login';</script>");
  }
};

exports.passwordUpdate = async (req, res) => {
  console.log("비번변경");
  let memberId = req.session.idx;
  console.log(memberId);
  console.log(req.body.newpassword);
  if (req.body.newpassword.length < 8 || req.body.newpassword.length > 16) {
    res.send("<script>alert('비밀번호 변경에 실패하였습니다. 비밀번호는 8자리 이상 16 자리 이하여야 합니다.');location.href='/profile';</script>");
  } else {
    await Member.update(
      {
        password: req.body.newpassword,
      },
      {
        where: { member_id: memberId },
      }
    );

    res.send("<script>alert('비밀번호가 변경되었습니다.');location.href='/profile';</script>");
  }
};
