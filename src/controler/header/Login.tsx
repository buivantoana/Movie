import { useState } from "react";
import "./login.css";
export interface IAppProps {
  check: boolean;
  toggle: any;
}

export function Login({ check, toggle }: IAppProps) {
  let [register, setregister] = useState(true);
  let [registercheck, setregistercheck] = useState(true);
  let [login, setlogin] = useState(false);
  function handleregister() {
    setregister(!register);
    setregistercheck(true);
  }

  return (
    <div className={`modalsearch ${check ? "visible" : "hidden"}`}>
      <div className={check ? "modal" : "modals"}>
        <div className='close-login'>
          <i onClick={toggle} className='fa-solid fa-xmark'></i>
        </div>
        <div
          className='login-flex'
          style={
            !register
              ? { transform: "translateX(-444px)" }
              : { transform: "translateX(0)" }
          }>
          <div className='login-container'>
            <div
              className='login-container-one'
              style={login ? { display: "none" } : { display: "block" }}>
              <h3>Đăng nhập</h3>
              <p style={{ width: "320px" }}>
                Bạn có thể quản lý tài khoản sau khi đăng nhập, có thể đồng bộ
                lịch sử xem và mục yêu thích trên nhiều đầu cuối.
              </p>
              <div className='login-type'>
                <div
                  className='login-type-item'
                  onClick={() => setlogin(!login)}>
                  <i className='fa-regular fa-envelope'></i>
                  <p>Đăng nhập bằng Email</p>
                </div>
                <div className='login-type-item'>
                  <i className='fa-brands fa-google'></i>
                  <p>Đăng nhập bằng Google</p>
                </div>
                <div className='login-type-item'>
                  <i className='fa-brands fa-facebook'></i>
                  <p>Đăng nhập bằng Facebook</p>
                </div>
              </div>
              <span>
                Nhấn chọn " Đăng nhập " có nghĩa là bạn đã đọc và<br></br> đồng
                ý<u> thỏa thuận quyền riêng tư</u> & <u>điều khoản dịch vụ</u>{" "}
                <br></br>, đồng thời có nghĩa là bạn xác nhận đã tròn 18 tuổi có{" "}
                <br></br>thể sử dụng dịch vụ của chúng tôi
              </span>
              <h5>
                Bạn chưa có tài khoản ?{" "}
                <b
                  onClick={handleregister}
                  style={{ color: "rgb(28, 199, 73)" }}>
                  Đăng Ký
                </b>
              </h5>
            </div>
            <div
              className='register'
              style={!login ? { display: "none" } : { display: "block" }}>
              <h3 style={{ marginBottom: "40px" }}>Đăng nhập bằng Email</h3>
              <div className='form-group'>
                <input type='text' id='myInput' className='form-control' />
                <label htmlFor='myInput'>Email</label>
              </div>
              <div className='form-group'>
                <input type='text' id='password' className='form-control' />
                <label htmlFor='password'>Mật Khẩu</label>
              </div>
              <p
                style={{
                  width: "100%",
                  textAlign: "left",
                  fontSize: "12px",
                }}>
                Từ 8- 20 ký tự <br></br>ít nhất là tổ hợp của hai loại tùy ý gồm
                chữ cái, con số<br></br> hoặc ký tự
              </p>

              <span style={{ marginTop: "10px" }}>
                Nhấn chọn " Đăng Ký " có nghĩa là bạn đã đọc và<br></br> đồng ý
                <u> thỏa thuận quyền riêng tư</u> & <u>điều khoản dịch vụ</u>{" "}
                <br></br>, đồng thời có nghĩa là bạn xác nhận đã tròn 18 tuổi có{" "}
                <br></br>thể sử dụng dịch vụ của chúng tôi
              </span>
              <button
                style={{ marginTop: "20px" }}
                onClick={() => setlogin(!login)}>
                Đăng Nhập
              </button>
            </div>
          </div>
          <div className='login-container'>
            <div
              className='login-container-hidden'
              style={
                !registercheck
                  ? { transform: "translateX(-477px)" }
                  : { transform: "translateX(0)" }
              }>
              <div className='login-container-hidden-left'>
                <h3>Đăng Ký</h3>
                <p style={{ width: "320px" }}>
                  Tạo tài khoản của bạn, có thể lưu lại lịch sử xem và mục yêu
                  thích trên nhiều thiết bị.
                </p>
                <div
                  className='login-type'
                  onClick={() => setregistercheck(!registercheck)}>
                  <div className='login-type-item'>
                    <i className='fa-regular fa-envelope'></i>
                    <p>Đăng Ký bằng Email</p>
                  </div>
                  <div className='login-type-item'>
                    <i className='fa-brands fa-google'></i>
                    <p>Đăng Ký bằng Google</p>
                  </div>
                  <div className='login-type-item'>
                    <i className='fa-brands fa-facebook'></i>
                    <p>Đăng Ký bằng Facebook</p>
                  </div>
                </div>
                <span>
                  Nhấn chọn " Đăng nhập " có nghĩa là bạn đã đọc và<br></br>{" "}
                  đồng ý<u> thỏa thuận quyền riêng tư</u> &{" "}
                  <u>điều khoản dịch vụ</u> <br></br>, đồng thời có nghĩa là bạn
                  xác nhận đã tròn 18 tuổi có <br></br>thể sử dụng dịch vụ của
                  chúng tôi
                </span>
                <h5>
                  Có phải bạn đã có tài khoản?{" "}
                  <b
                    onClick={handleregister}
                    style={{ color: "rgb(28, 199, 73)" }}>
                    Đăng Nhập
                  </b>
                </h5>
              </div>
              <div className='register'>
                <h3 style={{ marginBottom: "40px" }}>
                  Sử dụng Email để đăng ký
                </h3>
                <div className='form-group'>
                  <input type='text' id='myInput' className='form-control' />
                  <label htmlFor='myInput'>Email</label>
                </div>
                <div className='form-group'>
                  <input type='text' id='password' className='form-control' />
                  <label htmlFor='password'>Mật Khẩu</label>
                </div>
                <p
                  style={{
                    width: "100%",
                    textAlign: "left",
                    fontSize: "12px",
                  }}>
                  Từ 8- 20 ký tự <br></br>ít nhất là tổ hợp của hai loại tùy ý
                  gồm chữ cái, con số<br></br> hoặc ký tự
                </p>
                <div className='form-group'>
                  <input
                    type='text'
                    id='resetpassword'
                    className='form-control'
                  />
                  <label htmlFor='resetpassword'>Nhập Lại Mật Khẩu</label>
                </div>
                <button>Đăng Ký</button>
                <span style={{ marginTop: "10px" }}>
                  Nhấn chọn " Đăng Ký " có nghĩa là bạn đã đọc và<br></br> đồng
                  ý<u> thỏa thuận quyền riêng tư</u> & <u>điều khoản dịch vụ</u>{" "}
                  <br></br>, đồng thời có nghĩa là bạn xác nhận đã tròn 18 tuổi
                  có <br></br>thể sử dụng dịch vụ của chúng tôi
                </span>
                <b
                  onClick={() => setregistercheck(!registercheck)}
                  style={{ color: "rgb(28, 199, 73)", textAlign: "left" }}>
                  Quay lại
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
