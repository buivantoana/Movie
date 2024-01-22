/* eslint-disable */
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Authorization,
  LoginCustumer,
  addCustumer,
} from '../../service/custumer'
import './login.css'
import { loginUser } from '../../redux/action/actionLoginReduxThunk'
import { toast } from 'react-toastify'
export interface IAppProps {
  check: boolean
  toggle: () => void
}

type formTypeCustumer = {
  email: string
  password1: string
  password2: string
  name: string
}

let inittileCustumer: formTypeCustumer = {
  email: '',
  password1: '',
  password2: '',
  name: '',
}
type formTypeLogin = {
  email: string
  password: string
}

let inittileLogin: formTypeLogin = {
  email: '',
  password: '',
}
export function Login({ check, toggle }: IAppProps) {
  let [register, setregister] = useState<boolean>(true)
  let [registercheck, setregistercheck] = useState<boolean>(true)
  let [login, setlogin] = useState<boolean>(false)
  let [custumer, setCustumer] = useState<formTypeCustumer>(inittileCustumer)
  let [loginCustumer, setLoginCustumer] = useState<formTypeLogin>(inittileLogin)

  let dispath = useDispatch<any>()

  let handleChange =
    (name: keyof formTypeCustumer) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCustumer((prev) => ({ ...prev, [name]: event.target.value }))
    }
  let handleChangeLogin =
    (name: keyof formTypeLogin) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLoginCustumer((prev) => ({ ...prev, [name]: event.target.value }))
    }

  function handleregister() {
    setregister(!register)
    setregistercheck(true)
  }

  let handleRegister = async () => {
    if (custumer.password1 === custumer.password2) {
      let res = await addCustumer({
        email: custumer.email,
        password: custumer.password1,
        name: custumer.name,
      })
      if (res.status === 0) {
        alert('ban da them thanh cong')
        setCustumer(inittileCustumer)
      } else if (res.status === 1) {
        alert('tai khoan co nguoi su udng')
      }
    } else {
      alert('mat khau khong trung nhau')
    }
  }

  let handleLoginCustumer = async () => {
    try {
      let res = await dispath(
        loginUser({
          email: loginCustumer.email,
          password: loginCustumer.password,
        }),
      )

      if (res) {
        toast.success('🦄 Bạn đã đăng nhập', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
        toggle()
        setLoginCustumer(inittileLogin)
        setlogin(!login)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={`modalsearch ${check ? 'visible' : 'hidden'}`}>
      <div className={check ? 'modal' : 'modals'}>
        <div className='close-login'>
          <i onClick={toggle} className='fa-solid fa-xmark'></i>
        </div>
        <div
          className='login-flex'
          style={
            !register
              ? { transform: 'translateX(-444px)' }
              : { transform: 'translateX(0)' }
          }
        >
          <div className='login-container'>
            <div
              className='login-container-one'
              style={login ? { display: 'none' } : { display: 'block' }}
            >
              <h3>Đăng nhập</h3>
              <p style={{ width: '320px' }}>
                Bạn có thể quản lý tài khoản sau khi đăng nhập, có thể đồng bộ
                lịch sử xem và mục yêu thích trên nhiều đầu cuối.
              </p>
              <div className='login-type'>
                <div
                  className='login-type-item'
                  onClick={() => setlogin(!login)}
                >
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
                ý<u> thỏa thuận quyền riêng tư</u> & <u>điều khoản dịch vụ</u>{' '}
                <br></br>, đồng thời có nghĩa là bạn xác nhận đã tròn 18 tuổi có{' '}
                <br></br>thể sử dụng dịch vụ của chúng tôi
              </span>
              <h5>
                Bạn chưa có tài khoản ?{' '}
                <b
                  onClick={handleregister}
                  style={{ color: 'rgb(28, 199, 73)' }}
                >
                  Đăng Ký
                </b>
              </h5>
            </div>
            <div
              className='register'
              style={!login ? { display: 'none' } : { display: 'block' }}
            >
              <h3 style={{ marginBottom: '40px' }}>Đăng nhập bằng Email</h3>
              <div className='form-group'>
                <input
                  type='text'
                  id='myInput'
                  value={loginCustumer.email}
                  onChange={handleChangeLogin('email')}
                  className='form-control'
                />
                <label
                  style={
                    loginCustumer.email !== ''
                      ? {
                          color: ' rgb(28, 199, 73)',
                          top: ' 6px',
                          left: ' 11px',
                          fontSize: '14px',
                        }
                      : {}
                  }
                  htmlFor='myInput'
                >
                  Email
                </label>
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  id='password'
                  value={loginCustumer.password}
                  onChange={handleChangeLogin('password')}
                  className='form-control'
                />
                <label
                  style={
                    loginCustumer.password !== ''
                      ? {
                          color: ' rgb(28, 199, 73)',
                          top: ' 6px',
                          left: ' 11px',
                          fontSize: '14px',
                        }
                      : {}
                  }
                  htmlFor='password'
                >
                  Mật Khẩu
                </label>
              </div>
              <p
                style={{
                  width: '100%',
                  textAlign: 'left',
                  fontSize: '12px',
                }}
              >
                Từ 8- 20 ký tự <br></br>ít nhất là tổ hợp của hai loại tùy ý gồm
                chữ cái, con số
                <br></br> hoặc ký tự
              </p>

              <span style={{ marginTop: '10px' }}>
                Nhấn chọn " Đăng Ký " có nghĩa là bạn đã đọc và<br></br> đồng ý
                <u> thỏa thuận quyền riêng tư</u> & <u>điều khoản dịch vụ</u>{' '}
                <br></br>, đồng thời có nghĩa là bạn xác nhận đã tròn 18 tuổi có{' '}
                <br></br>thể sử dụng dịch vụ của chúng tôi
              </span>
              <button
                style={{ marginTop: '20px' }}
                onClick={handleLoginCustumer}
              >
                Đăng Nhập
              </button>
            </div>
          </div>
          <div className='login-container'>
            <div
              className='login-container-hidden'
              style={
                !registercheck
                  ? { transform: 'translateX(-477px)' }
                  : { transform: 'translateX(0)' }
              }
            >
              <div className='login-container-hidden-left'>
                <h3>Đăng Ký</h3>
                <p style={{ width: '320px' }}>
                  Tạo tài khoản của bạn, có thể lưu lại lịch sử xem và mục yêu
                  thích trên nhiều thiết bị.
                </p>
                <div
                  className='login-type'
                  onClick={() => setregistercheck(!registercheck)}
                >
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
                  Nhấn chọn " Đăng nhập " có nghĩa là bạn đã đọc và<br></br>{' '}
                  đồng ý<u> thỏa thuận quyền riêng tư</u> &{' '}
                  <u>điều khoản dịch vụ</u> <br></br>, đồng thời có nghĩa là bạn
                  xác nhận đã tròn 18 tuổi có <br></br>thể sử dụng dịch vụ của
                  chúng tôi
                </span>
                <h5>
                  Có phải bạn đã có tài khoản?{' '}
                  <b
                    onClick={handleregister}
                    style={{ color: 'rgb(28, 199, 73)' }}
                  >
                    Đăng Nhập
                  </b>
                </h5>
              </div>
              <div className='register'>
                <h3 style={{ marginBottom: '20px' }}>
                  Sử dụng Email để đăng ký
                </h3>
                <div className='form-group'>
                  <input
                    type='text'
                    value={custumer.email}
                    onChange={handleChange('email')}
                    id='myInput'
                    className='form-control'
                  />
                  <label
                    style={
                      custumer.email !== ''
                        ? {
                            color: ' rgb(28, 199, 73)',
                            top: ' 6px',
                            left: ' 11px',
                            fontSize: '14px',
                          }
                        : {}
                    }
                    htmlFor='myInput'
                  >
                    Email
                  </label>
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    value={custumer.name}
                    onChange={handleChange('name')}
                    id='myInput'
                    className='form-control'
                  />
                  <label
                    style={
                      custumer.name !== ''
                        ? {
                            color: ' rgb(28, 199, 73)',
                            top: ' 6px',
                            left: ' 11px',
                            fontSize: '14px',
                          }
                        : {}
                    }
                    htmlFor='myInput'
                  >
                    Name
                  </label>
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    id='password'
                    value={custumer.password1}
                    onChange={handleChange('password1')}
                    className='form-control'
                  />
                  <label
                    style={
                      custumer.password1 !== ''
                        ? {
                            color: ' rgb(28, 199, 73)',
                            top: ' 6px',
                            left: ' 11px',
                            fontSize: '14px',
                          }
                        : {}
                    }
                    htmlFor='password'
                  >
                    Mật Khẩu
                  </label>
                </div>
                <p
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    fontSize: '12px',
                  }}
                >
                  Từ 8- 20 ký tự <br></br>ít nhất là tổ hợp của hai loại tùy ý
                  gồm chữ cái, con số
                  <br></br> hoặc ký tự
                </p>
                <div className='form-group'>
                  <input
                    value={custumer.password2}
                    onChange={handleChange('password2')}
                    type='text'
                    id='resetpassword'
                    className='form-control'
                  />
                  <label
                    style={
                      custumer.password2 !== ''
                        ? {
                            color: ' rgb(28, 199, 73)',
                            top: ' 6px',
                            left: ' 11px',
                            fontSize: '14px',
                          }
                        : {}
                    }
                    htmlFor='resetpassword'
                  >
                    Nhập Lại Mật Khẩu
                  </label>
                </div>
                <button onClick={handleRegister}>Đăng Ký</button>
                <span style={{ marginTop: '10px' }}>
                  Nhấn chọn " Đăng Ký " có nghĩa là bạn đã đọc và<br></br> đồng
                  ý<u> thỏa thuận quyền riêng tư</u> & <u>điều khoản dịch vụ</u>{' '}
                  <br></br>, đồng thời có nghĩa là bạn xác nhận đã tròn 18 tuổi
                  có <br></br>thể sử dụng dịch vụ của chúng tôi
                </span>
                <b
                  onClick={() => setregistercheck(!registercheck)}
                  style={{ color: 'rgb(28, 199, 73)', textAlign: 'left' }}
                >
                  Quay lại
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
